import { FilledFormEntity } from '../../../../domain/entities/filled-form-entity'
import { FillFormDTO } from '../../../../domain/usecases/fill-form'

export interface FillFormRepository {
  fill(dto: FillFormDTO): Promise<FilledFormEntity>
}
