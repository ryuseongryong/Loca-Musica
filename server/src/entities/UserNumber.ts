import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";
import { Numbers } from "./Numbers";

@Index("userNumber", ["userId", "numberId"], { unique: true })
@Index("number_id", ["numberId"], {})
@Entity("user_number", { schema: "test" })
export class UserNumber {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "user_id" })
  userId: number;

  @Column("int", { name: "number_id" })
  numberId: number;

  @ManyToOne(() => Users, (users) => users.userNumbers, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;

  @ManyToOne(() => Numbers, (numbers) => numbers.userNumbers, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "number_id", referencedColumnName: "id" }])
  number: Numbers;
}
