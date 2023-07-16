import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  ad_id: string;

  @Prop()
  name: string;

  @Prop()
  description: string;
}
export const ProductSchema = SchemaFactory.createForClass(Product);
