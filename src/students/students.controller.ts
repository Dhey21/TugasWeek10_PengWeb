import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  async create(@Body() dto: CreateStudentDto) {
    const data = await this.studentsService.create(dto);
    return { message: 'Mahasiswa berhasil ditambahkan', data };
  }

  // GET /api/students atau GET /api/students?major=informatika
  @Get()
  async findAll(@Query('major') major?: string) {
    const data = await this.studentsService.findAll(major);
    return { message: 'Data mahasiswa berhasil diambil', data };
  }

  // Harus di atas ':id' supaya "stats" tidak dibaca sebagai id
  @Get('stats')
  async stats() {
    const data = await this.studentsService.stats();
    return { message: 'Statistik mahasiswa berhasil diambil', data };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.studentsService.findOne(id);
    return { message: 'Data mahasiswa berhasil diambil', data };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStudentDto,
  ) {
    const data = await this.studentsService.update(id, dto);
    return { message: 'Mahasiswa berhasil diperbarui', data };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const data = await this.studentsService.remove(id);
    return { message: 'Mahasiswa berhasil dihapus', data };
  }
}
