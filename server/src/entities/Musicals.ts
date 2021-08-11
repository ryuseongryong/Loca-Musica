import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserMusical } from "./UserMusical";
import { MusicalHashtag } from "./MusicalHashtag";
import { Numbers } from "./Numbers";

@Index("code", ["code"], { unique: true })
@Entity("musicals", { schema: "test" })
export class Musicals {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "code", unique: true, length: 255 })
  code: string;

  @Column("varchar", { name: "title", length: 255 })
  title: string;

  @Column("varchar", { name: "thumbnail", nullable: true, length: 255 })
  thumbnail: string | null;

  @Column("varchar", { name: "contents", nullable: true, length: 255 })
  contents: string | null;

  @Column("varchar", { name: "state", nullable: true, length: 255 })
  state: string | null;

  @Column("varchar", { name: "actors", nullable: true, length: 255 })
  actors: string | null;

  @OneToMany(() => UserMusical, (userMusical) => userMusical.musical)
  userMusicals: UserMusical[];

  @OneToMany(() => MusicalHashtag, (musicalHashtag) => musicalHashtag.musical)
  musicalHashtags: MusicalHashtag[];

  @OneToMany(() => Numbers, (numbers) => numbers.musical)
  numbers: Numbers[];
}
