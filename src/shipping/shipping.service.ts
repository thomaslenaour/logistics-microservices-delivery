import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from 'src/database/entities';
import { ShippingRequestDto } from 'src/dtos';
import { Repository } from 'typeorm';

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
    const pendingOrders = this.repo.find({ where: { status: 'Pending' } });
    return pendingOrders;
  }

  public async updatePendingOrders(orders: OrderEntity[]) {
    const result = await Promise.all(
      orders.map((order) => {
        order.status = 'Delivered';
        this.repo.update(order.id, order);
      }),
    );
    return result;
  }
}
