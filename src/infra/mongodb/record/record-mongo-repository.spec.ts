import { RecordMongoRepository } from './record-mongo-repository'

const makeSut = (): RecordMongoRepository => {
  return new RecordMongoRepository()
}

describe('Record Mongo Repository ', () => {
  test('Should return the persisted data on add success', async () => {
    const sut = makeSut()
    const result = await sut.add(32)
    expect(result).toBe(32)
  })
})
