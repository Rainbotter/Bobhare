import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: "bookmark"})
export class Bookmark {

  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({name: "uuid", length: 50})
  uuid: string;

  @Column({name: "title", length: 255})
  title: string;

  @Column({name: "url", length: 1500})
  url: string;

  @Column({name: "faviconUrl", length: 1500})
  faviconUrl?: string;

}
