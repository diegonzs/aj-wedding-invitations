export const AlreadyConfirmed = () => {
  return (
    <div className="flex flex-col justify-center items-center max-w-[340px] sm:max-w-none">
      <h1 className="font-semibold font-serif text-[56px] mb-4 text-center">¡Contactanos!</h1>
      <p className="font-bold text-sm text-center">Si quieres cambiar tu asistencia por favor escribenos por{' '}
       <a
          className="underline font-bold"
          href="https://wa.link/xiuzdc"
          target="_blank"
          rel="noreferrer"
        >
          Whatsapp.
        </a>
      </p>
    </div>
  )
}