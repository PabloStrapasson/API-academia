import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlanDto } from './dto/createPlan.dto';
import { UpdatePlanDto } from './dto/updatePlan.dto';
import { ListPlansDto } from './dto/listPlan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PlanEntity } from './plan.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(PlanEntity)
    private readonly planRepository: Repository<PlanEntity>,
  ) {}

  async createPlan(createPlanDto: CreatePlanDto) {
    const plan = new PlanEntity();
    Object.assign(plan, createPlanDto as PlanEntity);
    const newPlan = await this.planRepository.save(plan);

    const planDto = new ListPlansDto(
      newPlan.id,
      newPlan.name,
      newPlan.price,
      newPlan.description,
    );

    return planDto;
  }

  async findAllPlans() {
    const plans = await this.planRepository.find();
    const planList = plans.map(
      (plan) =>
        new ListPlansDto(plan.id, plan.name, plan.price, plan.description),
    );

    return planList;
  }

  async findPlanById(id: string) {
    const plan = await this.planRepository.findOneBy({ id });
    if (plan === null) {
      throw new NotFoundException('Plano não encontrado!');
    }

    const planDto = new ListPlansDto(
      plan.id,
      plan.name,
      plan.price,
      plan.description,
    );

    return planDto;
  }

  async updatePlan(id: string, updatePlanDto: UpdatePlanDto) {
    const plan = await this.planRepository.findOneBy({ id });
    if (plan === null) {
      throw new NotFoundException('Plano não encontrado!');
    }

    Object.assign(plan, updatePlanDto as PlanEntity);
    const updatedPlan = await this.planRepository.save(plan);

    const planDto = new ListPlansDto(
      updatedPlan.id,
      updatedPlan.name,
      updatedPlan.price,
      updatedPlan.description,
    );

    return planDto;
  }

  async removePlan(id: string) {
    const result = await this.planRepository.delete(id);

    if (!result.affected) throw new NotFoundException('Plano não encontrado!');
  }
}
