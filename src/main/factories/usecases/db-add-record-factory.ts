import { RecordMongoRepository } from '../../../infra/mongodb/record/record-mongo-repository'
import { DBAddRecord } from '../../../data/usecases/add-record/db-add-record'
import { AddRecord } from '../../../domain/usecases/add-record'

export const makeDBAddAccount = (): AddRecord => {
  const addRecordRepository = new RecordMongoRepository()
  return new DBAddRecord(addRecordRepository)
}
