import { Entity, Column } from 'typeorm';

@Entity('Order')
export class OrderEntity {
  @Column({
    type: 'uuid',
    generated: 'uuid',
    primary: true,
  })
  public id!: string;

  @Column({
    type: 'varchar',
  })
  public orderId!: string;

  @Column({
    type: 'varchar',
    default: 'Pending',
  })
  public status!: string;
}
