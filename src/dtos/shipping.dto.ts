import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ProductEntity } from 'src/database/entities';
import { BaseDto } from './base.dto';

export class ShippingRequestDto extends BaseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public orderId!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  public nbProducts!: number;

  @ApiProperty()
  @IsNotEmpty()
  public products: ProductEntity[];
}

export class CreateShippingRequestDto extends OmitType(ShippingRequestDto, [
  'id',
]) {}

export class UpdateShippingRequestDto extends PartialType(
  CreateShippingRequestDto,
) {}
