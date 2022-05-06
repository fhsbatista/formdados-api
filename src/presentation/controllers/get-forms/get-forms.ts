import { ok, serverError } from '../../helpers/http/http-helper'
import { GetForms } from './get-forms-protocols'

export class GetFormsController {
  constructor (private readonly getForms: GetForms) { }

  async handle (): Promise<any> {
    try {
      const forms = await this.getForms.get()
      return ok(forms)
    } catch (error) {
      return serverError(error)
    }
  }
}
