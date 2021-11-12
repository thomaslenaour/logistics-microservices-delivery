import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BaseDto } from './base.dto';

enum OrderStatusDto {
  Pending = 'Pending',
  Delivered = 'Delivered',
}

export class OrderDetailsDto extends BaseDto {
  @ApiProperty({ type: () => OrderStatusDto })
  @IsEnum(OrderStatusDto)
  @IsNotEmpty()
  public status!: string;

  @ApiProperty({ type: () => PurchasedProductDto })
  @IsNotEmpty()
  public products!: PurchasedProductDto[];
}

export class OrderCreatedDto extends OmitType(OrderDetailsDto, [
  'status',
  'products',
]) {}

export class PurchasedProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public productId!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  public quantity!: number;
}

export class UpdateOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(OrderStatusDto)
  public status!: string;
}
