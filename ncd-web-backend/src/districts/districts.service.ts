import { Injectable } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { AxiosResponse } from 'axios';
import { Observable, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { District } from './entities/district.entity';
import { ConfigService } from '@nestjs/config/dist';

@Injectable()
export class DistrictsService {

  constructor(private readonly httpService: HttpService, private configService: ConfigService) {}

  create(createDistrictDto: CreateDistrictDto) {
    return 'This action adds a new district';
  }

  findAll(): Observable<AxiosResponse<District[]> | any> {
    return this.httpService
      .get(`${this.configService.get('COUCH_DB_URL')}/districts/_all_docs?include_docs=true`, {
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
    return `This action returns a #${id} district`;
  }

  update(id: number, updateDistrictDto: UpdateDistrictDto) {
    return `This action updates a #${id} district`;
  }

  remove(id: number) {
    return `This action removes a #${id} district`;
  }
}
