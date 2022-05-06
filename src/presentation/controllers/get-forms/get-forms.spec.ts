import { FormEntity } from '../../../domain/entities/form-entity'
import { GetForms, GetFormsController } from './get-forms-protocols'

interface SutType {
  sut: GetFormsController
  getFormsStub: GetForms
}

const makeFormEntityList = (): FormEntity[] => ([
  {
    id: '123asd',
    fields: [{ name: 'date' }, { name: 'quantity' }]
  }, {
    id: '124asd',
    fields: [{ name: 'name' }, { name: 'profession' }]
  }
])

const makeGetForms = (): GetForms => {
  class GetFormsStub implements GetForms {
    async get (): Promise<FormEntity[]> {
      return makeFormEntityList()
    }
  }
  return new GetFormsStub()
}

const makeSut = (): SutType => {
  const getFormsStub = makeGetForms()
  const sut = new GetFormsController(getFormsStub)
  return {
    sut,
    getFormsStub: getFormsStub
  }
}

describe('GetForms  controller ', () => {
  test('Should call GetForms ', async () => {
    const { sut, getFormsStub } = makeSut()
    const createSpy = jest.spyOn(getFormsStub, 'get')
    await sut.handle()
    expect(createSpy).toHaveBeenCalledWith()
  })
})
