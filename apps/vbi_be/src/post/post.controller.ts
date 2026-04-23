import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import {
  ApiDataResponse,
  ApiErrorResponse,
} from '../common/swagger/api-response.decorator';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get post by ID' })
  @ApiParam({ name: 'id', description: 'Post ID', example: '1' })
  @ApiDataResponse({
    description: 'Post returned',
    status: 200,
    type: PostEntity,
  })
  @ApiErrorResponse({
    description: 'Post not found',
    message: 'Post not found',
    status: 404,
  })
  async getPost(@Param('id') id: string): Promise<PostEntity> {
    const post = await this.postService.post({ id: Number(id) });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiDataResponse({
    description: 'Posts returned',
    isArray: true,
    status: 200,
    type: PostEntity,
  })
  async getPosts(): Promise<PostEntity[]> {
    return this.postService.posts();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiBody({ type: CreatePostDto })
  @ApiDataResponse({
    description: 'Post created',
    status: 201,
    type: PostEntity,
  })
  @ApiErrorResponse({
    description: 'Invalid request body',
    message: 'Validation failed',
    status: 400,
  })
  async createPost(@Body() postData: CreatePostDto): Promise<PostEntity> {
    const { title, content, authorEmail, published } = postData;
    return this.postService.createPost({
      title,
      content,
      published,
      author: {
        connect: { email: authorEmail },
      },
    });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a post' })
  @ApiParam({ name: 'id', description: 'Post ID', example: '1' })
  @ApiBody({ type: UpdatePostDto })
  @ApiDataResponse({
    description: 'Post updated',
    status: 200,
    type: PostEntity,
  })
  @ApiErrorResponse({
    description: 'Invalid request body',
    message: 'Validation failed',
    status: 400,
  })
  async updatePost(
    @Param('id') id: string,
    @Body() postData: UpdatePostDto,
  ): Promise<PostEntity> {
    return this.postService.updatePost({
      where: { id: Number(id) },
      data: postData,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post' })
  @ApiParam({ name: 'id', description: 'Post ID', example: '1' })
  @ApiDataResponse({
    description: 'Post deleted',
    status: 200,
    type: PostEntity,
  })
  async deletePost(@Param('id') id: string): Promise<PostEntity> {
    return this.postService.deletePost({ id: Number(id) });
  }
}
