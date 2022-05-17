import { badRequest } from '../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { FillForm } from './fill-form-controller-protocols'

export class FillFormController implements Controller {
  constructor (private readonly fillForm: FillForm) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { formId, filledFields } = httpRequest.body
    if (!formId) {
      return badRequest(new Error('Missing param: formId'))
    }
    if (!filledFields) {
      return badRequest(new Error('Missing param: filledFields'))
    }
    if (filledFields.length === 0) {
      return badRequest(new Error('Invalid param: fields list is empty'))
    }
    await this.fillForm.fill(httpRequest.body)
    return null
  }
}
