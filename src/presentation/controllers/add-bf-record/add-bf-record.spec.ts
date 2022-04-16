import {
  AddBfRecordController,
  AddBfRecord,
  AddBfRecordDTO,
  BodyFatVO,
  HttpRequest
} from './add-bf-record-protocols'

interface SutType {
  sut: AddBfRecordController
  addBfRecordStub: AddBfRecord
}

const makeAddBfRecord = (): AddBfRecord => {
  class AddBfRecordStub implements AddBfRecord {
    async add (bf: AddBfRecordDTO): Promise<BodyFatVO> {
      return new Promise((resolve, reject) => resolve(bf))
    }
  }
  return new AddBfRecordStub()
}

const makeSut = (): SutType => {
  const addBfRecordStub = makeAddBfRecord()
  const sut = new AddBfRecordController(addBfRecordStub)
  return {
    sut,
    addBfRecordStub
  }
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    date: '10/12/2021',
    percent: 22.9
  }
})

describe('AddBfRecord controller', () => {
  test('Should call AddRecord with correct values', async () => {
    const { sut, addBfRecordStub } = makeSut()
    const addSpy = jest.spyOn(addBfRecordStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
      date: '10/12/2021',
      percent: 22.9
    })
  })

  test('Should return 400 if no date is provided', async () => {
    const { sut } = makeSut()
    const invalidRequest = {
      body: {
        bfPercent: 22.0
      }
    }
    const response = await sut.handle(invalidRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new Error('Missing param: date'))
  })

  test('Should return 400 if no bf percent is provided', async () => {
    const { sut } = makeSut()
    const invalidRequest = {
      body: {
        date: '12/12/2021'
      }
    }
    const response = await sut.handle(invalidRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new Error('Missing param: bfPercent'))
  })
})
