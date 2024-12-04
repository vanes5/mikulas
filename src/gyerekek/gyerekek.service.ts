import { Catch, Injectable, MethodNotAllowedException, NotFoundException } from '@nestjs/common';
import { CreateGyerekekDto } from './dto/create-gyerekek.dto';
import { UpdateGyerekekDto } from './dto/update-gyerekek.dto';
import { PrismaService } from 'src/prisma.service';
import { JatekokService } from 'src/jatekok/jatekok.service';

@Injectable()
export class GyerekekService {
  constructor(
    private readonly ps : PrismaService,
    private readonly js: JatekokService
  ){};
  
  create(createGyerekekDto: CreateGyerekekDto) {
    return this.ps.children.create({
      data: createGyerekekDto
    });
  }

  findAll() {
    return this.ps.children.findMany();
  }

  async findOne(id: number) {
    try{
      return await this.ps.children.findUnique({
        where:{
          id
        }
      });
    }
    catch{
      return undefined
    }
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

  async put(id:number, toyid:number){
    const child = await this.findOne(+id);
    if(!child) throw new NotFoundException('No child with this id ' + id)
    const toy = await this.js.findOne(+toyid);
    if(!toy) throw new NotFoundException('No toy with this id ' + toyid)
    
    try{
        await this.ps.giftList.create({
          data:{
            childId: id,
            toyId: toyid
          }
        })
    }
    catch(err){
      throw new MethodNotAllowedException("You already added this toy to this child"); 
    }
  }

  async removeToy(id:number, toyid: number){
    const child = await this.findOne(+id);
    if(!child) throw new NotFoundException('No child with this id ' + id)
    const toy = await this.js.findOne(+toyid);
    if(!toy) throw new NotFoundException('No toy with this id ' + toyid)
    try{
      await this.ps.giftList.deleteMany({
        where:{
          childId: id,
          toyId: toyid
        }
      })
    }
    catch(err){
      throw new Error(err); 
    }
  }

  async getGiftList(){
    return await this.ps.giftList.findMany({
      select:{
        children:{
          select:{
            name: true
          }
        },
        toys: {
          select: {
            name: true
          }
        }
      }
    });
  }
}
