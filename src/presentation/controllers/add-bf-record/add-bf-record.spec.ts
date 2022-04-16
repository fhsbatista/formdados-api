import {
  AddBfRecordController,
  AddBfRecord,
  AddBfRecordDTO,
  BodyFatVO
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

describe('AddBfRecord controller', () => {
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
