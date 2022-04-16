import { BodyFatVO } from '../value-objects/body-fat-vo'

export interface AddBfRecordDTO {
  date: Date
  percent: number
}

export interface AddBfRecord {
  add(bf: AddBfRecordDTO): Promise<BodyFatVO>
}
