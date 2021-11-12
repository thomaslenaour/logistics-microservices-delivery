import { Entity, Column, ManyToOne } from 'typeorm';
import { OrderEntity } from '.';

@Entity('Product')
export class ProductEntity {
  @Column({
    type: 'uuid',
    generated: 'uuid',
    primary: true,
  })
  public id!: string;

  @Column({
    type: 'varchar',
  })
  public productId!: string;

  @Column({
    type: 'int',
  })
  public quantity!: number;

  @ManyToOne(() => OrderEntity, (order) => order.products)
  order: OrderEntity;
}
