import { CreateForm } from './create-form-protocols'

export class CreateFormController {
  constructor (private readonly createForm: CreateForm) { }

  async handle (httpRequest: any): Promise<any> {
    await this.createForm.create({ fields: httpRequest.body.fields })
  }
}
