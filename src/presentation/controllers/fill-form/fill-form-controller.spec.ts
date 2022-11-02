import { FormEntity } from '../../../domain/entities/form-entity'
import { FillForm, FillFormController, FillFormDTO, GetForms, HttpRequest } from './fill-form-controller-protocols'

interface SutType {
  sut: FillFormController
  fillFormStub: FillForm
  getFormsStub: GetForms
}

const makeFormEntityList = (): FormEntity[] => ([
  {
    id: 'any_id',
    fields: [{ name: 'date' }, { name: 'quantity' }]
  }, {
    id: 'any_id_2',
    fields: [{ name: 'name' }, { name: 'profession' }]
  }
])

const makeFillForm = (): FillForm => {
  class FillFormStub implements FillForm {
    async fill (data: FillFormDTO): Promise<any> {
      return null
    }
  }
  return new FillFormStub()
}

const makeGetForms = (): GetForms => {
  class GetFormsStub implements GetForms {
    async get (): Promise<any> {
      return makeFormEntityList()
    }
  }
  return new GetFormsStub()
}

const makeSut = (): SutType => {
  const fillFormStub = makeFillForm()
  const getFormsStub = makeGetForms()
  const sut = new FillFormController(fillFormStub, getFormsStub)
  return {
    sut,
    fillFormStub,
    getFormsStub
  }
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    formId: 'any_id',
    filledFields: [{
      fieldName: 'any_name',
      value: 'any_value'
    },
    {
      fieldName: 'any_other_name',
      value: 'any_other_value'
    }]
  }
})

describe('FillForm controller ', () => {
  test('Should call GetForms', async () => {
    const { sut, getFormsStub } = makeSut()
    const getSpy = jest.spyOn(getFormsStub, 'get')
    const fakeRequest = makeFakeRequest()
    await sut.handle(fakeRequest)
    expect(getSpy).toHaveBeenCalledWith()
  })

  test('Should return 400 if the formId does not exist in GetForms result', async () => {
    const { sut } = makeSut()
    const fakeRequest = {
      body: {
        formId: 'non_existing_id',
        filledFields: [{
          fieldName: 'any_name',
          value: 'any_other_value'
        }]
      }
    }
    const response = await sut.handle(fakeRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new Error('Invalid param: formId does not match an existing form'))
  })

  test('Should call FillForm with correct values', async () => {
    const { sut, fillFormStub } = makeSut()
    const createSpy = jest.spyOn(fillFormStub, 'fill')
    const fakeRequest = makeFakeRequest()
    await sut.handle(fakeRequest)
    expect(createSpy).toHaveBeenCalledWith(fakeRequest.body)
  })

  test('Should return 400 if the field "formId" is not provided', async () => {
    const { sut } = makeSut()
    const fakeRequest = {
      body: {
        filledFields: [{
          fieldName: 'any_name',
          value: 'any_value'
        },
        {
          fieldName: 'any_other_name',
          value: 'any_other_value'
        }]
      }
    }
    const response = await sut.handle(fakeRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new Error('Missing param: formId'))
  })

  test('Should return 400 if the field "fields" is not provided', async () => {
    const { sut } = makeSut()
    const fakeRequest = {
      body: { formId: 'any_id' }
    }
    const response = await sut.handle(fakeRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new Error('Missing param: filledFields'))
  })

  test('Should return 400 if the fields field is empty', async () => {
    const { sut } = makeSut()
    const fakeRequest = {
      body: {
        formId: 'any_id',
        filledFields: []
      }
    }
    const response = await sut.handle(fakeRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new Error('Invalid param: fields list is empty'))
  })

  test('Should return 400 if the fields list contains an invalid filled field', async () => {
    const { sut } = makeSut()
    const fakeRequest = {
      body: {
        formId: 'any_id',
        filledFields: [{
          fieldName: 'any_name'
        },
        {
          fieldName: 'any_other_name',
          value: 'any_other_value'
        }]
      }
    }
    const response = await sut.handle(fakeRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new Error('Invalid param: an invalid filled field has been provided'))
  })

  test('Should return 500 if FillForm throws', async () => {
    const { sut, fillFormStub } = makeSut()
    jest.spyOn(fillFormStub, 'fill').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const response = await sut.handle(makeFakeRequest())
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual(new Error('Internal server error'))
  })

  test('Should return 200 if FillForm succeeds', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(makeFakeRequest())
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({ message: 'Form has been filled successfully' })
  })
})
