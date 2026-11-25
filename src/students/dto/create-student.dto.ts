import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateStudentDto {
  @IsString({ message: 'Nama harus berupa teks' })
  @IsNotEmpty({ message: 'Nama wajib diisi' })
  @MaxLength(100)
  name: string;

  @IsString({ message: 'NIM harus berupa teks' })
  @IsNotEmpty({ message: 'NIM wajib diisi' })
  @MaxLength(20)
  nim: string;

  @IsString({ message: 'Jurusan harus berupa teks' })
  @IsNotEmpty({ message: 'Jurusan wajib diisi' })
  @MaxLength(100)
  major: string;
}
