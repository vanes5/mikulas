import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJatekokDto } from './dto/create-jatekok.dto';
import { UpdateJatekokDto } from './dto/update-jatekok.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class JatekokService {

  constructor(private readonly ps : PrismaService){};

  create(createJatekokDto: CreateJatekokDto) {
    return this.ps.toys.create({
      data: createJatekokDto
    });
  }

  findAll() {
    return this.ps.toys.findMany();
  }

  async findOne(id: number) {
    try{
      return await this.ps.toys.findUnique({
        where:{
          id
        }
      });
    }
    catch{
      return undefined;
    }
  }

  async update(id: number, updateJatekokDto: UpdateJatekokDto) {
    try{
      return await this.ps.toys.update({
        data: updateJatekokDto,
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
      return await this.ps.toys.delete({
        where:{
          id
        }
      });
    }
    catch{
      return undefined;
    }
  }
}
