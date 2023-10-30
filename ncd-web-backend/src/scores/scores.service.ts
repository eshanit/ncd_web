import { Injectable } from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { HttpService } from '@nestjs/axios';
import { Score } from './entities/score.entity';
import { AxiosResponse } from 'axios';
import { Observable, map } from 'rxjs';
import { ConfigService } from '@nestjs/config/dist';

@Injectable()
export class ScoresService {
  constructor(private readonly httpService: HttpService, private configService: ConfigService) {
    
  }

  create(createScoreDto: CreateScoreDto) {

  }

  findAll(): Observable<AxiosResponse<Score[]> | any> {
    return this.httpService
      .get(`${this.configService.get('COUCH_DB_URL')}/scores/_all_docs?include_docs=true`, {
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

          let newArray = vm.filter(function (el) {
            return el.searchIndex != undefined;
          });

          return newArray;
        }),
      );
  }

  findOne(id: string): Observable<AxiosResponse<Score[]> | any> {
    return this.httpService
      .get(`${this.configService.get('COUCH_DB_URL')}/scores/${id}`, {
        auth: {
          username: 'admin',
          password: '@dmin',
        },
      })
      .pipe(map((response) => response.data));
  }

  // getScores(params: any) {
  //   return params;
  // }

  update(id: number, updateScoreDto: UpdateScoreDto) {
    return `This action updates a #${id} score`;
  }

  remove(id: number) {
    return `This action removes a #${id} score`;
  }
}
