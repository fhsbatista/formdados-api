import { AddBfRecordDTO } from '../../../../domain/usecases/add-bf-record'
import { BodyFatVO } from '../../../../domain/value-objects/body-fat-vo'

export interface AddBfRecordRepository {
  add(bf: AddBfRecordDTO): Promise<BodyFatVO>
}
