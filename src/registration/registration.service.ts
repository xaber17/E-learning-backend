import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { RegistrationsUserEntity } from './entities/registration.entity';
import { UserIdentity } from '../user-identities/entities/user-identities.entity';
import { UsersEntity } from '../user-identities/entities/users.entity';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { inspect } from 'util';

@Injectable()
export class RegistrationService {
  constructor(
    @InjectRepository(RegistrationsUserEntity)
    private registrationUserRepository: Repository<RegistrationsUserEntity>,
    @InjectRepository(UserIdentity)
    private userIdentityRepository: Repository<UserIdentity>,
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
    @InjectPinoLogger(RegistrationService.name)
    private readonly logger: PinoLogger,
  ) {}
  async registrationPartic(
    registrationUserDto: CreateRegistrationDto,
    id: number,
  ) {
    try {
      const identitie = await this.userIdentityRepository.findOne({
        where: { reference_id: id, is_enable: true },
      });

      if (!identitie) {
        this.logger.info(
          'UserIdentity tidak ada'
        );
        throw Error('Data tidak ditemukan');
      }

      const user = await this.usersRepository.findOne({
        where: { id: identitie.reference_id, status: 'PREREGISTRATION' },
      });

      if (!user) {
        this.logger.info(
          'User tidak ada'
        );
        throw Error('Data tidak ditemukan');
      }

      const preUser =
        await this.registrationUserRepository.findOne({
          where: { ref_id: registrationUserDto.ref_id },
        });
      if (preUser?.status == 'approve') {
        return { message: 'Akun Sudah diaprove' };
      } else if (preUser?.status == 'reject') {
        registrationUserDto.status = 'waiting_for_review';
      }

      let registration = Object.assign(
        new RegistrationsUserEntity(),
        registrationUserDto,
      );
      if (preUser) {
        registration.updated_by = user.fullname;
      } else {
        registration.created_by = user.fullname;
      }

      await this.registrationUserRepository.save(registration);
      return { message: 'Success' };
    } catch (e) {
      this.logger.info(
        e.message || inspect(e, true),
        'RegistrationService.registrationBene',
      );
      throw new BadRequestException(e);
    }
  }

  async getRegistrationData(id: number) {
    try {
      const identitie = await this.userIdentityRepository.findOne({
        where: { reference_id: id, is_enable: true },
      });
      const users = await this.usersRepository.findOne({
        where: { id: identitie?.reference_id ?? id, status: 'PREREGISTRATION' },
      });
      const data = {
        employee_number: users?.employee_number,
        pension_number: users?.pension_number,
        tmt_pension: users?.registration_date,
        prl: {
          grade_type: users?.grade_type,
          grade: users?.grade,
        },
        identity_number: users?.identity_number,
        family_deed_number: users?.family_deed_number,
        fullname: users?.fullname,
        place_of_birth: users?.place_of_birth,
        date_of_birth: users?.date_of_birth
      };

      return data;
    } catch (e) {
      throw new NotFoundException(e);
    }
  }

  async dataRegistrationPartic(id: number) {
    try {
      const registration = await this.registrationUserRepository.findOne({ 
        where: { ref_id: id }
      });
      if (registration) {
        return registration;
      }
      throw new NotFoundException("Data Registrasi Tidak Ditemukan");
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
