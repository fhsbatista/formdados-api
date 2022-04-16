import { badRequest } from '../../helpers/http/http-helper'
import { AddBfRecord } from './add-bf-record-protocols'

export class AddBfRecordController {
  constructor (private readonly addBfRecord: AddBfRecord) { }

  async handle (httpRequest: any): Promise<any> {
    return badRequest(new Error('Missing param: date'))
  }
}
