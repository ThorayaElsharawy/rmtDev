import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

type PaginationControlsProps = {
  onClick: (direction: 'next' | 'previous') => void;
  currentPage: number,
  totalNumOfPage: number
}

export default function PaginationControls({ onClick, currentPage, totalNumOfPage }: PaginationControlsProps) {
  return (
    <section className="pagination">
      {currentPage > 1 && <PaginationButton direction="previous" currentPage={currentPage} onClick={() => onClick('previous')} />}
      {currentPage < totalNumOfPage && <PaginationButton direction="next" currentPage={currentPage} onClick={() => onClick('next')} />}
    </section>
  )
}

type PaginationButtonProps = {
  direction: 'next' | 'previous',
  currentPage: number,
  onClick: () => void
}

function PaginationButton({ direction, currentPage, onClick }: PaginationButtonProps) {
  return (
    <button className={`pagination__button pagination__button--${direction}`} onClick={(e) => {
      onClick();
      e.currentTarget.blur()
    }}>
      {direction === "previous" && <FaArrowLeft />}
      <span> Page {direction === "previous" ? currentPage - 1 : currentPage + 1}</span>
      {direction === 'next' && <FaArrowRight />}
    </button>
  )

}
