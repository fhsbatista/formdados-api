import { FormEntity } from '../entities/form-entity'

export interface GetForms {
  get (): Promise<FormEntity[]>
}
