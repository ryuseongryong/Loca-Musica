import { UserMusical } from "./UserMusical";
import { UserHashtag } from "./UserHashtag";
import { UserNumber } from "./UserNumber";
export declare class Users {
    id: number;
    username: string;
    email: string;
    password: string;
    profile: string | null;
    resign: boolean;
    admin: boolean;
    createdAt: Date | null;
    updatedAt: Date | null;
    userMusicals: UserMusical[];
    userHashtags: UserHashtag[];
    userNumbers: UserNumber[];
}
