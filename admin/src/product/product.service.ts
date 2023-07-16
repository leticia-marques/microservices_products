import { Inject, Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly productRepository: Repository<Product>,
  ) {}

  async all() {
    return await this.productRepository.find();
  }

  async create(data: { name: string; description: string }): Promise<Product> {
    return await this.productRepository.save(data);
  }

  async findOne(id: number): Promise<Product> {
    // console.log(typeof(id));
    return await this.productRepository.findOneBy({ id: id });
  }

  async updateOne(
    id: number,
    data: { name?: string; description?: string },
  ): Promise<Product | null> {
    await this.productRepository.update(id, data);
    return this.findOne(id);
  }

  async deleteOne(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
