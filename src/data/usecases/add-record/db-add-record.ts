import { AddRecord } from '../../../domain/usecases/add-record'
import { AddRecordRepository } from '../../protocols/db/record/add-record-repository'

export class DBAddRecord implements AddRecord {
  constructor (private readonly repository: AddRecordRepository) {}

  async add (data: any): Promise<void> {
    await this.repository.add(data)
    return null
  }
}
