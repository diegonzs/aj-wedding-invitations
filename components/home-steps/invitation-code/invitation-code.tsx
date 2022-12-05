import clsx from "clsx"
import { useForm } from "react-hook-form"
import toast from 'react-hot-toast'
import { Row } from "../../../types/row"
import { Button } from "../../button"
import { useRowStore } from "../../../store/row"
import { useRouter } from "next/router"
import { useEffect } from "react"

interface InvitationCodeProps {
  onSuccess: () => void
  onFailed: () => void
}

type InvitationCodeFormData = {
  code: string
}

export const InvitationCode: React.FC<InvitationCodeProps> = ({
  onSuccess,
  onFailed,
}) => {
  const router = useRouter()
  const { query } = router
  const { handleSubmit, register, formState: { errors }, reset, setValue } = useForm<InvitationCodeFormData>({
    defaultValues: {
      code: query.code as string | undefined
    }
  })
  const loading = useRowStore(state => state.loading)
  const setLoading = useRowStore(state => state.setLoading)
  const setInvitations = useRowStore(state => state.setInvitations)
  const setFamilyName = useRowStore(state => state.setFamilyName)
  const setRowId = useRowStore(state => state.setRowId)

  useEffect(() => {
    setValue('code', query.code as string)
  }, [query, setValue])

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true)
    const response = await fetch(`/api/invitation/${data.code}`, { method: 'GET' })
    if (response.status === 404) {
      toast.error('Codigo no encontrado.')
      reset()
    }
    if (response.status === 400) {
      onFailed()
    }
    if (response.status === 200) {
      const json = await response.json() as { row: Row }
      const row = json?.row
      if (row) {
        setRowId(row.id)
        setInvitations(row.pasesDisponibles)
        setFamilyName(row.nombre ?? '')
        onSuccess()
      }
    }
    setLoading(false)
  })

  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col max-w-[340px]">
      <p className='text-sm uppercase mb-4'>Código de invitación</p>
      <div className="flex flex-col gap-1 mb-8">
        <input
          placeholder='000000'
          type="text"
          className={clsx(
            'p-5 w-full bg-transparent',
            'text-base tracking-widest',
            'border border-solid border-opacity-30 border-black',
            'focus:ring-black focus:border-black'
          )}
          {...register('code', {
            required: 'Please enter code.',
          })}
        />
        {errors.code && (
          <p className="text-red-400 text-xs">{errors.code.message}</p>
        )}
      </div>
      <Button
        type="submit"
        title={loading ? 'INGRESANDO' : 'INGRESAR'}
        disabled={loading}
        isLoading={loading}
      />
    </form>
  )
}