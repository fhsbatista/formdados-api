export interface CreateFormDTO {
  fields: FieldDTO[]
}

export interface FieldDTO {
  name: string
}

export interface CreateForm {
  create (data: CreateFormDTO): Promise<any>
}
