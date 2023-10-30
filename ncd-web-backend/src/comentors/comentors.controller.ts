import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComentorsService } from './comentors.service';
import { CreateComentorDto } from './dto/create-comentor.dto';
import { UpdateComentorDto } from './dto/update-comentor.dto';

@Controller('comentors')
export class ComentorsController {
  constructor(private readonly comentorsService: ComentorsService) {}

  @Post()
  create(@Body() createComentorDto: CreateComentorDto) {
    return this.comentorsService.create(createComentorDto);
  }

  @Get()
  findAll() {
    return this.comentorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comentorsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComentorDto: UpdateComentorDto) {
    return this.comentorsService.update(+id, updateComentorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comentorsService.remove(+id);
  }
}
