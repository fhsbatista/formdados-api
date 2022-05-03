import { FormEntity } from '../../../domain/entities/form-entity'
import { GetForms } from '../../../domain/usecases/get-forms'
import { GetFormsRepository } from '../../protocols/db/form/get-forms-repository'

export class DBGetForms implements GetForms {
  constructor (private readonly repository: GetFormsRepository) {}

  async get (): Promise<FormEntity[]> {
    await this.repository.get()
    return []
  }
}
