import { FilledFieldEntity } from '../../../../domain/entities/filled-field-entity'

export interface GetFormFillmentsRepository {
  getFillments (formId: string): Promise<FilledFieldEntity[]>
}
