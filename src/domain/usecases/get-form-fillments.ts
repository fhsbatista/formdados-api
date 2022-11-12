import { FilledFieldDTO } from './fill-form'

export interface GetFormFillments {
  get (formId: String): Promise<FilledFieldDTO[]>
}
