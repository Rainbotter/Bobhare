import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {BookmarkDao} from "./bookmark.dao";
import {SectionDao} from "./section.dao";

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

  @ManyToOne(() => SectionDao, {onDelete: "CASCADE"})
  @JoinColumn({name: "section_id"})
  section: SectionDao;

  @OneToMany(() => BookmarkDao, object => object.id)
  bookmarks: BookmarkDao[];

}
