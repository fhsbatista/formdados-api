import { AddBfRecordDTO } from '../../../domain/usecases/add-bf-record'
import { AddBfRecordRepository } from '../../protocols/db/record/add-bf-record-repository'
import { DBAddBfRecord } from './db-add-bf-record'

const makeAddBfRecordRepository = (): AddBfRecordRepository => {
  class AddBfRecordRepositoryStub implements AddBfRecordRepository {
    async add (bf: AddBfRecordDTO): Promise<void> {
      return new Promise(resolve => resolve(null))
    }
  }
  return new AddBfRecordRepositoryStub()
}

interface SutTypes {
  sut: DBAddBfRecord
  addBfRecordRepositoryStub: AddBfRecordRepository
}

const makeSut = (): SutTypes => {
  const addBfRecordRepositoryStub = makeAddBfRecordRepository()
  const sut = new DBAddBfRecord(addBfRecordRepositoryStub)
  return {
    sut,
    addBfRecordRepositoryStub
  }
}

const makeAddBfRecordDTO = (): AddBfRecordDTO => ({
  date: new Date('2022-01-17'),
  percent: 22.3
})

describe('DBAddBfRecord usecase ', () => {
  test('Should call AddBfRecordRepository with correct values', async () => {
    const { sut, addBfRecordRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addBfRecordRepositoryStub, 'add')
    const dto = makeAddBfRecordDTO()
    await sut.add(dto)
    expect(addSpy).toHaveBeenCalledWith(dto)
  })
})
