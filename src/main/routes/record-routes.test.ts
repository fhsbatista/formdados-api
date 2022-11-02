import request from 'supertest'
import { MongoHelper } from '../../infra/mongodb/helpers/mongo-helper'
import app from '../config/app'

let accountCollection
let formCollection

describe('Record Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('records')
    await accountCollection.deleteMany({})
    formCollection = await MongoHelper.getCollection('forms')
    await formCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('POST /add_record', () => {
    test('Should return 200 on add_record', async () => {
      await request(app)
        .post('/api/add_record')
        .send({
          data: 22.8
        })
        .expect(200)
    })
  })

  describe('POST /add_bf_record', () => {
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

  describe('POST /create_form', () => {
    test('Should return 200 on add_record', async () => {
      await request(app)
        .post('/api/create_form')
        .send({
          fields: [
            { name: 'date' },
            { name: 'kilograms' }
          ]
        })
        .expect(200)
    })
  })

  describe('GET /get_forms', () => {
    test('Should return 200 on get_forms', async () => {
      await request(app)
        .get('/api/get_forms')
        .send()
        .expect(200)
    })
  })

  describe('POST /fill_form', () => {
    test('Should return 200 on fill_form', async () => {
      const { insertedId } = await formCollection.insertOne({
        fields: [{ name: 'date' }, { name: 'quantity' }]
      })
      await request(app)
        .post('/api/fill_form')
        .send({
          formId: insertedId,
          filledFields: [
            { fieldName: 'date' , value: 'value' }
          ]
        })
        .expect(200)
    })
  })
})
