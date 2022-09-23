import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { RegistrationsUserEntity } from './entities/registration.entity';
import { RegistrationsBeneficiaryEntity } from './entities/registration-beneficiary.entity';
import { UserIdentity } from '../user-identities/entities/user-identities.entity';
import { UsersEntity } from '../user-identities/entities/users.entity';
import { UserContactEntity } from 'src/user-identities/entities/user-contact.entity';
import { UserDomicileEntity } from 'src/user-identities/entities/user-demociles.entity';
import { BeneficaryEntity } from 'src/user-identities/entities/beneficary.entity';
import { BeneficaryContactEntity } from 'src/user-identities/entities/beneficary-contact.entity';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { inspect } from 'util';

@Injectable()
export class RegistrationService {
  constructor(
    @InjectRepository(RegistrationsBeneficiaryEntity)
    private registrationBeneficiaryRepository: Repository<RegistrationsBeneficiaryEntity>,
    @InjectRepository(RegistrationsUserEntity)
    private registrationUserRepository: Repository<RegistrationsUserEntity>,
    @InjectRepository(UserIdentity)
    private userIdentityRepository: Repository<UserIdentity>,
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
    @InjectRepository(UserContactEntity)
    private UserContactRepository: Repository<UserContactEntity>,
    @InjectRepository(UserDomicileEntity)
    private userDemocileRepository: Repository<UserDomicileEntity>,
    @InjectRepository(BeneficaryEntity)
    private pasanganRepository: Repository<BeneficaryEntity>,
    @InjectRepository(BeneficaryContactEntity)
    private BeneficaryContactRepository: Repository<BeneficaryContactEntity>,
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
          'UserIdentity tidak ada',
          'RegistrationService.registrationBene',
        );
        throw Error('Data tidak ditemukan');
      }

      const user = await this.usersRepository.findOne({
        where: { id: identitie.reference_id, status: 'PREREGISTRATION' },
      });

      if (!user) {
        this.logger.info(
          'User tidak ada',
          'RegistrationService.registrationBene',
        );
        throw Error('Data tidak ditemukan');
      }

      if (
        registrationUserDto.first_telephone_number ==
        registrationUserDto.emergency_contact
      ) {
        throw new BadRequestException(
          'Nomor HP dan Kontak Darurat Tidak Boleh Sama',
        );
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

  async registrationBene(
    registrationUserDto: CreateRegistrationDto,
    id: number,
  ) {
    try {
      const identitie = await this.userIdentityRepository.findOne({
        where: { reference_id: id, is_enable: true },
      });

      if (!identitie) {
        this.logger.info(
          'UserIdentity tidak ada',
          'RegistrationService.registrationBene',
        );
        throw Error('Data tidak ditemukan');
      }

      const user = await this.usersRepository.findOne({
        where: { id: identitie.reference_id, status: 'PREREGISTRATION' },
      });

      if (!user) {
        this.logger.info(
          'User tidak ada',
          'RegistrationService.registrationBene',
        );
        throw Error('Data tidak ditemukan');
      }

      let preBeneficiaries =
        await this.registrationBeneficiaryRepository.findOne({
          where: { ref_id: registrationUserDto.ref_id },
        });
      if (preBeneficiaries?.status == 'approve') {
        return { message: 'Akun Anda sudah disetujui' };
      } else if (preBeneficiaries?.status == 'reject') {
        registrationUserDto.status = 'waiting_for_review';
      }

      if (
        registrationUserDto.first_telephone_number ==
          registrationUserDto.emergency_contact ||
        registrationUserDto.emergency_contact == identitie.phone_number
      ) {
        throw new BadRequestException(
          'Kontak Darurat tidak boleh sama dengan Nomor HP utama dan Kontak Pertama',
        );
      }

      let registration = Object.assign(
        new RegistrationsBeneficiaryEntity(),
        registrationUserDto,
      );
      if (preBeneficiaries) {
        registration.updated_by = user.fullname;
      } else {
        registration.created_by = user.fullname;
      }

      await this.registrationBeneficiaryRepository.save(registration);
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
      const contact = await this.UserContactRepository.findOne({
        where: { user_id: users.id, is_emergency_contact: 0 },
        order: { id: 'DESC' },
      });
      const demociles = await this.userDemocileRepository.findOne({
        where: { user_id: users.id },
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
        date_of_birth: users?.date_of_birth,
        first_telephone_number: contact?.first_telephone_number,
        second_telephone_number: contact?.second_telephone_number,
        email: contact?.email,
        email_corporate: contact?.email_corporate,
        emergency_contact: contact?.first_telephone_number,
        emergency_contact_name: contact?.name,
      };

      return data;
    } catch (e) {
      throw new NotFoundException(e);
    }
  }

  async getRegistrationDataPasangan(id: number) {
    try {
      const identitie = await this.userIdentityRepository.findOne({
        where: { reference_id: id, is_enable: true },
      });
      const users = await this.usersRepository.findOne({
        where: { id: identitie?.reference_id ?? id, status: 'PREREGISTRATION' },
      });
      const contact = await this.UserContactRepository.findOne({
        where: { user_id: users.id, is_emergency_contact: 0 },
        order: { id: 'DESC' },
      });
      const pasangan = await this.pasanganRepository.findOne({
        where: {
          user_id: users?.id ?? id,
          status: 'active',
          beneficiary_type: '10',
        },
      });
      if (pasangan) {
        const contactPasangan = await this.BeneficaryContactRepository.find({
          where: { beneficiary_id: pasangan.id, is_emergency_contact: 0 },
          order: { id: 'DESC' },
          take: 1,
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
          fullname: pasangan?.fullname,
          place_of_birth: pasangan?.place_of_birth,
          date_of_birth: pasangan?.date_of_birth,
          first_telephone_number: contactPasangan[0]?.first_telephone_number,
          second_telephone_number: contactPasangan[0]?.second_telephone_number,
          email: contactPasangan[0]?.email,
          email_corporate: contact?.email_corporate,
          emergency_contact: contact?.first_telephone_number,
          emergency_contact_name: contact?.name,
        };

        return data;
      }

      throw new NotFoundException('Tidak ada data pasangan');
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

  async dataRegistrationBene(id: number) {
    try {
      const registration = await this.registrationBeneficiaryRepository.findOne({ 
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
