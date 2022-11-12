import { FilledFieldEntity } from '../../../domain/entities/filled-field-entity'
import { GetFormFillments } from '../../../domain/usecases/get-form-fillments'
import { GetFormFillmentsRepository } from '../../protocols/db/form/get-form-fillments-repository'

export class DBGetFormFillments implements GetFormFillments {
  constructor (private readonly repository: GetFormFillmentsRepository) {}

  async get (formId: String): Promise<FilledFieldEntity[]> {
    await this.repository.get(formId)
    return null
  }
}
