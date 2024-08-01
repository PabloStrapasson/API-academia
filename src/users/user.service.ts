import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { ListUsersDto } from './dto/listUsers.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = new UserEntity();
    Object.assign(user, createUserDto as UserEntity);

    return await this.userRepository.save(user);
  }

  async findAllUsers() {
    const users = await this.userRepository.find();
    const userList = users.map(
      (user) =>
        new ListUsersDto(
          user.id,
          user.name,
          user.registration,
          user.email,
          user.cpf,
          user.birthday,
        ),
    );

    return userList;
  }

  async findUserById(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (user === null) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    return user;
  }

  async findUserByRegistration(registration: number) {
    const user = await this.userRepository.findOneBy({ registration });

    if (user == null) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    return user;
  }

  async findUserGeneric(params: any | any[]) {
    const users = await this.userRepository.findBy(params);

    if (users == null) {
      throw new NotFoundException('Nenhum resultado encontrado!');
    }

    return users;
  }

  async findEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });

    if (user === null) {
      throw new NotFoundException('Email não cadastrado!');
    }

    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });

    if (user === null) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    Object.assign(user, updateUserDto as UserEntity);

    return this.userRepository.save(user);
  }

  async removeUser(id: string) {
    const result = await this.userRepository.delete(id);

    if (!result.affected)
      throw new NotFoundException('Usuário não encontrado!');
  }
}
