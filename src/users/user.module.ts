import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UniqueEmailValidator } from './validation/uniqueEmailValidator';
import { CPFValidator } from './validation/cpfValidator';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, UniqueEmailValidator, CPFValidator],
})
export class UserModule {}
