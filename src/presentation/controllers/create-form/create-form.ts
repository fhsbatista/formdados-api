import { badRequest, ok } from '../../helpers/http/http-helper'
import { CreateForm } from './create-form-protocols'

export class CreateFormController {
  constructor (private readonly createForm: CreateForm) { }

  async handle (httpRequest: any): Promise<any> {
    const { fields } = httpRequest.body
    if (!fields || fields.length === 0) {
      return badRequest(new Error('Missing param: fields'))
    }
    await this.createForm.create({ fields: httpRequest.body.fields })
    return ok({ message: 'Form created successfully' })
  }
}
