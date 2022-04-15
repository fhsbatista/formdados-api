import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { RecordMongoRepository } from './record-mongo-repository'

const makeSut = (): RecordMongoRepository => {
  return new RecordMongoRepository()
}

let recordCollection: Collection

describe('Record Mongo Repository ', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    recordCollection = await MongoHelper.getCollection('records')
    await recordCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return the persisted data on add success', async () => {
    const sut = makeSut()
    const result = await sut.add(32)
    expect(result).toBe(32)
  })

  test('Should persist the correct data on add', async () => {
    const sut = makeSut()
    await sut.add(32)
    const persisted = MongoHelper.map(await recordCollection.findOne({}))
    expect(persisted.data).toBe(32)
  })
})
