import { FillForm, FillFormController, FillFormDTO, HttpRequest } from './fill-form-controller-protocols'

interface SutType {
  sut: FillFormController
  fillFormStub: FillForm
}

const makeFillForm = (): FillForm => {
  class FillFormStub implements FillForm {
    async fill (data: FillFormDTO): Promise<any> {
      return null
    }
  }
  return new FillFormStub()
}

const makeSut = (): SutType => {
  const fillFormStub = makeFillForm()
  const sut = new FillFormController(fillFormStub)
  return {
    sut,
    fillFormStub
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
