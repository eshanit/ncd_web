import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignInUserDto } from './dto/signin-user.dto';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto) {

    const hash = await argon.hash(createUserDto.password);

    console.log(createUserDto);

    const user = await this.prisma.user
      .create({
        data: {
          firstname: createUserDto.firstname,
          lastname: createUserDto.lastname,
          username: createUserDto.username,
          email: createUserDto.email,
          hash,
        },
      })
      .catch((error) => {

        throw error;
      });

    return user;
  }

  findAll() {
    return `This action returns all user`;
  }

  // async findOne(id: number) {
  //   const user = await this.prisma.user.findUnique({
  //     where: {
  //       id: id,
  //     },
  //   }).catch((error) => {
  //     if (error instanceof PrismaClientKnownRequestError) {
  //       if (error.code === 'P2002') {
  //         throw new ForbiddenException('User not found');
  //       }
  //     }
  //     throw error;
  //   });

  // }


  async findBySignIn(signInUserDto: SignInUserDto){

    const hash = await argon.hash(signInUserDto.password)

    console.log(hash)
  return await this.prisma.user
      .findUnique({
        where: {
          email: signInUserDto.email,
        },
      }).then(async (response)=>{
        console.log(response)
        try{
          if(await argon.verify(response.hash, signInUserDto.password)){
            return response
          }
        } catch(error) {
          if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
              throw new ForbiddenException('Wrong password');
            }
          }
          throw error;
        }
           
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException('Credentials incorrect');
          }
        }
        throw error;
      });

   
  }



  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
