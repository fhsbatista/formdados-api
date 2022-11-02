import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapters'
import { makeAddBfRecordController } from '../factories/controllers/add-bf-record-controller-factory'
import { makeAddRecordController } from '../factories/controllers/add-record-controller-factory'
import { makeCreateFormController } from '../factories/controllers/create-form-controller-factory'
import { makeFillFormController } from '../factories/controllers/fill-form-controller-factory'
import { makeGetFormsController } from '../factories/controllers/get-forms-controller-factory'

export default (router: Router): void => {
  router.post('/add_record', adaptRoute(makeAddRecordController()))
  router.post('/add_bf_record', adaptRoute(makeAddBfRecordController()))
  router.post('/create_form', adaptRoute(makeCreateFormController()))
  router.get('/get_forms', adaptRoute(makeGetFormsController()))
  router.post('/fill_form', adaptRoute(makeFillFormController()))
}
