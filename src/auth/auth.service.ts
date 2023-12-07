import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { TokenService } from 'src/token/token.service';
import * as bcrypt from 'bcrypt';
import { UserDocument } from 'src/user/schemas/user.schema';
import { AuthDto } from './dto/auth.dto';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private tokenService: TokenService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    try {
      const userExists = await this.usersService.findByEmail(
        createUserDto.email,
      );
      if (userExists) {
        throw new BadRequestException('Email already exists');
      }
      const hash = await bcrypt.hash(createUserDto.password, 10);

      const newUser = await this.usersService.create({
        ...createUserDto,
        password: hash,
      });

      const tokens = await this.getTokens(newUser._id, newUser.email);
      await this.updateRefreshToken(newUser._id, tokens.refreshToken);
      return tokens;
    } catch (error) {
      throw new Error(error);
    }
  }

  async signIn(userDto: AuthDto): Promise<any> {
    try {
      const user = await this.usersService.findByEmail(userDto.email);
      if (!user) {
        throw new UnauthorizedException(`email or password doesn't exist`);
      }
      const isMatch = await this.comparePassword(user, userDto.password);
      if (!isMatch) {
        throw new UnauthorizedException(`email or password doesn't exist`);
      }
      const { accessToken, refreshToken } = await this.getTokens(
        user.id,
        user.email,
      );
      return { user, accessToken, refreshToken };
    } catch (error) {
      throw new Error(error);
    }
  }

  async comparePassword(user: UserDocument, password: string) {
    try {
      return bcrypt.compare(password, user.password);
    } catch (error) {
      throw new Error(error);
    }
  }

  async hashData(data: string) {
    // bcrypter data
    return data;
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    // await this.usersService.update(userId, {
    //   refreshToken: hashedRefreshToken,
    // });
  }

  async getTokens(userId: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          userId,
          email,
        },
        {
          secret: this.configService.get<string>('SECRET_KEY'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          userId,
          email,
        },
        {
          secret: this.configService.get<string>('REFRESH_SECRET_KEY'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
