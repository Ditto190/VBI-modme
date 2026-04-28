import { Body, Controller, Delete, Get, Param, Post, NotFoundException, Put } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'
import { ApiDataResponse, ApiErrorResponse } from '../common/swagger/api-response.decorator'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserEntity } from './entities/user.entity'

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', description: 'User ID', example: '1' })
  @ApiDataResponse({
    description: 'User returned',
    status: 200,
    type: UserEntity,
  })
  @ApiErrorResponse({
    description: 'User not found',
    message: 'User not found',
    status: 404,
  })
  async getUser(@Param('id') id: string): Promise<UserEntity> {
    const user = await this.userService.user({ id: Number(id) })
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }
    return user
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiDataResponse({
    description: 'Users returned',
    isArray: true,
    status: 200,
    type: UserEntity,
  })
  async getUsers(): Promise<UserEntity[]> {
    return this.userService.users()
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiDataResponse({
    description: 'User created',
    status: 201,
    type: UserEntity,
  })
  @ApiErrorResponse({
    description: 'Invalid request body',
    message: 'Validation failed',
    status: 400,
  })
  async signupUser(@Body() userData: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(userData)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiParam({ name: 'id', description: 'User ID', example: '1' })
  @ApiBody({ type: UpdateUserDto })
  @ApiDataResponse({
    description: 'User updated',
    status: 200,
    type: UserEntity,
  })
  @ApiErrorResponse({
    description: 'Invalid request body',
    message: 'Validation failed',
    status: 400,
  })
  async updateUser(@Param('id') id: string, @Body() userData: UpdateUserDto): Promise<UserEntity> {
    return this.userService.updateUser({
      where: { id: Number(id) },
      data: userData,
    })
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({ name: 'id', description: 'User ID', example: '1' })
  @ApiDataResponse({
    description: 'User deleted',
    status: 200,
    type: UserEntity,
  })
  async deleteUser(@Param('id') id: string): Promise<UserEntity> {
    return this.userService.deleteUser({ id: Number(id) })
  }
}
