import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';
import { ICreateProductDto } from './dtos/createProductDto';
import { IUpdateProductDto } from './dtos/updateProductDto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productsRepository: Model<Product>,
  ) {}

  async all() {
    return await this.productsRepository.find();
  }

  async create(data: ICreateProductDto): Promise<Product> {
    const product = await this.productsRepository.create({
      ad_id: data.id,
      name: data.name,
      description: data.description,
    });
    return product.save();
  }

  async findOne(id: number): Promise<Product | void> {
    return await this.productsRepository.findOne({ ad_id: id });
  }

  async updateOne(
    id: number,
    data: IUpdateProductDto,
  ): Promise<Product | void> {
    await this.productsRepository.findOneAndUpdate(
      { ad_id: id },
      {
        name: data.name,
        description: data.description,
      },
    );
    return this.findOne(id);
  }

  async deleteOne(id: number): Promise<any> {
    return this.productsRepository.findOneAndDelete({ ad_id: id });
  }
}
