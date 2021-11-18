import { Entity, Column, OneToMany, JoinColumn } from 'typeorm';
import { ProductEntity } from './product.entity';

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
    type: 'int',
  })
  public nbProducts!: number;

  @OneToMany(() => ProductEntity, (product) => product.order, {
    cascade: ['insert'],
  })
  @JoinColumn()
  public products!: ProductEntity[];

  @Column({
    type: 'varchar',
    default: 'Pending',
  })
  public status!: string;
}
