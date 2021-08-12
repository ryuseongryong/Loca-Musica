import { UserMusical } from "./UserMusical";
import { MusicalHashtag } from "./MusicalHashtag";
import { Numbers } from "./Numbers";
export declare class Musicals {
    id: number;
    code: string;
    title: string;
    thumbnail: string | null;
    contents: string | null;
    state: string | null;
    actors: string | null;
    userMusicals: UserMusical[];
    musicalHashtags: MusicalHashtag[];
    numbers: Numbers[];
}
