import { unstable_cache } from "next/cache";
import Papa from "papaparse";
import { GlobalConfig, Service, Hour, NewsItem, SheetData } from "./types";

// PRO TIP: To get the ID, open your sheet and copy the string between /d/ and /edit
// Example: https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
const SHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID || "1UP-9pWuqVCkzkgTziEuMytaLnWCBBOPwQOEtoOailQ4";

async function fetchSheetTab(tabName: string) {
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${tabName}`;

    try {
        const res = await fetch(url, {
            next: { revalidate: 60, tags: ['sheets'] },
        });

        if (!res.ok) {
            console.error(`Failed to fetch tab ${tabName}: ${res.statusText}`);
            return [];
        }

        const csvText = await res.text();
        const { data } = Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
            transformHeader: (h) => h.toLowerCase().trim()
        });
        return data;
    } catch (error) {
        console.error(`Error fetching sheet ${tabName}:`, error);
        return [];
    }
}

export const getSiteData = unstable_cache(
    async (): Promise<SheetData> => {
        // Parallel fetch for speed
        const [globalsRaw, servicesRaw, hoursRaw, newsRaw] = await Promise.all([
            fetchSheetTab("Global"),
            fetchSheetTab("Services"),
            fetchSheetTab("Hours"),
            fetchSheetTab("News"),
        ]);

        // Transform globals array to object pair
        const globals = (globalsRaw as GlobalConfig[]).reduce((acc, item) => {
            // Try explicit 'key'/'value' columns first (after lowercasing)
            // Fallback: use first column as key, second as value (resilience for bad headers)
            let k = item.key;
            let v = item.value;

            if (!k || !v) {
                const values = Object.values(item);
                if (values.length >= 2) {
                    k = values[0];
                    v = values[1];
                }
            }

            if (k) acc[k.trim()] = v?.trim() || "";
            return acc;
        }, {} as Record<string, string>);

        // Normalize alert_active to ensure it catches "TRUE", "true", "True"
        if (globals.alert_active) {
            globals.alert_active = globals.alert_active.toUpperCase();
        }

        return {
            globals,
            services: servicesRaw as Service[],
            hours: hoursRaw as Hour[],
            news: newsRaw as NewsItem[],
        };
    },
    ['site-data'],
    { revalidate: 60, tags: ['sheets'] }
);
