import { DBCreateForm } from '../../../data/usecases/create-form/db-create-form'
import { CreateForm } from '../../../domain/usecases/create-form'
import { FormMongoRepository } from '../../../infra/mongodb/form/form-mongo-repository'

export const makeDBCreateForm = (): CreateForm => {
  const createFormRepository = new FormMongoRepository()
  return new DBCreateForm(createFormRepository)
}
