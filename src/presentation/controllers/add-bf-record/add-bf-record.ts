import { badRequest, serverError } from '../../helpers/http/http-helper'
import { AddBfRecord } from './add-bf-record-protocols'

export class AddBfRecordController {
  constructor (private readonly addBfRecord: AddBfRecord) { }

  async handle (httpRequest: any): Promise<any> {
    try {
      const { date, percent } = httpRequest.body
      if (!date) {
        return badRequest(new Error('Missing param: date'))
      }
      if (!percent) {
        return badRequest(new Error('Missing param: bfPercent'))
      }
      await this.addBfRecord.add({ date, percent })
    } catch (error) {
      return serverError(error)
    }
  }
}
