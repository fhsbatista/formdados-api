import { FillForm, FillFormDTO } from '../../../domain/usecases/fill-form'
import { FillFormRepository } from '../../protocols/db/form/fill-form-repository'

export class DBFillForm implements FillForm {
  constructor (private readonly fillFormRepository: FillFormRepository) {}

  async fill (data: FillFormDTO): Promise<void> {
    await this.fillFormRepository.fill(data)
    return null
  }
}
