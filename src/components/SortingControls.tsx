import { FaSortAmountDownAlt } from "react-icons/fa";
import { TSortBy } from "../lib/types";

type SortingControlsProps = {
  sortBy: string,
  onClick: (newSort: TSortBy) => void
}

export default function SortingControls({ onClick, sortBy }: SortingControlsProps) {
  return (
    <section className="sorting">
      <FaSortAmountDownAlt />

      <button onClick={() => onClick('relevant')} className={`sorting__button sorting__button--relevant 
        ${sortBy === 'relevant' ? 'sorting__button--active' : '' }`}>
        Relevant
      </button>

      <button onClick={() => onClick('recent')} className={`sorting__button sorting__button--recent 
        ${sortBy === 'recent' ? 'sorting__button--active' : '' }`}>
        Recent
      </button>
    </section>
  );
}
