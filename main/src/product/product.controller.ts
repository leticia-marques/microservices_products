import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { ICreateProductDto } from './dtos/createProductDto';
import { Product } from './entities/product.entity';
import { EventPattern } from '@nestjs/microservices';
import { IUpdateProductDto } from './dtos/updateProductDto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @EventPattern('product_created')
  async create(body: ICreateProductDto): Promise<void> {
    await this.productService.create(body);
  }

  @Get()
  async all(): Promise<Product[]> {
    return this.productService.all();
  }

  @EventPattern('product_updated')
  productUpdate(data: IUpdateProductDto) {
    return this.productService.updateOne(data.id, data);
  }

  @EventPattern('product_deleted')
  async deleteOne(id: number) {
    return await this.productService.deleteOne(id);
  }
}
