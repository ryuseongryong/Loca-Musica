declare type MusicalData = {
    hashtags: string[];
    numberUrls: string[];
    code: string;
    title: string;
    thumbnail: string;
    contents: string;
    state: string;
    actors: string[];
};
export declare class AdminController {
    getAll(): string;
    uploadMusical(musicalData: MusicalData): MusicalData;
    editMusical(musicalData: MusicalData): MusicalData;
    deleteMusical(code: string): string;
}
export {};
