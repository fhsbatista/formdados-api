import { FillFormController } from '../../../presentation/controllers/fill-form/fill-form-controller'
import { Controller } from '../../../presentation/protocols/controller'
import { makeLogControllerDecorator } from '../decorators/log-controller-decorator-factory'
import { makeDBFillForm } from '../usecases/db-fill-form-factory'
import { makeDBGetForms } from '../usecases/db-get-forms-factory'

export const makeFillFormController = (): Controller => {
  const controller = new FillFormController(makeDBFillForm(), makeDBGetForms())
  return makeLogControllerDecorator(controller)
}
