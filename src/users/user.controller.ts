import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { HashPasswordPipe } from '../resources/pipes/hashPassword.pipe';
import { CreateDatePipe } from 'src/resources/pipes/createDate.pipe';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() { password, birthday, ...createUserDto }: CreateUserDto,
    @Body('password', HashPasswordPipe) hashPassword: string,
    @Body('birthday', CreateDatePipe) birthdayDate: Date,
  ) {
    const newUser = await this.userService.createUser({
      ...createUserDto,
      password: hashPassword,
      birthday: birthdayDate,
    });

    return {
      data: newUser,
      message: 'Usuário cadastrado com sucesso!',
    };
  }

  @Get()
  async findAllUsers() {
    const allUsers = await this.userService.findAllUsers();

    return {
      data: allUsers,
      message: 'Usuários encontrados com sucesso!',
    };
  }

  @Get('search')
  async findOneUserByRegistration(
    @Query('resgistration') registration: string,
  ) {
    const user = await this.userService.findUserByRegistration(registration);

    return {
      data: user,
      message: 'Usuário encontrado com sucesso!',
    };
  }

  @Get(':id')
  async findOneUserById(@Param('id') id: string) {
    const user = await this.userService.findUserById(id);

    return {
      data: user,
      message: 'Usuário encontrado com sucesso!',
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userService.updateUser(id, updateUserDto);

    return {
      data: updatedUser,
      message: 'Usuário atualizado com sucesso!',
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const removedUser = await this.userService.removeUser(id);

    return {
      data: removedUser,
      message: 'Usuário deletado com sucesso',
    };
  }
}
