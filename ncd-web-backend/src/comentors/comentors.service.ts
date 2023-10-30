import { Injectable } from '@nestjs/common';
import { CreateComentorDto } from './dto/create-comentor.dto';
import { UpdateComentorDto } from './dto/update-comentor.dto';
import { AxiosResponse } from 'axios';
import { Observable, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Comentor } from './entities/comentor.entity';
import { ConfigService } from '@nestjs/config/dist';

@Injectable()
export class ComentorsService {

  constructor(private readonly httpService: HttpService, private configService: ConfigService) {}

  create(createComentorDto: CreateComentorDto) {
    return 'This action adds a new comentor';
  }

  findAll(): Observable<AxiosResponse<Comentor[]> | any> {
    return this.httpService
      .get(`${this.configService.get('COUCH_DB_URL')}/comentors/_all_docs?include_docs=true`, {
        auth: {
          username: 'admin',
          password: '@dmin',
        },
      })
      .pipe(
        map((response) => {
          const vm = [];

          for (var i = 0; i < response.data.rows.length; i++) {
            vm.push(response.data.rows[i].doc);
          }

          return vm;
        }),
      );
  }

  findOne(id: number) {
    return `This action returns a #${id} comentor`;
  }

  update(id: number, updateComentorDto: UpdateComentorDto) {
    return `This action updates a #${id} comentor`;
  }

  remove(id: number) {
    return `This action removes a #${id} comentor`;
  }
}
