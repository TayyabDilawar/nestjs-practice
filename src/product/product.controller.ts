import { Controller, Post, Get } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct() {
    return this.productService.createProduct();
  }

  @Get()
  async findAllProducts() {
    return this.productService.findAllProducts();
  }
}
