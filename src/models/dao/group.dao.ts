import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {BookmarkDao} from "./bookmark.dao";

@Entity({name: "group"})
export class GroupDao {

  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({name: "uuid", length: 50})
  uuid: string;

  @Column({name: "title", length: 255})
  title: string;

  @Column({name: "color", length: 255})
  color: string;

  @OneToMany(() => BookmarkDao, object => object.id)
  bookmarks: BookmarkDao[];

}
