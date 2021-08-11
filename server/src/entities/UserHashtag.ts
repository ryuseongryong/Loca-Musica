import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";
import { Hashtags } from "./Hashtags";

@Index("userHashtag", ["userId", "hashtagId"], { unique: true })
@Index("hashtag_id", ["hashtagId"], {})
@Entity("user_hashtag", { schema: "test" })
export class UserHashtag {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "user_id" })
  userId: number;

  @Column("int", { name: "hashtag_id" })
  hashtagId: number;

  @ManyToOne(() => Users, (users) => users.userHashtags, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;

  @ManyToOne(() => Hashtags, (hashtags) => hashtags.userHashtags, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "hashtag_id", referencedColumnName: "id" }])
  hashtag: Hashtags;
}
