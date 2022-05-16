import { FillFormDTO } from '../../../domain/usecases/fill-form'
import { FillFormRepository } from '../../protocols/db/form/fill-form-repository'
import { DBFillForm } from './db-fill-form'

const makeFillFormRepository = (): FillFormRepository => {
  class FillFormRepositoryStub implements FillFormRepository {
    async fill (dto: FillFormDTO): Promise<void> {
      return new Promise(resolve => resolve(null))
    }
  }
  return new FillFormRepositoryStub()
}

interface SutTypes {
  sut: DBFillForm
  fillFormRepositoryStub: FillFormRepository
}

const makeSut = (): SutTypes => {
  const fillFormRepositoryStub = makeFillFormRepository()
  const sut = new DBFillForm(fillFormRepositoryStub)
  return {
    sut,
    fillFormRepositoryStub
  }
}

const makeFilledFormData = (): FillFormDTO => ({
  formId: 'any_id',
  filledFields: [{
    fieldName: 'any_name',
    value: 'any_value'
  },
  {
    fieldName: 'any_other_name',
    value: 'any_other_value'
  }]
})

describe('DBFillForm Usecase', () => {
  test('Should call FillFormRepository with correct values', async () => {
    const { sut, fillFormRepositoryStub } = makeSut()
    const fillSpy = jest.spyOn(fillFormRepositoryStub, 'fill')
    const filledFormData = makeFilledFormData()
    await sut.fill(filledFormData)
    expect(fillSpy).toHaveBeenCalledWith(filledFormData)
  })
})
