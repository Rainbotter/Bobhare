import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Group} from "./group.dao";

@Entity({name: "section"})
export class Section {

  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({name: "uuid", length: 50})
  uuid: string;

  @Column({name: "title", length: 255})
  title: string;

  @OneToMany(() => Group, object => object.id)
  groups: Group[];

}
