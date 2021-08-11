import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Hashtags } from "./Hashtags";
import { Musicals } from "./Musicals";

@Index("musicalHashtag", ["hashtagId", "musicalId"], { unique: true })
@Index("musical_id", ["musicalId"], {})
@Entity("musical_hashtag", { schema: "test" })
export class MusicalHashtag {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "hashtag_id" })
  hashtagId: number;

  @Column("int", { name: "musical_id" })
  musicalId: number;

  @ManyToOne(() => Hashtags, (hashtags) => hashtags.musicalHashtags, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "hashtag_id", referencedColumnName: "id" }])
  hashtag: Hashtags;

  @ManyToOne(() => Musicals, (musicals) => musicals.musicalHashtags, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "musical_id", referencedColumnName: "id" }])
  musical: Musicals;
}
