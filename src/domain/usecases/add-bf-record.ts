import { BodyFatVO } from '../value-objects/body-fat-vo'

export class AddBfRecordDTO {
  date: Date
  percent: number
}

export interface AddBfRecord {
  add(bf: AddBfRecordDTO): Promise<BodyFatVO>
}
