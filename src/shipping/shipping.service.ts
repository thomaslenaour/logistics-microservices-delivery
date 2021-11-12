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
}
