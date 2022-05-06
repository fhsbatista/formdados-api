import { CreateFormRepository } from '../../../data/protocols/db/form/create-form-repository'
import { GetFormsRepository } from '../../../data/protocols/db/form/get-forms-repository'
import { FormEntity } from '../../../domain/entities/form-entity'
import { CreateFormDTO } from '../../../domain/usecases/create-form'
import { MongoHelper } from '../helpers/mongo-helper'

export class FormMongoRepository implements CreateFormRepository, GetFormsRepository {
  async create (dto: CreateFormDTO): Promise<FormEntity> {
    const formCollection = await MongoHelper.getCollection('forms')
    const result = await formCollection.insertOne(dto)
    const { insertedId: id } = result
    const form = await formCollection
      .findOne({ _id: id })
    return MongoHelper.map(form)
  }

  async get (): Promise<FormEntity[]> {
    const formCollection = await MongoHelper.getCollection('forms')
    const forms = await formCollection.find<FormEntity>({}).toArray()
    console.log(forms[0].fields)
    return forms
  }
}
