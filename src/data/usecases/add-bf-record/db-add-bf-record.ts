import { AddBfRecord, AddBfRecordDTO } from '../../../domain/usecases/add-bf-record'
import { BodyFatVO } from '../../../domain/value-objects/body-fat-vo'
import { AddBfRecordRepository } from '../../protocols/db/record/add-bf-record-repository'

export class DBAddBfRecord implements AddBfRecord {
  constructor (private readonly repository: AddBfRecordRepository) {}

  async add (bf: AddBfRecordDTO): Promise<BodyFatVO> {
    return this.repository.add(bf)
  }
}
