import { useRef, useState } from "react";
import { FaBookmark } from "react-icons/fa6";
import BookmarksPopover from "./BookmarksPopover";
import { useOnClickOutside } from "../lib/hooks";


export default function BookmarksButton() {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)

  useOnClickOutside([buttonRef, popoverRef], () => setIsOpen(false))

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
