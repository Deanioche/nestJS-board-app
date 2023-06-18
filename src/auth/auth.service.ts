import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  getAllUsers(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }
  createUser(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    return this.userRepository.createUser(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    const user = await this.userRepository.getUserByUsername(username);
    if (user && user.validatePassword(password)) {
      const payload = { username };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } else throw new UnauthorizedException('Invalid credentials');
  }

  getUserByUsername(username: string): Promise<User> {
    return this.userRepository.getUserByUsername(username);
  }

  getUserById(id: number): Promise<User> {
    return this.userRepository.getUserById(id);
  }

  deleteUserById(id: number): Promise<void> {
    return this.userRepository.deleteUserById(id);
  }

  async updateUserById(
    id: number,
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<User> {
    const { username, password } = authCredentialsDto;
    const user = await this.userRepository.getUserById(id);
    if (username) user.username = username;
    if (password) user.password = password;
    return this.userRepository.updateUserById(id, user);
  }
}
