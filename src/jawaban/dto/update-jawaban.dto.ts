import { PartialType } from '@nestjs/swagger';
import { CreateJawabanDto } from './create-jawaban.dto';

export class UpdateJawabanDto extends PartialType(CreateJawabanDto) {}
