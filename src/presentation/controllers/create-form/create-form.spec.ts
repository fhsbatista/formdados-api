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
        fields: [{ name: 'date' }, { name: 'quantity' }]
      }
    }
    await sut.handle(fakeRequest)
    expect(createSpy).toHaveBeenCalledWith({ fields: [{ name: 'date' }, { name: 'quantity' }] })
  })

  test('Should return 400 if the field "fields" is not provided', async () => {
    const { sut } = makeSut()
    const fakeRequest = {
      body: {
        anyField: 'any_value'
      }
    }
    const response = await sut.handle(fakeRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new Error('Missing param: fields'))
  })

  test('Should return 400 if the fields field is empty', async () => {
    const { sut } = makeSut()
    const fakeRequest = {
      body: {
        fields: []
      }
    }
    const response = await sut.handle(fakeRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new Error('Missing param: fields'))
  })

  test('Should return 400 if a field which does not contain a name', async () => {
    const { sut } = makeSut()
    const fakeRequest = {
      body: {
        fields: [
          'any_value',
          { names: 'any_other_value' }
        ]
      }
    }
    const response = await sut.handle(fakeRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new Error('Invalid fields has been provided'))
  })

  test('Should return 500 if CreateForm throws', async () => {
    const { sut, createFormStub } = makeSut()
    jest.spyOn(createFormStub, 'create').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const fakeRequest = {
      body: {
        fields: [{ name: 'date' }, { name: 'quantity' }]
      }
    }
    const response = await sut.handle(fakeRequest)
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual(new Error('Internal server error'))
  })

  test('Should return 200 if CreateFormSucceeds', async () => {
    const { sut } = makeSut()
    const fakeRequest = {
      body: {
        fields: [{ name: 'date' }, { name: 'quantity' }]
      }
    }
    const response = await sut.handle(fakeRequest)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({ message: 'Form created successfully' })
  })
})
