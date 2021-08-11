import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserMusical } from "./UserMusical";
import { UserHashtag } from "./UserHashtag";
import { UserNumber } from "./UserNumber";

@Index("email", ["email"], { unique: true })
@Entity("users", { schema: "test" })
export class Users {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "username", length: 255 })
  username: string;

  @Column("varchar", { name: "email", unique: true, length: 255 })
  email: string;

  @Column("varchar", { name: "password", length: 255 })
  password: string;

  @Column("varchar", { name: "profile", nullable: true, length: 255 })
  profile: string | null;

  @Column("tinyint", { name: "resign", width: 1, default: () => "'0'" })
  resign: boolean;

  @Column("tinyint", { name: "admin", width: 1, default: () => "'0'" })
  admin: boolean;

  @Column("timestamp", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("timestamp", {
    name: "updated_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date | null;

  @OneToMany(() => UserMusical, (userMusical) => userMusical.user)
  userMusicals: UserMusical[];

  @OneToMany(() => UserHashtag, (userHashtag) => userHashtag.user)
  userHashtags: UserHashtag[];

  @OneToMany(() => UserNumber, (userNumber) => userNumber.user)
  userNumbers: UserNumber[];
}
