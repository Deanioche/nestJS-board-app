import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from './user.repository';
import * as config from 'config';

const jwtConfig = config.get('jwt');

@Injectable()
/**
 * PassportStrategy(Strategy)에서 Strategy는 passport-jwt에서 제공하는 Strategy를 의미한다.
 *  - passport의 Strategy가 아님에 주의하자.
 */
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    super({
      secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload) {
    const { username } = payload;
    const user = await this.userRepository.getUserByUsername(username);

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
