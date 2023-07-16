import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ICreateProductDto } from './dtos/createProduct.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Get()
  all() {
    return this.productService.all();
  }

  @Post()
  async create(@Body() body: ICreateProductDto) {
    const product = await this.productService.create({
      name: body.name,
      description: body.description,
    });
    this.client.emit('product_created', product);
    return product;
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return await this.productService.findOne(id);
  }

  @Put(':id')
  async updateOne(
    @Param('id') id: number,
    @Body() body: { name?: string; description?: string },
  ) {
    await this.productService.updateOne(id, {
      name: body?.name,
      description: body?.description,
    });
    const product = await this.productService.findOne(id);
    this.client.emit('product_updated', product);
    return product;
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: number): Promise<void> {
    this.client.emit('product_deleted', id);
    return await this.productService.deleteOne(id);
  }
}
