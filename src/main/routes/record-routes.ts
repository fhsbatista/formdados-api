import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapters'
import { makeAddRecordController } from '../factories/controllers/add-record-controller-factory'

export default (router: Router): void => {
  router.post('/add_record', adaptRoute(makeAddRecordController()))
}
