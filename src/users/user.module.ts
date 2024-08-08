import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UniqueEmailValidator } from './validation/uniqueEmailValidator';
import { CPFValidator } from '../resources/validation/cpfValidator';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, UniqueEmailValidator, CPFValidator],
})
export class UserModule {}
