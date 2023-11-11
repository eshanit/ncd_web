import { Injectable } from '@nestjs/common';
import { CreateMenteeDto } from './dto/create-mentee.dto';
import { UpdateMenteeDto } from './dto/update-mentee.dto';
import { AxiosResponse } from 'axios';
import { Observable, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Mentee } from './entities/mentee.entity';
import { ConfigService } from '@nestjs/config/dist';

@Injectable()
export class MenteesService {

  constructor(private readonly httpService: HttpService, private configService: ConfigService) {}

  create(createMenteeDto: CreateMenteeDto) {
    return 'This action adds a new mentee';
  }

  findAll(): Observable<AxiosResponse<Mentee[]> | any> {

    return this.httpService
      .get(`${this.configService.get('COUCH_DB_URL')}/mentees/_all_docs?include_docs=true`, {
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
    return `This action returns a #${id} mentee`;
  }

  update(id: number, updateMenteeDto: UpdateMenteeDto) {
    return `This action updates a #${id} mentee`;
  }

  remove(id: number) {
    return `This action removes a #${id} mentee`;
  }


  /// mentee evaluations
  findMenteeEvaluations(id: number) {

    
    return `This action returns a #${id} mentee`;
  }

}
