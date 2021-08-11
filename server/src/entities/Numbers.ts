import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Musicals } from "./Musicals";
import { UserNumber } from "./UserNumber";

@Index("musical_id", ["musicalId"], {})
@Entity("numbers", { schema: "test" })
export class Numbers {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "musical_id" })
  musicalId: number;

  @Column("varchar", { name: "title", nullable: true, length: 255 })
  title: string | null;

  @Column("varchar", { name: "url", length: 255 })
  url: string;

  @ManyToOne(() => Musicals, (musicals) => musicals.numbers, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "musical_id", referencedColumnName: "id" }])
  musical: Musicals;

  @OneToMany(() => UserNumber, (userNumber) => userNumber.number)
  userNumbers: UserNumber[];
}
