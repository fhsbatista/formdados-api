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

  test('Should throw if repository throws', async () => {
    const { sut, getFormsRepositoryStub } = makeSut()
    jest.spyOn(getFormsRepositoryStub, 'get').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.get()
    await expect(promise).rejects.toThrow()
  })

  test('Should return forms list if on repository success', async () => {
    const forms = [
      { id: 'any_id', fields: [{ name: 'date' }, { name: 'quantity' }] },
      { id: 'any_id2', fields: [{ name: 'name' }, { name: 'profession' }] }
    ]
    const { sut, getFormsRepositoryStub } = makeSut()
    jest.spyOn(getFormsRepositoryStub, 'get').mockReturnValueOnce(new Promise(resolve => resolve(forms)))
    const result = await sut.get()
    expect(result).toBe(forms)
  })
})
