import { badRequest } from '../../helpers/http/http-helper'
import { AddBfRecord } from './add-bf-record-protocols'

export class AddBfRecordController {
  constructor (private readonly addBfRecord: AddBfRecord) { }

  async handle (httpRequest: any): Promise<any> {
    const { date, bfPercent } = httpRequest.body
    if (!date) {
      return badRequest(new Error('Missing param: date'))
    }
    if (!bfPercent) {
      return badRequest(new Error('Missing param: bfPercent'))
    }
  }
}
