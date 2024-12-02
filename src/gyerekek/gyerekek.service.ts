import { Injectable } from '@nestjs/common';
import { CreateGyerekekDto } from './dto/create-gyerekek.dto';
import { UpdateGyerekekDto } from './dto/update-gyerekek.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GyerekekService {
  constructor(private readonly ps : PrismaService){};
  
  create(createGyerekekDto: CreateGyerekekDto) {
    return this.ps.children.create({
      data: createGyerekekDto
    });
  }

  findAll() {
    return this.ps.children.findMany();
  }

  async findOne(id: number) {
    return await this.ps.children.findUnique({
      where:{
        id
      }
    });
  }

  async update(id: number, updateGyerekekDto: UpdateGyerekekDto) {
    try{
      return await this.ps.children.update({
        data: updateGyerekekDto,
        where: {
          id
        }
      });
    }
    catch{
      return undefined;
    }
  }

  async remove(id: number) {
    try{
      return await this.ps.children.delete({
        where: {
          id
        }
      });
    }
    catch{
      return undefined;
    }
  }
}
