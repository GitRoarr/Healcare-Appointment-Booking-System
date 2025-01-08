import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './Users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'lyntel_user',
      password: 'barneythepurple',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true, // should be disabled for production
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
