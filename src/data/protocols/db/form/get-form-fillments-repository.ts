import { FilledFieldEntity } from '../../../../domain/entities/filled-field-entity'

export interface GetFormFillmentsRepository {
  get (formId: String): Promise<FilledFieldEntity[]>
}
