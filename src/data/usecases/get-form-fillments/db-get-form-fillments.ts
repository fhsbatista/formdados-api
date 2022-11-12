import { FilledFieldDTO } from '../../../domain/usecases/fill-form'
import { GetFormFillments } from '../../../domain/usecases/get-form-fillments'
import { GetFormFillmentsRepository } from '../../protocols/db/form/get-form-fillments-repository'

export class DBGetFormFillments implements GetFormFillments {
  constructor (private readonly repository: GetFormFillmentsRepository) {}

  async get (formId: String): Promise<FilledFieldDTO[]> {
    await this.repository.get(formId)
    return null
  }
}
