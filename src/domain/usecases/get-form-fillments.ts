import { FilledFieldEntity } from '../entities/filled-field-entity'

export interface GetFormFillments {
  get (formId: String): Promise<FilledFieldEntity[]>
}
