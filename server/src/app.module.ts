import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { ImagesModule } from './images/images.module';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    UserModule, 
    AuthModule, 
    ProfileModule, 
    ImagesModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'lofi',
      autoLoadModels:true,
      synchronize:true,
      logging:true
    })
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
