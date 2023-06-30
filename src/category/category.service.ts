import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schemas/category.schema';
import { Model, Types } from 'mongoose';
import {
  CategoryInput,
  FindCategoryInput,
  UpdateCategoryInput,
} from './inputs/category.input';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async fillAllCategory(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async create(createCat: CategoryInput): Promise<Category> {
    const category = await new this.categoryModel(createCat);
    return category.save();
  }

  async findOne(cat: FindCategoryInput): Promise<Category> {
    const category = await this.categoryModel.findById(cat._id);
    return category;
  }

  async update(updateCat: UpdateCategoryInput): Promise<Category> {
    const category = await this.categoryModel.findById(updateCat._id);
    category.name = updateCat.name;
    return category.save();
  }

  async delete(id: string): Promise<any> {
    return await this.categoryModel.findByIdAndDelete(id);
  }
}
