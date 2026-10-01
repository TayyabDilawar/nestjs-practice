import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async createProduct(): Promise<Product> {
    const product = new this.productModel({
      title: 'Product 1',
      tags: [
        {
          name: 'Tag 1',
        },
        {
          name: 'Tag 2',
        },
        {
          name: 'Tag 3',
        },
      ],
    });
    return product.save();
  }

  async findAllProducts(): Promise<Product[]> {
    return this.productModel.find().exec();
  }
}
