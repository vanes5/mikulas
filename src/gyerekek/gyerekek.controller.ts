import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Put, ParseIntPipe } from '@nestjs/common';
import { GyerekekService } from './gyerekek.service';
import { CreateGyerekekDto } from './dto/create-gyerekek.dto';
import { UpdateGyerekekDto } from './dto/update-gyerekek.dto';

@Controller('gyerekek')
export class GyerekekController {
  constructor(private readonly gyerekekService: GyerekekService) {}

  @Post()
  create(@Body() createGyerekekDto: CreateGyerekekDto) {
    return this.gyerekekService.create(createGyerekekDto);
  }

  @Get()
  findAll() {
    return this.gyerekekService.findAll();
  }

  @Get('/jatekok')
  async getGiftList(){
    return this.gyerekekService.getGiftList();  
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const child =  await this.gyerekekService.findOne(+id);
    if(!child) throw new NotFoundException('No child with this id ' + id);
      return child;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateGyerekekDto: UpdateGyerekekDto) {
    const child = await this.gyerekekService.update(+id, updateGyerekekDto);
    if (!child) throw new NotFoundException('No child with this id ' + id);
  }

  

  @Put(':id/jatekok/:toyid')
  async put(@Param('id') id: string, @Param('toyid') toyid: string){
    return await this.gyerekekService.put(+id, +toyid)
  }

  @Delete(':id/jatekok/:toyid')
  async removeToy(@Param('id') id: string, @Param('toyid') toyid: string){
    return await this.gyerekekService.removeToy(+id, +toyid);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const child = await this.gyerekekService.remove(+id);
    if (!child) throw new NotFoundException('No child with this id ' + id);
  }

  
}
