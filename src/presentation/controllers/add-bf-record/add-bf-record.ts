import { badRequest, ok, serverError } from '../../helpers/http/http-helper'
import { AddBfRecord, HttpResponse } from './add-bf-record-protocols'

export class AddBfRecordController {
  constructor (private readonly addBfRecord: AddBfRecord) { }

  async handle (httpRequest: any): Promise<HttpResponse> {
    try {
      const { date, percent } = httpRequest.body
      if (!date) {
        return badRequest(new Error('Missing param: date'))
      }
      if (!percent) {
        return badRequest(new Error('Missing param: bfPercent'))
      }
      const result = await this.addBfRecord.add({ date, percent })
      return ok(result)
    } catch (error) {
      return serverError(error)
    }
  }
}
