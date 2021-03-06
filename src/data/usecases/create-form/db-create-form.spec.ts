import { FormEntity } from '../../../domain/entities/form-entity'
import { CreateFormDTO } from '../../../domain/usecases/create-form'
import { CreateFormRepository } from '../../protocols/db/form/create-form-repository'
import { DBCreateForm } from './db-create-form'

const makeCreateFormRepository = (): CreateFormRepository => {
  class CreateFormRepositoryStub implements CreateFormRepository {
    async create (dto: CreateFormDTO): Promise<FormEntity> {
      return new Promise(resolve => resolve(null))
    }
  }
  return new CreateFormRepositoryStub()
}

interface SutTypes {
  sut: DBCreateForm
  createFormRepositoryStub: CreateFormRepository
}

const makeSut = (): SutTypes => {
  const createFormRepositoryStub = makeCreateFormRepository()
  const sut = new DBCreateForm(createFormRepositoryStub)
  return {
    sut,
    createFormRepositoryStub
  }
}

const makeCreateFormDTO = (): CreateFormDTO => ({
  fields: [{ name: 'date' }, { name: 'quantity' }]
})

describe('DBCreateForm usecase ', () => {
  test('Should call CreateFormRepository with correct values', async () => {
    const { sut, createFormRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(createFormRepositoryStub, 'create')
    const dto = makeCreateFormDTO()
    await sut.create(dto)
    expect(addSpy).toHaveBeenCalledWith(dto)
  })

  test('Should throw if CreateFormRepository throws', async () => {
    const { sut, createFormRepositoryStub } = makeSut()
    jest.spyOn(createFormRepositoryStub, 'create').mockImplementationOnce(() => { throw new Error() })
    const dto = makeCreateFormDTO()
    const promise = sut.create(dto)
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if CreateFormRepository succeeds', async () => {
    const { sut } = makeSut()
    const dto = makeCreateFormDTO()
    const result = await sut.create(dto)
    expect(result).toBe(null)
  })
})
