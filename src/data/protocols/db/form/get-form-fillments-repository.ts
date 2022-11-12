import { FieldFieldEntity } from '../../../../domain/entities/filled-form-entity'

export interface GetFormFillmentsRepository {
  get (formId: String): Promise<FieldFieldEntity[]>
}
