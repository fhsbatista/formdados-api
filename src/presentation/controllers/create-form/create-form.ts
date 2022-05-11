import { badRequest, ok, serverError } from '../../helpers/http/http-helper'
import { CreateForm, FieldDTO, HttpRequest } from './create-form-protocols'

export class CreateFormController {
  constructor (private readonly createForm: CreateForm) { }

  async handle (httpRequest: HttpRequest): Promise<any> {
    try {
      const { fields } = httpRequest.body
      if (!fields || fields.length === 0) {
        return badRequest(new Error('Missing param: fields'))
      }
      if (!this.isFieldsValid(fields)) {
        return badRequest(new Error('Invalid fields has been provided'))
      }
      await this.createForm.create({ fields: httpRequest.body.fields })
      return ok({ message: 'Form created successfully' })
    } catch (error) {
      return serverError(error)
    }
  }

  isFieldsValid (fields: FieldDTO[]): boolean {
    let isFieldsValid = true
    fields.forEach((field) => {
      if (!field.name) {
        isFieldsValid = false
      }
    })
    return isFieldsValid
  }
}
