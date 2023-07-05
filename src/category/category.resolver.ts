import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import {
  CategoryInput,
  FindCategoryInput,
  UpdateCategoryInput,
} from './inputs/category.input';

@Resolver()
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Query(() => [CategoryDto])
  async getAllCategory() {
    return await this.categoryService.fillAllCategory();
  }

  @Mutation(() => CategoryDto)
  async createCategory(@Args('input') input: CategoryInput) {
    return await this.categoryService.create(input);
  }

  @Query(() => CategoryDto)
  async getCategory(@Args('input') input: FindCategoryInput) {
    return await this.categoryService.findOne(input);
  }

  @Mutation(() => CategoryDto)
  async updateCategory(@Args('input') input: UpdateCategoryInput) {
    return await this.categoryService.update(input);
  }

  @Mutation(() => String)
  async deleteCategory(@Args('input') input: FindCategoryInput) {
    await this.categoryService.delete(input._id);
    return 'Cat removed!';
  }

  Query:{
    categories: () => null
  }
}
