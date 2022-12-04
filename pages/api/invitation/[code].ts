import type { NextApiRequest, NextApiResponse } from 'next'
import airtable from 'airtable'
import { Asistencia, RawRow, rowFromRaw,  } from '../../../types/row';

// Fake users data
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.AIRTABLE_API_KEY
  });
  const table = airtable.base('appETQ1Ahp6Z1g8NH')('Invitados')
  const {
    query: { code },
    body,
    method,
  } = req
  const reqBody = body as { id: string, asistencia: string, pasesAUtilizar: number }
  if (method === 'GET') {
    const rawRows = await table.select().all() as unknown as RawRow[]
    const rows = rawRows.map(raw => rowFromRaw(raw))
    const row = rows.find(row => row.codigo === code)
    if (row) {
      if (
        row.asistencia === Asistencia.Confirmado ||
        row.asistencia === Asistencia.Rechazado
      ) {
        res.statusMessage = 'confirmado'
        return res.status(400).json({ message: 'Usuario confirmado' })
      }
      return res.status(200).json({ row })
    }
    res.statusMessage = 'Usuario no encontrado!'
    return res.status(404).json({ message: 'Usuario no encontrado' })
  }
  if (method === 'PATCH') {
    const pasesAUtilizar = reqBody.asistencia === Asistencia.Confirmado
      ? reqBody.pasesAUtilizar
      : 0
  
    table.update([{
      id: reqBody.id,
      fields: {
        'Asistencia': reqBody.asistencia,
        'Pases a utilizar': pasesAUtilizar,
      }
    }])

    res.status(200).send('SUCESS')
  }
}