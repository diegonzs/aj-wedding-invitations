import clsx, { ClassValue } from 'clsx'
import Image from 'next/image'

interface ButtonProps {
  title?: string,
  onClick?: () => void,
  className?: ClassValue,
  children?: JSX.Element,
  type?: 'button' | 'submit'
  disabled?: boolean
  isLoading?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  title,
  className,
  children,
  onClick,
  type = 'button',
  disabled = false,
  isLoading = false
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={clsx(
        'w-[340px] h-[59px] flex justify-center items-center bg-black text-white font-sans tracking-widest',
        disabled && 'bg-opacity-20',
        className
      )}
      onClick={onClick}
    >
      <div className='flex items-center gap-6'>
        <span>{children || title}</span>
        {isLoading && (
          <Image
            className="animate-spin"
            src="/icon-loading.svg"
            alt="Wedding Logo"
            width={24}
            height={24}
          />
        )}
      </div>
    </button>
  )
}