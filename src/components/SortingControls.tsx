import { FaSortAmountDownAlt } from "react-icons/fa";
import { TSortBy } from "../lib/types";

type SortingControlsProps = {
  sortBy: TSortBy,
  onClick: (newSort: TSortBy) => void
}

export default function SortingControls({ onClick, sortBy }: SortingControlsProps) {
  return (
    <section className="sorting">
      <FaSortAmountDownAlt />

      <SortingButton
        sortBy={sortBy}
        isActive={sortBy === 'relevant'}
        onClick={() => onClick('relevant')}>
        Relevent
      </SortingButton>

      <SortingButton
        sortBy={sortBy}
        isActive={sortBy === 'recent'}
        onClick={() => onClick('recent')}>
        Recent
      </SortingButton>
    </section>
  );
}

type SortingButtonProps = {
  children: React.ReactNode
  isActive: boolean
  sortBy: TSortBy,
  onClick: () => void
}

function SortingButton({ onClick, isActive, sortBy, children }: SortingButtonProps) {
  return (
    <button onClick={onClick}
      className={`sorting__button sorting__button--${sortBy === 'relevant' ? 'relevant ' : 'recent'} 
      ${isActive ? 'sorting__button--active' : ''}`}>
      {children}
    </button>
  )
}
