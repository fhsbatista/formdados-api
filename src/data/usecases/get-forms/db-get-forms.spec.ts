import { FormEntity } from '../../../domain/entities/form-entity'
import { GetFormsRepository } from '../../protocols/db/form/get-forms-repository'
import { DBGetForms } from './db-get-forms'

const makeGetFormsRepository = (): GetFormsRepository => {
  class GetFormsRepositoryStub implements GetFormsRepository {
    async get (): Promise<FormEntity[]> {
      return new Promise(resolve => resolve(null))
    }
  }
  return new GetFormsRepositoryStub()
}

interface SutTypes {
  sut: DBGetForms
  getFormsRepositoryStub: GetFormsRepository
}

const makeSut = (): SutTypes => {
  const getFormsRepositoryStub = makeGetFormsRepository()
  const sut = new DBGetForms(getFormsRepositoryStub)
  return {
    sut,
    getFormsRepositoryStub
  }
}

describe('DBGetForms usecase ', () => {
  test('Should call GetFormsRepository with no values', async () => {
    const { sut, getFormsRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(getFormsRepositoryStub, 'get')
    await sut.get()
    expect(addSpy).toHaveBeenCalled()
  })
})
