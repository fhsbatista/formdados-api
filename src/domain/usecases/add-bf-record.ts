export class AddBfRecordDTO {
  date: Date
  percent: number
}

export interface AddBfRecord {
  add(bf: AddBfRecordDTO): Promise<void>
}
