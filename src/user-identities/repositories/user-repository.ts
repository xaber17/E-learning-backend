import { EntityRepository, In, Repository } from "typeorm";
import { UsersEntity } from "../entities/users.entity";

@EntityRepository(UsersEntity)
export class UserRepository extends Repository<UsersEntity> {
  findStatusActive(id: number) {
    return this.findOne({
      where: { id, status: In(['active', 'ACTIVE'])}
    });
  }

  findStatusActiveAndPreregis(id: number) {
    return this.findOne({
      where: { id, status: In(['PREREGISTRATION', 'active', 'ACTIVE'])}
    });
  }

  findStatusActivePreregisDeceased(id: number) {
    return this.findOne({
      where: { id, status: In(['PREREGISTRATION', 'active', 'ACTIVE', 'DECEASED'])}
    });
  }

  findStatusActiveDeceased(id: number) {
    return this.findOne({
      where: { id, status: In(['active', 'ACTIVE', 'DECEASED'])}
    });
  }

}