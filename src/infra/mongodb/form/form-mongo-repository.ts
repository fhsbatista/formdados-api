import { CreateFormRepository } from '../../../data/protocols/db/form/create-form-repository'
import { CreateFormDTO } from '../../../domain/usecases/create-form'
import { MongoHelper } from '../helpers/mongo-helper'

export class FormMongoRepository implements CreateFormRepository {
  async create (dto: CreateFormDTO): Promise<any> {
    const formCollection = await MongoHelper.getCollection('accounts')
    const result = await formCollection.insertOne(dto)
    const { insertedId: id } = result
    const form = await formCollection
      .findOne({ _id: id })
    return MongoHelper.map(form)
  }
}
