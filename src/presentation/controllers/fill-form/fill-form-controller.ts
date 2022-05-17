import { badRequest } from '../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { FilledFieldDTO, FillForm } from './fill-form-controller-protocols'

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
    if (!this.isFilledFieldsValid(filledFields)) {
      return badRequest(new Error('Invalid param: an invalid filled field has been provided'))
    }
    await this.fillForm.fill(httpRequest.body)
    return null
  }

  isFilledFieldsValid (fields: FilledFieldDTO[]): boolean {
    let isFilledFieldsValid = true
    fields.forEach((field) => {
      if (!field.fieldName || !field.value) {
        isFilledFieldsValid = false
      }
    })
    return isFilledFieldsValid
  }
}
