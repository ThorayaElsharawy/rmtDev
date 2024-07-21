import { useEffect, useRef, useState } from "react";
import { FaBookmark } from "react-icons/fa6";
import BookmarksPopover from "./BookmarksPopover";


export default function BookmarksButton() {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target) &&
        !popoverRef.current?.contains(e.target)) {
        setIsOpen(false)
      }
    }

    window.addEventListener('click', handleClickOutside)

    return () => {
      window.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen])

  return (
    <section>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(prev => !prev)}
        className="bookmarks-btn">
        Bookmarks <FaBookmark />
      </button>
      {isOpen && <BookmarksPopover ref={popoverRef} />}
    </section>
  );
}
