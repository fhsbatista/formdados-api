import { FormEntity } from '../../../../domain/entities/form-entity'

export interface GetFormsRepository {
  get (): Promise<FormEntity[]>
}
