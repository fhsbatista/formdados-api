import { DBFillForm } from '../../../data/usecases/fill-form/db-fill-form'
import { FillForm } from '../../../domain/usecases/fill-form'
import { FormMongoRepository } from '../../../infra/mongodb/form/form-mongo-repository'

export const makeDBFillForm = (): FillForm => {
  const fillFormRepository = new FormMongoRepository()
  return new DBFillForm(fillFormRepository)
}
