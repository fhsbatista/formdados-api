import { Collection } from 'mongodb'
import { FilledFormEntity } from '../../../domain/entities/filled-form-entity'
import { FormEntity } from '../../../domain/entities/form-entity'
import { CreateFormDTO } from '../../../domain/usecases/create-form'
import { FillFormDTO } from '../../../domain/usecases/fill-form'
import { MongoHelper } from '../helpers/mongo-helper'
import { FormMongoRepository } from './form-mongo-repository'

const makeSut = (): FormMongoRepository => {
  return new FormMongoRepository()
}

const makeCreateFormDTO = (): CreateFormDTO => ({
  fields: [{ name: 'date' }, { name: 'quantity' }]
})

const makeFilledFormDto = (): FillFormDTO => ({
  formId: 'any_id',
  filledFields: [{
    fieldName: 'any_name',
    value: 'any_value'
  },
  {
    fieldName: 'any_other_name',
    value: 'any_other_value'
  }]
})

const makeFilledFormEntity = (): FilledFormEntity => ({
  formId: 'any_id',
  filledFields: [{
    fieldName: 'any_name',
    value: 'any_value'
  },
  {
    fieldName: 'any_other_name',
    value: 'any_other_value'
  }]
})

const makeFormEntity = (): FormEntity => ({
  id: '123asd',
  fields: [{ name: 'date' }, { name: 'quantity' }]
})

const makeFormEntityList = (): FormEntity[] => ([
  {
    id: '123asd',
    fields: [{ name: 'date' }, { name: 'quantity' }]
  }, {
    id: '124asd',
    fields: [{ name: 'name' }, { name: 'profession' }]
  }
])

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

  test('Should return a form list on get success', async () => {
    const sut = makeSut()
    const expectedForms = makeFormEntityList()
    await formCollection.insertMany(expectedForms)
    const forms = await sut.get()
    expect(forms).toEqual(expectedForms)
  })

  test('Should return a filled form on fill success', async () => {
    const sut = makeSut()
    const dto = makeFilledFormDto()
    const filledForm = await sut.fill(dto)
    expect(filledForm.formId).toBe(dto.formId)
    expect(filledForm.filledFields).toEqual(makeFilledFormEntity().filledFields)
  })
})
