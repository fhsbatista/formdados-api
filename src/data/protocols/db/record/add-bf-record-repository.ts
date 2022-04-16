import { AddBfRecordDTO } from '../../../../domain/usecases/add-bf-record'

export interface AddBfRecordRepository {
  add(bf: AddBfRecordDTO): Promise<void>
}
