import { Injectable } from '@nestjs/common';
import { CreateEvaluatorDto } from './dto/create-evaluator.dto';
import { UpdateEvaluatorDto } from './dto/update-evaluator.dto';
import { AxiosResponse } from 'axios';
import { Observable, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Evaluator } from './entities/evaluator.entity';
import { ConfigService } from '@nestjs/config/dist';


@Injectable()
export class EvaluatorsService {

  constructor(private readonly httpService: HttpService, private configService: ConfigService) {}

  create(createEvaluatorDto: CreateEvaluatorDto) {
    return 'This action adds a new evaluator';
  }

  findAll(): Observable<AxiosResponse<Evaluator[]> | any> {
    return this.httpService
      .get(`${this.configService.get('COUCH_DB_URL')}/users/_all_docs?include_docs=true`, {
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
            return el.username != undefined;
          });

          return newArray;
        }),
      );
  }


  findOne(id: number) {
    return `This action returns a #${id} evaluator`;
  }

  update(id: number, updateEvaluatorDto: UpdateEvaluatorDto) {
    return `This action updates a #${id} evaluator`;
  }

  remove(id: number) {
    return `This action removes a #${id} evaluator`;
  }
}
