import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

enum StockMovementType {
  Supply = 'Supply',
  Reserve = 'Reserve',
  Removal = 'Removal',
}

export class StockMovementDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public productId!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  public quantity!: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(StockMovementType)
  public status!: string;
}

export class StockProductDto extends OmitType(StockMovementDto, ['status']) {}
