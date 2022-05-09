import { DBGetForms } from '../../../data/usecases/get-forms/db-get-forms'
import { GetForms } from '../../../domain/usecases/get-forms'
import { FormMongoRepository } from '../../../infra/mongodb/form/form-mongo-repository'

export const makeDBGetForms = (): GetForms => {
  const getFormsRepository = new FormMongoRepository()
  return new DBGetForms(getFormsRepository)
}
