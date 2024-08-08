import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { ConfigModule } from '@nestjs/config';
import { JobModule } from './jobs/job.module';
import { EmployeeModule } from './employees/employee.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    JobModule,
    EmployeeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
