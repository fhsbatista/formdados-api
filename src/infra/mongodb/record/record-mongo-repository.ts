import { AddRecordRepository } from '../../../data/protocols/db/record/add-record-repository'
import { MongoHelper } from '../helpers/mongo-helper'

export class RecordMongoRepository implements AddRecordRepository {
  async add (data: any): Promise<any> {
    const collection = await MongoHelper.getCollection('records')
    const result = await collection.insertOne({ data: data })
    const { insertedId: id } = result
    const persisted = await collection
      .findOne({ _id: id })
    return MongoHelper.map(persisted).data
  }
}
