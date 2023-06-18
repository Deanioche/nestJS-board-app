import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.authService.getAllUsers();
  }

  @Post()
  createUser(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<User> {
    return this.authService.createUser(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Delete('/:id')
  deleteUserById(@Param('id') id: number): Promise<void> {
    return this.authService.deleteUserById(id);
  }

  @Patch('/:id')
  updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<User> {
    return this.authService.updateUserById(id, authCredentialsDto);
  }

  @Post('auth-test')
  @UseGuards(AuthGuard())
  // @Req() -> @GetUser 변경 : request 전체 정보에서 user만 빼오는 데코레이터
  authTest(@GetUser() user: User) {
    console.log(user);
  }
}
