import { Musicals } from "./Musicals";
import { UserNumber } from "./UserNumber";
export declare class Numbers {
    id: number;
    musicalId: number;
    title: string | null;
    url: string;
    musical: Musicals;
    userNumbers: UserNumber[];
}
