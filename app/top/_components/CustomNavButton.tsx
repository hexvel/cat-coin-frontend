import clsx from 'clsx'
import { SetStateAction } from 'react'

interface IButtonProps {
  filter: string
  filterType: string
  setFilter: (value: SetStateAction<'day' | 'month' | 'balance'>) => void
  title: string
}

export const CustomNavButton = ({
  filter,
  filterType,
  setFilter,
  title,
}: IButtonProps) => {
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter as SetStateAction<'day' | 'month' | 'balance'>)
  }

  return (
    <button
      onClick={() => handleFilterChange(filterType)}
      className={clsx(
        'active:scale-95 transition-transform text-xl py-2 px-6 rounded-full bg-[#1E2A36]',
        {
          '!bg-[#04F75F] text-black': filter === filterType,
        }
      )}
    >
      {title}
    </button>
  )
}
