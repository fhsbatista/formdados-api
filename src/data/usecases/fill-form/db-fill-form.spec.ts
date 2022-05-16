import { FilledFormEntity } from '../../../domain/entities/filled-form-entity'
import { FillFormDTO } from '../../../domain/usecases/fill-form'
import { FillFormRepository } from '../../protocols/db/form/fill-form-repository'
import { DBFillForm } from './db-fill-form'

const makeFillFormRepository = (): FillFormRepository => {
  class FillFormRepositoryStub implements FillFormRepository {
    async fill (dto: FillFormDTO): Promise<FilledFormEntity> {
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

const makeFilledFormDto = (): FillFormDTO => ({
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
    const filledFormData = makeFilledFormDto()
    await sut.fill(filledFormData)
    expect(fillSpy).toHaveBeenCalledWith(filledFormData)
  })

  test('Should throw if FillFormRepository throws', async () => {
    const { sut, fillFormRepositoryStub } = makeSut()
    jest.spyOn(fillFormRepositoryStub, 'fill').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.fill(makeFilledFormDto())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if CreateFormRepository succeeds', async () => {
    const { sut } = makeSut()
    const result = await sut.fill(makeFilledFormDto())
    expect(result).toBe(null)
  })
})
