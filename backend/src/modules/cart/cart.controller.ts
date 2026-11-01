import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { AddToCartDto } from './dtos/add-to-cart.dto';
import { GetUser } from '@common/decorators/user.decorator';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  getCart(@GetUser('id') userId: string) {
    return this.cartService.getCart(userId);
  }

  @Post()
  addToCart(@Body() dto: AddToCartDto, @GetUser('id') userId: string) {
    return this.cartService.addToCart(userId, dto);
  }

  @Patch(':productId/quantity')
  updateQuantity(@Param('productId') productId: string, @Body('quantity') quantity: number, @GetUser('id') userId: string) {
    return this.cartService.updateQuantity(userId, productId, quantity);
  }

  @Delete(':productId')
  removeFromCart(@Param('productId') productId: string, @GetUser('id') userId: string) {
    return this.cartService.removeFromCart(userId, productId);
  }

  @Delete()
  clearCart(@GetUser('id') userId: string) {
    return this.cartService.clearCart(userId);
  }
}
