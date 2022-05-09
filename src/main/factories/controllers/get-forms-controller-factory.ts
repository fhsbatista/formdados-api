import { GetFormsController } from '../../../presentation/controllers/get-forms/get-forms'
import { Controller } from '../../../presentation/protocols/controller'
import { makeLogControllerDecorator } from '../decorators/log-controller-decorator-factory'
import { makeDBGetForms } from '../usecases/db-get-forms-factory'

export const makeGetFormsController = (): Controller => {
  const controller = new GetFormsController(makeDBGetForms())
  return makeLogControllerDecorator(controller)
}
