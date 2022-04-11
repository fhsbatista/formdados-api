import { AddRecord } from './add-record-protocols'

export class AddRecordController {
  constructor (private readonly addRecord: AddRecord) { }

  async handle (httpRequest: any): Promise<any> {
    await this.addRecord.add(httpRequest.body.data)
    return {
      statusCode: 400,
      body: new Error('Missing param: data')
    }
  }
}
