import { CreateFormDTO } from '../../../../domain/usecases/create-form'

export interface CreateFormRepository {
  create(dto: CreateFormDTO): Promise<any>
}
