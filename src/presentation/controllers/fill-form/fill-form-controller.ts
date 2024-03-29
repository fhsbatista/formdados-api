import { FormEntity } from '../../../domain/entities/form-entity'
import { badRequest, serverError, ok } from '../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { FilledFieldDTO, FillForm, GetForms } from './fill-form-controller-protocols'

export class FillFormController implements Controller {
  constructor (private readonly fillForm: FillForm, private readonly getForms: GetForms) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
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
      const forms = await this.getForms.get()
      if (!forms.some(form => form.id === formId)) {
        return badRequest(new Error('Invalid param: formId does not match an existing form'))
      }
      const form = forms.find(form => form.id === formId)
      if (this.containsNonExistingField(form, filledFields)) {
        return badRequest(new Error('Invalid param: a non existent field name has been provided'))
      }
      if (this.isRequiredFieldMissing(form, filledFields)) {
        return badRequest(new Error('Missing param: a required field is missing'))
      }
      await this.fillForm.fill(httpRequest.body)
      return ok({ message: 'Form has been filled successfully' })
    } catch (error) {
      return serverError(error)
    }
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

  containsNonExistingField (form: FormEntity, fields: FilledFieldDTO[]): boolean {
    let containsNonExistentField
    for (const filledField of fields) {
      if (!form.fields.some(field => field.name === filledField.fieldName)) {
        containsNonExistentField = true
        break
      }
    }
    return containsNonExistentField
  }

  isRequiredFieldMissing (form: FormEntity, filledFields: FilledFieldDTO[]): boolean {
    let isMissingRequiredField
    for (const field of form.fields) {
      if (!filledFields.find(filledFields => filledFields.fieldName === field.name)) {
        isMissingRequiredField = true
        break
      }
    }
    return isMissingRequiredField
  }
}
