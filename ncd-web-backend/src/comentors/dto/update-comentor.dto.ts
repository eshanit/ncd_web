import { PartialType } from '@nestjs/mapped-types';
import { CreateComentorDto } from './create-comentor.dto';

export class UpdateComentorDto extends PartialType(CreateComentorDto) {}
