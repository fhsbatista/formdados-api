import { AddRecordController } from './add-record'

describe('AddRecord controller', () => {
  test('Should return 400 if no data is provided', () => {
    const sut = new AddRecordController()
    const httpRequest = {
      body: {
        data: 22.9
      }
    }
    const response = sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
  })
})
