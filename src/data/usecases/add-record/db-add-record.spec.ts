import { AddRecordRepository } from '../../protocols/db/record/add-record-repository'
import { DBAddRecord } from './db-add-record'

const makeAddRecordRepository = (): AddRecordRepository => {
  class AddRecordRepositoryStub implements AddRecordRepository {
    async add (data: any): Promise<void> {
      return new Promise(resolve => resolve(data))
    }
  }
  return new AddRecordRepositoryStub()
}

interface SutTypes {
  sut: DBAddRecord
  addRecordRepositoryStub: AddRecordRepository
}

const makeSut = (): SutTypes => {
  const addRecordRepositoryStub = makeAddRecordRepository()
  const sut = new DBAddRecord(addRecordRepositoryStub)
  return {
    sut,
    addRecordRepositoryStub
  }
}

describe('DBAddRecord usecase ', () => {
  test('Should call AddRecordRepository with correct values', async () => {
    const { sut, addRecordRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addRecordRepositoryStub, 'add')
    await sut.add(22.9)
    expect(addSpy).toHaveBeenCalledWith(22.9)
  })

  test('Should throw if AddRecordRepository throws', async () => {
    const { sut, addRecordRepositoryStub } = makeSut()
    jest.spyOn(addRecordRepositoryStub, 'add').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.add(30)
    await expect(promise).rejects.toThrow()
  })

  test('Should return repository result if AddRecordRepository succeeds', async () => {
    const { sut } = makeSut()
    const result = await sut.add(30)
    expect(result).toBe(30)
  })
})
