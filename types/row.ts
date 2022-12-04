export enum Asistencia {
  Confirmado = 'Confirmado',
  Rechazado = 'Rechazado',
  Pendiente = 'Pendiente',
}

export type RawRow = {
  id: string
  fields: {
    Codigo: string,
    Nombre: string,
    Numero: string,
    Asistencia?: Asistencia,
    'Pases disponibles': number
  },
}

export type Row = {
  id: string,
  codigo: string,
  nombre: string,
  numero: string,
  asistencia?: Asistencia,
  pasesDisponibles: number
}

export const rowFromRaw = (raw: RawRow): Row => ({
  id: raw.id,
  codigo: raw.fields.Codigo,
  nombre: raw.fields.Nombre,
  numero: raw.fields.Numero,
  asistencia: raw.fields.Asistencia,
  pasesDisponibles: raw.fields["Pases disponibles"]
})