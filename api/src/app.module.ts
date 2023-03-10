import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostModule } from './post/post.module';
import { FileService } from './services/file/file.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: ['dist/db/entity/*.ts'],
      migrations: ['dist/db/migrations/*.ts'],
      // synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService, FileService],
})
export class AppModule {
  //constructor(private dataSource: DataSource) {}
}
