import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'plans' })
export class PlanEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column('decimal', { name: 'price', nullable: false, scale: 2 })
  price: number;

  @Column({ name: 'description' })
  description: string;
}
