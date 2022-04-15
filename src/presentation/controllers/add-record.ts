import { badRequest, ok, serverError } from '../helpers/http/http-helper'
import { AddRecord } from './add-record-protocols'

export class AddRecordController {
  constructor (private readonly addRecord: AddRecord) { }

  async handle (httpRequest: any): Promise<any> {
    try {
      const { data } = httpRequest.body
      if (!data) {
        return badRequest(new Error('Missing param: data'))
      }
      const result = await this.addRecord.add(httpRequest.body.data)
      return ok({ data: result })
    } catch (error) {
      return serverError(error)
    }
  }
}
