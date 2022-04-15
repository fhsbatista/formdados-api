import { AddRecordController, AddRecord, HttpRequest } from './add-record-protocols'

interface SutType {
  sut: AddRecordController
  addRecordStub: AddRecord
}

const makeAddRecord = (): AddRecord => {
  class AddRecordStub implements AddRecord {
    async add (data: any): Promise<void> {
      return null
    }
  }
  return new AddRecordStub()
}

const makeSut = (): SutType => {
  const addRecordStub = makeAddRecord()
  const sut = new AddRecordController(addRecordStub)
  return {
    sut,
    addRecordStub
  }
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    data: 22.9
  }
})

describe('AddRecord controller', () => {
  test('Should call AddRecord with correct values', async () => {
    const { sut, addRecordStub } = makeSut()
    const addSpy = jest.spyOn(addRecordStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith(22.9)
  })

  test('Should return 400 if no data is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        data: 22.9
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new Error('Missing param: data'))
  })
})
