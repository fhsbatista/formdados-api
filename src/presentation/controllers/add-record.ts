import { badRequest, ok } from '../helpers/http/http-helper'
import { AddRecord } from './add-record-protocols'

export class AddRecordController {
  constructor (private readonly addRecord: AddRecord) { }

  async handle (httpRequest: any): Promise<any> {
    try {
      const { data } = httpRequest.body
      if (!data) {
        return badRequest(new Error('Missing param: data'))
      }
      await this.addRecord.add(httpRequest.body.data)
      return ok(null)
    } catch (error) {
      return {
        statusCode: 500,
        body: new Error('Server error')
      }
    }
  }
}
