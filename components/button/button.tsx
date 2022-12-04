import clsx, { ClassValue } from 'clsx'

interface ButtonProps {
  title?: string,
  onClick?: () => void,
  className?: ClassValue,
  children?: JSX.Element,
  type?: 'button' | 'submit'
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  title,
  className,
  children,
  onClick,
  type = 'button',
  disabled = false
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={clsx(
        'w-[340px] h-[59px] flex justify-center items-center bg-black text-white font-sans',
        className
      )}
      onClick={onClick}
    >
      {children || title}
    </button>
  )
}