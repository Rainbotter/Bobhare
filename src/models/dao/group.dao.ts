import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Bookmark} from "./bookmark.dao";

@Entity({name: "group"})
export class Group {

  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({name: "uuid", length: 50})
  uuid: string;

  @Column({name: "title", length: 255})
  title: string;

  @Column({name: "color", length: 255})
  color: string;

  @OneToMany(() => Bookmark, object => object.id)
  bookmarks: Bookmark[];

}
