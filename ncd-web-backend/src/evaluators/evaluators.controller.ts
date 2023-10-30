import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EvaluatorsService } from './evaluators.service';
import { CreateEvaluatorDto } from './dto/create-evaluator.dto';
import { UpdateEvaluatorDto } from './dto/update-evaluator.dto';

@Controller('evaluators')
export class EvaluatorsController {
  constructor(private readonly evaluatorsService: EvaluatorsService) {}

  @Post()
  create(@Body() createEvaluatorDto: CreateEvaluatorDto) {
    return this.evaluatorsService.create(createEvaluatorDto);
  }

  @Get()
  findAll() {
    return this.evaluatorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.evaluatorsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEvaluatorDto: UpdateEvaluatorDto) {
    return this.evaluatorsService.update(+id, updateEvaluatorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.evaluatorsService.remove(+id);
  }
}
