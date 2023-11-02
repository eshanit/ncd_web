import { Injectable } from '@nestjs/common';
import { CreateIncompleteDto } from './dto/create-incomplete.dto';
import { UpdateIncompleteDto } from './dto/update-incomplete.dto';
import { HttpService } from '@nestjs/axios';
import { Incomplete } from './entities/incomplete.entity';
import { AxiosResponse } from 'axios';
import { Observable, map } from 'rxjs';
import { ConfigService } from '@nestjs/config/dist';

@Injectable()
export class IncompleteService {
  constructor(private readonly httpService: HttpService, private configService: ConfigService) {}

  create(createIncompleteDto: CreateIncompleteDto) {
    return 'This action adds a new incomplete';
  }

   findAll(): Observable<AxiosResponse<Incomplete[]> | any> {
    return this.httpService
      .get(`${this.configService.get('COUCH_DB_URL')}/incomplete_evals/_all_docs?include_docs=true`, {
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
            return el.status == 'incomplete';
          });

          newArray.forEach(function (el){
            el.menteeId = el.mentee.id
            el.menteeFirstname = el.mentee.firstname,
            el.menteeLastname = el.mentee.lastname,
            el.district = el.mentee.district
            el.facility = el.mentee.facility
          })

          return newArray;
        }),
      );
  }

  findOne(id: number) {
    return `This action returns a #${id} incomplete`;
  }

  update(id: number, updateIncompleteDto: UpdateIncompleteDto) {
    return `This action updates a #${id} incomplete`;
  }

  remove(id: number) {
    return `This action removes a #${id} incomplete`;
  }
}
