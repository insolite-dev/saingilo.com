export interface Content {
    image: string | null;
    content: string;
}

export interface ContentArray {
    data: Content[];
}

export interface Initial {
    bgs: string[];
    slog: { [key: string]: string }
}

