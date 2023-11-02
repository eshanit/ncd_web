import { Injectable } from '@nestjs/common';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { HttpService } from '@nestjs/axios';
import { Evaluation } from './entities/evaluation.entity';
import { AxiosResponse } from 'axios';
import { Observable, map } from 'rxjs';
import { ConfigService } from '@nestjs/config/dist';

@Injectable()
export class EvaluationsService {
  constructor(private readonly httpService: HttpService, private configService: ConfigService) {}

  create(createEvaluationDto: CreateEvaluationDto) {
    return 'This action adds a new evaluation';
  }

  findAll(): Observable<AxiosResponse<Evaluation[]> | any> {
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

          newArray.forEach(function (el){
            el.menteeId = el.info.menteeInfo[0].id
            el.district = el.info.menteeInfo[0].district
            el.facility = el.info.menteeInfo[0].facility
          })

          return newArray;
        }),
      );
  }

  findOne(id: string): Observable<AxiosResponse<Evaluation[]> | any> {
    return this.httpService
      .get(`${this.configService.get('COUCH_DB_URL')}/scores/${id}`, {
        auth: {
          username: 'admin',
          password: '@dmin',
        },
      })
      .pipe(map((response) => response.data));
  }

  update(id: number, updateEvaluationDto: UpdateEvaluationDto) {
    return `This action updates a #${id} evaluation`;
  }

  remove(id: number) {
    return `This action removes a #${id} evaluation`;
  }

  getEvalsByMentee(id: string): Observable<AxiosResponse<Evaluation[]> | any> {
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

          let newMenteeArray = newArray.filter(function (el) {
            return el.info.menteeInfo[0].id === id;
          });

          return newMenteeArray
    
        }),
      );
  }

  

  

}
