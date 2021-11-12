import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  Post,
} from '@nestjs/common';
import { ShippingRequestDto } from '../dtos';

@Controller('shipping')
export class ShippingController {
  // Gérer la requête en POST qui devra matcher avec le ShippingRequestDto
  @Post()
  @HttpCode(204)
  create(@Body() body: ShippingRequestDto) {
    console.log(typeof body);
    // Si ça ne match pas, on renvoi une erreur
    if (!body.orderId || !body.nbProducts) {
      throw new HttpException(
        'Bad request ! An ordre must have an orderId and nbProducts property.',
        400,
      );
    }
    // Sinon, retour 204 et appel du service pour l'insérer en bdd
  }
}
