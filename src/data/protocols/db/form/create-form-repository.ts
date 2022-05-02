import { FormEntity } from '../../../../domain/entities/form-entity'
import { CreateFormDTO } from '../../../../domain/usecases/create-form'

export interface CreateFormRepository {
  create(dto: CreateFormDTO): Promise<FormEntity>
}
