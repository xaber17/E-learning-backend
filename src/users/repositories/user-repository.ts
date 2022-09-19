import { EntityRepository, In, Repository } from "typeorm";
import { UserIdentity } from "../entities/user.entity";

@EntityRepository(UserIdentity)
export class ParticipantRepository extends Repository<UserIdentity> {
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