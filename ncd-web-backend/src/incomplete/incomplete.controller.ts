import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IncompleteService } from './incomplete.service';
import { CreateIncompleteDto } from './dto/create-incomplete.dto';
import { UpdateIncompleteDto } from './dto/update-incomplete.dto';

@Controller('incomplete')
export class IncompleteController {
  constructor(private readonly incompleteService: IncompleteService) {}

  @Post()
  create(@Body() createIncompleteDto: CreateIncompleteDto) {
    return this.incompleteService.create(createIncompleteDto);
  }

  @Get()
  findAll() {
    return this.incompleteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.incompleteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIncompleteDto: UpdateIncompleteDto) {
    return this.incompleteService.update(+id, updateIncompleteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.incompleteService.remove(+id);
  }
}
