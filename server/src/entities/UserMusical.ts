import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";
import { Musicals } from "./Musicals";

@Index("bookmark", ["userId", "musicalId"], { unique: true })
@Index("musical_id", ["musicalId"], {})
@Entity("user_musical", { schema: "test" })
export class UserMusical {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "user_id" })
  userId: number;

  @Column("int", { name: "musical_id" })
  musicalId: number;

  @ManyToOne(() => Users, (users) => users.userMusicals, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;

  @ManyToOne(() => Musicals, (musicals) => musicals.userMusicals, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "musical_id", referencedColumnName: "id" }])
  musical: Musicals;
}
