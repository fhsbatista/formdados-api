import { AddRecordRepository } from '../../../data/protocols/db/record/add-record-repository'

export class RecordMongoRepository implements AddRecordRepository {
  async add (data: any): Promise<void> {
    return null
  }
}
