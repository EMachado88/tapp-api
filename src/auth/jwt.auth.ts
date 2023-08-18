import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

const secretOrKey = process.env.JWT_SECRET;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey,
    });
  }

  async validate(payload: any) {
    console.log(`[JwtStrategy] validate: payload=${JSON.stringify(payload)}`);
    const { email } = payload;

    return { email };
  }
}
