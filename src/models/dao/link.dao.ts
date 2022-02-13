import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GroupDao } from './group.dao';

@Entity({ name: 'link' })
export class LinkDao {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'uuid', length: 50 })
  uuid: string;

  @Column({ name: 'title', length: 255 })
  title: string;

  @Column({ name: 'url', length: 1500 })
  url: string;

  @Column({ name: 'faviconUrl', length: 1500 })
  faviconUrl?: string;

  @ManyToOne(() => GroupDao, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'group_id' })
  group: GroupDao;

}
