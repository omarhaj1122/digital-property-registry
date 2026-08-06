import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('properties')
export class PropertyOrmEntity {
  @PrimaryColumn('uuid')
  id!: string;

  @Column({ unique: true })
  parcelNumber!: string;

  @Column()
  ownerId!: string;

  @Column('float')
  areaSqm!: number;

  @Column('text')
  geometryPolygon!: string;

  @Column({ default: 'ACTIVE' })
  status!: string;

  @CreateDateColumn()
  createdAt!: Date;
}