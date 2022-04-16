import { AddRecordController } from '../../../presentation/controllers/add-record/add-record-protocols'
import { Controller } from '../../../presentation/protocols/controller'
import { makeLogControllerDecorator } from '../decorators/log-controller-decorator-factory'
import { makeDBAddAccount } from '../usecases/db-add-record-factory'

export const makeAddRecordController = (): Controller => {
  const controller = new AddRecordController(makeDBAddAccount())
  return makeLogControllerDecorator(controller)
}
