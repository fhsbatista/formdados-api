export interface FilledFormEntity {
  formId: string
  filledFields: FieldFieldEntity[]
}

export interface FieldFieldEntity {
  fieldName: string
  value: string
}
