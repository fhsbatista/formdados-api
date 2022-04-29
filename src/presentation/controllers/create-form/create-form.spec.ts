import { CreateForm, CreateFormController, CreateFormDTO } from './create-form-protocols'

interface SutType {
  sut: CreateFormController
  createFormStub: CreateForm
}

const makeCreateForm = (): CreateForm => {
  class CreateFormStub implements CreateForm {
    async create (data: CreateFormDTO): Promise<any> {
      return null
    }
  }
  return new CreateFormStub()
}

const makeSut = (): SutType => {
  const createFormStub = makeCreateForm()
  const sut = new CreateFormController(createFormStub)
  return {
    sut,
    createFormStub
  }
}

describe('CreateForm controller ', () => {
  test('Should call CreateForm with correct values', async () => {
    const { sut, createFormStub } = makeSut()
    const createSpy = jest.spyOn(createFormStub, 'create')
    const fakeRequest = {
      body: {
        fields: ['date', 'quantity']
      }
    }
    await sut.handle(fakeRequest)
    expect(createSpy).toHaveBeenCalledWith({ fields: ['date', 'quantity'] })
  })
})
