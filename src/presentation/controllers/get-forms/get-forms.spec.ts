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

  test('Should return 500 if GetForms throws', async () => {
    const { sut, getFormsStub } = makeSut()
    jest.spyOn(getFormsStub, 'get').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const response = await sut.handle()
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual(new Error('Internal server error'))
  })

  test('Should return 200 with forms if GetForms Succeeds', async () => {
    const { sut } = makeSut()
    const response = await sut.handle()
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(makeFormEntityList())
  })
})
