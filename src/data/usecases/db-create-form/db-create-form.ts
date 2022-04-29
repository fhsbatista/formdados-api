import { CreateForm, CreateFormDTO } from '../../../domain/usecases/create-form'
import { CreateFormRepository } from '../../protocols/db/form/create-form-repository'

export class DBCreateForm implements CreateForm {
  constructor (private readonly repository: CreateFormRepository) {}

  async create (dto: CreateFormDTO): Promise<any> {
    await this.repository.create(dto)
  }
}
