import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}

  // Read all, dengan filter opsional berdasarkan jurusan (where)
  findAll(major?: string) {
    return this.prisma.student.findMany({
      where: major
        ? { major: { contains: major, mode: 'insensitive' } }
        : undefined,
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const student = await this.prisma.student.findUnique({ where: { id } });
    if (!student) {
      throw new NotFoundException(`Mahasiswa dengan id ${id} tidak ditemukan`);
    }
    return student;
  }

  async create(dto: CreateStudentDto) {
    try {
      return await this.prisma.student.create({ data: dto });
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(id: number, dto: UpdateStudentDto) {
    try {
      return await this.prisma.student.update({ where: { id }, data: dto });
    } catch (error) {
      this.handleError(error, id);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.student.delete({ where: { id } });
    } catch (error) {
      this.handleError(error, id);
    }
  }

  // Statistik sederhana (count): total dan jumlah per jurusan
  async stats() {
    const [total, perMajor] = await Promise.all([
      this.prisma.student.count(),
      this.prisma.student.groupBy({
        by: ['major'],
        _count: { _all: true },
        orderBy: { major: 'asc' },
      }),
    ]);

    return {
      total,
      perMajor: perMajor.map((m) => ({ major: m.major, count: m._count._all })),
    };
  }

  private handleError(error: unknown, id?: number): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new ConflictException('NIM sudah terdaftar');
      }
      if (error.code === 'P2025') {
        throw new NotFoundException(
          `Mahasiswa dengan id ${id} tidak ditemukan`,
        );
      }
    }
    throw error;
  }
}
