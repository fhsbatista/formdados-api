import { ok, serverError } from '../../helpers/http/http-helper'
import { GetForms } from './get-forms-protocols'

export class GetFormsController {
  constructor (private readonly getForms: GetForms) { }

  async handle (): Promise<any> {
    try {
      await this.getForms.get()
      return ok({ message: 'Form created successfully' })
    } catch (error) {
      return serverError(error)
    }
  }
}
