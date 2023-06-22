import { IsOptional } from "class-validator";

export class CreateJawabanDto {
  soal_id: number;

  user_id: number;

  @IsOptional()
  nilai: number;

  file_id: string;
}
