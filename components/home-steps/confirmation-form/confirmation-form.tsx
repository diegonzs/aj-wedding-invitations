import { useMemo } from "react"
import toast from 'react-hot-toast'
import { Controller, useForm } from "react-hook-form"
import { useRowStore } from "../../../store/row"
import { Button } from "../../button"
import { Select } from "../../select"
import { range } from '../../../utils'
import { Asistencia } from "../../../types/row"

const confirmationOptions = [
  {
    id: Asistencia.Confirmado,
    description: 'Si, encantado',
  },
  {
    id: Asistencia.Rechazado,
    description: 'No, lo siento no puedo',
  }
]

type ConfirmationFormData = {
  confirmation: string,
  passNumbers: string,
}

interface ConfirmationFormProps {
  onSuccess: () => void,
  onFailed: () => void,
}

export const ConfirmationForm: React.FC<ConfirmationFormProps> = ({
  onSuccess,
  onFailed
}) => {
  const rowId = useRowStore(state => state.rowId)
  const loading = useRowStore(state => state.loading)
  const familyName = useRowStore(state => state.familyName)
  const setLoading = useRowStore(state => state.setLoading)
  const invitationNumber = useRowStore((state) => state.invitations)
  const { register, watch, control, handleSubmit, reset } = useForm<ConfirmationFormData>({
    defaultValues: {
      confirmation: Asistencia.Confirmado,
      passNumbers: String(invitationNumber),
    }
  })

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true)
    const response = await fetch('/api/invitation/code', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: rowId,
        asistencia: data.confirmation,
        pasesAUtilizar: Number(data.passNumbers),
      }),
    })
    setLoading(false)
    if (response.status === 500) {
      toast.error('Error! Intenta nuevamente.')
      return reset()
    }
    if (data.confirmation === Asistencia.Confirmado) {
      return onSuccess()
    }
    return onFailed()
  })

  const options = useMemo(() => {
    return range(invitationNumber).map(value => {
      const valueString = value.toString()
      return ({ id: valueString, value: valueString })
    })
  }, [invitationNumber])

  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center w-full">
      <h1 className="font-serif text-[56px] mb-4 text-center">{familyName}</h1>
      <p className="text-sm text-center mb-20 font-bold">CONFIRMAR ASISTENCIA</p>
      <fieldset className="w-[340px] flex flex-col items-start mb-12">
        <p className="text-sm mb-4 uppercase">Vas asistir a nuestra boda?</p>
        <div className="space-y-4">
          {confirmationOptions.map((option) => (
            <div key={option.id} className="flex items-center">
              <input
                {...register('confirmation', {
                  required: 'An option is required'
                })}
                id={option.id}
                value={option.id}
                type="radio"
                className="h-4 w-4 border-black bg-transparent text-black focus:ring-black cursor-pointer"
              />
              <label htmlFor={option.id} className="ml-4 text-sm text-black uppercase">
                {option.description}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
      {watch('confirmation') === Asistencia.Confirmado && (
        <div className="mb-8 w-full justify-center flex">
          <Controller
            name="passNumbers"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Select
                options={options}
                selected={value}
                setSelected={(value) => onChange(value)}
                label="CANTIDAD DE PASES"
              />
            )}
          />
        </div>
      )}
      <Button
        type="submit"
        title={loading ? 'ENVIANDO' : 'ENVIAR'}
        disabled={loading}
        isLoading={loading}
      />
      <p className="text-lg mt-24 max-w-[340px] sm:max-w-none tracking-normal">
        Necesitas más pases? Escríbenos por{' '}
        <a className="underline font-bold" href="">Whatsapp</a>
      </p>
    </form>
  )
}

