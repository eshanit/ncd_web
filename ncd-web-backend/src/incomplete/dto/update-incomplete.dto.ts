import { PartialType } from '@nestjs/mapped-types';
import { CreateIncompleteDto } from './create-incomplete.dto';

export class UpdateIncompleteDto extends PartialType(CreateIncompleteDto) {}
