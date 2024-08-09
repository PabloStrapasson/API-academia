import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/createPlan.dto';
import { UpdatePlanDto } from './dto/updatePlan.dto';

@Controller('plans')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post()
  async createPlan(@Body() createPlanDto: CreatePlanDto) {
    const newPlan = await this.planService.createPlan(createPlanDto);

    return {
      data: newPlan,
      message: 'Plano cadastrado com sucesso!',
    };
  }

  @Get()
  async findAllPlans() {
    const plans = await this.planService.findAllPlans();

    return {
      data: plans,
      message: 'Planos encontrados com sucesso!',
    };
  }

  @Get(':id')
  async findPlanById(@Param('id') id: string) {
    const plan = await this.planService.findPlanById(id);

    return {
      data: plan,
      message: 'Plano encontrado com sucesso!',
    };
  }

  @Patch(':id')
  async updatePlan(
    @Param('id') id: string,
    @Body() updatePlanDto: UpdatePlanDto,
  ) {
    const updatedPlan = await this.planService.updatePlan(id, updatePlanDto);

    return {
      data: updatedPlan,
      message: 'Plano atualizado com sucesso!',
    };
  }

  @Delete(':id')
  async removePlan(@Param('id') id: string) {
    const removedPlan = await this.planService.removePlan(id);

    return {
      data: removedPlan,
      message: 'Plano removido com sucesso!',
    };
  }
}
