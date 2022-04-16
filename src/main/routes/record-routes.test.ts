import request from 'supertest'
import { MongoHelper } from '../../infra/mongodb/helpers/mongo-helper'
import app from '../config/app'

let accountCollection

describe('Record Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('records')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('POST /add_record] ', () => {
    test('Should return 200 on add_record', async () => {
      await request(app)
        .post('/api/add_record')
        .send({
          data: 22.8
        })
        .expect(200)
    })
  })

  describe('POST /add_bf_record] ', () => {
    test('Should return 200 on add_record', async () => {
      await request(app)
        .post('/api/add_bf_record')
        .send({
          percent: 22.8,
          date: '10/12/2009'
        })
        .expect(200)
    })
  })
})
