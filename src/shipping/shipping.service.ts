import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OrderEntity } from 'src/database/entities';
import { ShippingRequestDto } from 'src/dtos';

@Injectable()
export class ShippingService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly repo: Repository<OrderEntity>,
  ) {}

  public async create(shippingRequestDto: ShippingRequestDto) {
    const order = this.repo.create(shippingRequestDto);
    await this.repo.save(order);

    return order;
  }

  public async getPendingOrder() {
    const pendingOrders = this.repo.find({
      where: { status: 'Pending' },
      relations: ['products'],
    });

    return pendingOrders;
  }

  public async updatePendingOrders(orders: OrderEntity[]) {
    await Promise.all(
      orders.map((order) => {
        order.status = 'Delivered';
        this.repo.save(order);
      }),
    );
    return orders;
  }
}
