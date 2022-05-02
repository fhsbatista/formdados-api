import { CreateFormController } from '../../../presentation/controllers/create-form/create-form'
import { Controller } from '../../../presentation/protocols/controller'
import { makeLogControllerDecorator } from '../decorators/log-controller-decorator-factory'
import { makeDBCreateForm } from '../usecases/db-create-form-factory'

export const makeCreateFormController = (): Controller => {
  const controller = new CreateFormController(makeDBCreateForm())
  return makeLogControllerDecorator(controller)
}
