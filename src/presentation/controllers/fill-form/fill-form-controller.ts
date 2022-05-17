import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { FillForm } from './fill-form-controller-protocols'

export class FillFormController implements Controller {
  constructor (private readonly fillForm: FillForm) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.fillForm.fill(httpRequest.body)
    return null
  }
}
