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
})
