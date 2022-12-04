import clsx from "clsx"
import { useForm } from "react-hook-form"
import toast from 'react-hot-toast'
import { fetcher } from "../../../lib"
import { RawRow, Row, rowFromRaw } from "../../../types/row"
import { Button } from "../../button"
import useSwr from 'swr'
import { useRowStore } from "../../../store/row"

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
  const { handleSubmit, register, formState: { errors }, reset } = useForm<InvitationCodeFormData>()
  const loading = useRowStore(state => state.loading)
  const setLoading = useRowStore(state => state.setLoading)
  const setInvitations = useRowStore(state => state.setInvitations)
  const setRowId = useRowStore(state => state.setRowId)

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
            'border border-solid border-opacity-30 border-black'
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
        title={loading ? 'LOADING...' : 'INGRESAR'}
        disabled={loading}
      />
    </form>
  )
}