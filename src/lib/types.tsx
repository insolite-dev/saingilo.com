import { Timestamp } from "firebase/firestore";

export interface Initial {
    bgs: string[];
    slog: { [key: string]: string }
}

export interface Content {
    image: string | null;
    content: { [key: string]: string }
}

export interface ContentArray {
    data: Content[];
}

export interface NewsItem {
    id: string;
    title: { [key: string]: string };
    header: string;
    content: { [key: string]: string };
    created_at: Timestamp;
    author: string;
}

export interface NewsContent {
    data: NewsItem[];
}

