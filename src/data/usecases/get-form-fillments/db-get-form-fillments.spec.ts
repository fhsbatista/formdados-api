import { FieldFieldEntity } from '../../../domain/entities/filled-form-entity'
import { GetFormFillmentsRepository } from '../../protocols/db/form/get-form-fillments-repository'
import { DBGetFormFillments } from './db-get-form-fillments'

interface SutTypes {
  sut: DBGetFormFillments
  getFormFillmentsRepositoryStub: GetFormFillmentsRepository
}

const makeGetFormFillmentsRepository = (): GetFormFillmentsRepository => {
  class GetFormFillmentsRepositoryStub implements GetFormFillmentsRepository {
    async get (formId: String): Promise<FieldFieldEntity[]> {
      return new Promise(resolve => resolve(null))
    }
  }
  return new GetFormFillmentsRepositoryStub()
}

const makeSut = (): SutTypes => {
  const getFormFillmentsRepositoryStub = makeGetFormFillmentsRepository()
  const sut = new DBGetFormFillments(getFormFillmentsRepositoryStub)
  return {
    sut,
    getFormFillmentsRepositoryStub
  }
}

describe('DBGetFormFillments usecase', () => {
  test('Should call GetFormFillments with correct value', async () => {
    const { sut, getFormFillmentsRepositoryStub } = makeSut()
    const getSpy = jest.spyOn(getFormFillmentsRepositoryStub, 'get')
    const formId = 'any_form_id'
    await sut.get(formId)
    expect(getSpy).toHaveBeenCalledWith(formId)
  })
})
