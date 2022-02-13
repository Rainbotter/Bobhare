import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GroupDao } from './group.dao';

@Entity({ name: 'section' })
export class SectionDao {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'uuid', length: 50 })
  uuid: string;

  @Column({ name: 'title', length: 255 })
  title: string;

  @OneToMany(() => GroupDao, object => object.section, {
    eager: true,
  })
  groups: GroupDao[];

}
