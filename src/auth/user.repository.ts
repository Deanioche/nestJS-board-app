import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

export class UserRepository extends Repository<User> {
  constructor(@InjectRepository(User) private dataSource: DataSource) {
    super(User, dataSource.manager);
  }

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      username,
      password: hashedPassword,
    });
    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505')
        throw new ConflictException('Username already exists');
      else
        throw new Error(
          `Unexpected error occurred while saving user [errcode: ${error.code}]`,
        );
    }
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return await this.find();
  }

  async getUserByUsername(username: string): Promise<User> {
    return await this.findOneBy({ username });
  }

  async getUserById(id: number): Promise<User> {
    return await this.findOneBy({ id });
  }

  async deleteUserById(id: number): Promise<void> {
    await this.delete({ id });
  }

  async updateUserById(id: number, user: User): Promise<User> {
    return await this.save({ id, user });
  }
}
