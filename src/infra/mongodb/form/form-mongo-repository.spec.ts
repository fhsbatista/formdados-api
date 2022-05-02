import { Collection } from 'mongodb'
import { FormEntity } from '../../../domain/entities/form-entity'
import { CreateFormDTO } from '../../../domain/usecases/create-form'
import { MongoHelper } from '../helpers/mongo-helper'
import { FormMongoRepository } from './form-mongo-repository'

const makeSut = (): FormMongoRepository => {
  return new FormMongoRepository()
}

const makeCreateFormDTO = (): CreateFormDTO => ({
  fields: [{ name: 'date' }, { name: 'quantity' }]
})

const makeFormEntity = (): FormEntity => ({
  id: '123asd',
  fields: [{ name: 'date' }, { name: 'quantity' }]
})

let formCollection: Collection

describe('Form Mongo Repository ', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    formCollection = await MongoHelper.getCollection('forms')
    await formCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return a form on create success', async () => {
    const sut = makeSut()
    const form = await sut.create(makeCreateFormDTO())
    expect(form.id).toBeTruthy()
    expect(form.fields).toEqual(makeFormEntity().fields)
  })
})