export interface FillFormDTO {
  formId: string
  filledFields: FilledFieldDTO[]
}

export interface FilledFieldDTO {
  fieldName: string
  value: string
}

export interface FillForm {
  fill (data: FillFormDTO): Promise<void>
}
