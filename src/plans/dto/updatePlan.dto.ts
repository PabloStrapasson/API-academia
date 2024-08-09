import { PartialType } from '@nestjs/mapped-types';
import { CreatePlanDto } from './createPlan.dto';

export class UpdatePlanDto extends PartialType(CreatePlanDto) {}
