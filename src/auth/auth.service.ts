import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayLoad } from './jws-payload.interface';
import { User } from './schemas/users.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private jwtService: JwtService,
  ) {}

  async singUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    await this.userModel.create(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    //take credentials after login
    const { username, password } = authCredentialsDto;

    //find user into the database
    const user = await this.userModel.findOne({ where: { username } });
    // const user = await this.userRepository.findOne({ where: { username } });

    //check and return accessToken for user or throw Exception
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayLoad = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
