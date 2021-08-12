import { MusicalHashtag } from "./MusicalHashtag";
import { UserHashtag } from "./UserHashtag";
export declare class Hashtags {
    id: number;
    name: string;
    tagcount: number | null;
    musicalHashtags: MusicalHashtag[];
    userHashtags: UserHashtag[];
}
