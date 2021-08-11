import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MusicalHashtag } from "./MusicalHashtag";
import { UserHashtag } from "./UserHashtag";

@Index("name", ["name"], { unique: true })
@Entity("hashtags", { schema: "test" })
export class Hashtags {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", unique: true, length: 255 })
  name: string;

  @Column("int", { name: "tagcount", nullable: true, default: () => "'1'" })
  tagcount: number | null;

  @OneToMany(() => MusicalHashtag, (musicalHashtag) => musicalHashtag.hashtag)
  musicalHashtags: MusicalHashtag[];

  @OneToMany(() => UserHashtag, (userHashtag) => userHashtag.hashtag)
  userHashtags: UserHashtag[];
}
