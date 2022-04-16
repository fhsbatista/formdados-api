import { AddBfRecordController } from '../../../presentation/controllers/add-bf-record/add-bf-record'
import { Controller } from '../../../presentation/protocols/controller'
import { makeLogControllerDecorator } from '../decorators/log-controller-decorator-factory'
import { makeDBAddAccount } from '../usecases/db-add-record-factory'

export const makeAddBfRecordController = (): Controller => {
  const controller = new AddBfRecordController(makeDBAddAccount())
  return makeLogControllerDecorator(controller)
}
