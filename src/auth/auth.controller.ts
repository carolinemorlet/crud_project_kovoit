import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { AuthDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UserService,
  ) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.authService.signUp(createUserDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post('signin')
  async signin(@Body() userDto: AuthDto) {
    try {
      return await this.authService.signIn(userDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Req() request: any) {
    try {
      return await request.user;
    } catch (error) {
      throw new Error(error);
    }
  }
}
