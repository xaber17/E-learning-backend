import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserIdentity } from '../user-identities/entities/user-identities.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoginActivity } from './entities/login-activities.entity';
import { UsersEntity } from 'src/user-identities/entities/users.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([
      UserIdentity,
      LoginActivity,
      UsersEntity,
    ]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('secretJwt'),
          signOptions: {
            expiresIn: config.get<string>('expirationJwt'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
