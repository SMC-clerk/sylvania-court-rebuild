export interface GlobalConfig {
  key: string;
  value: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
  link: string;
  category: string;
}

export interface Hour {
  day: string;
  open_time: string;
  close_time: string;
  note?: string;
}

export interface NewsItem {
  date: string;
  title: string;
  summary: string;
  link?: string;
}

export interface SheetData {
  globals: Record<string, string>;
  services: Service[];
  hours: Hour[];
  news: NewsItem[];
}
