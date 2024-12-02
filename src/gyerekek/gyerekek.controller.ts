import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Put } from '@nestjs/common';
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

  

  @Put(':id/jatekok/:jatekid')
  async put(@Param('id') id: string, @Param('jatekid') jatekid: string,  @Body() updateGyerekekDto: UpdateGyerekekDto){
    

  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const child = await this.gyerekekService.remove(+id);
    if (!child) throw new NotFoundException('No child with this id ' + id);
  }
}
