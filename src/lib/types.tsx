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

