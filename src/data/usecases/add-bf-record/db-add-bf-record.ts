import { AddBfRecord, AddBfRecordDTO } from '../../../domain/usecases/add-bf-record'
import { AddBfRecordRepository } from '../../protocols/db/record/add-bf-record-repository'

export class DBAddBfRecord implements AddBfRecord {
  constructor (private readonly repository: AddBfRecordRepository) {}

  async add (bf: AddBfRecordDTO): Promise<void> {
    await this.repository.add(bf)
  }
}
