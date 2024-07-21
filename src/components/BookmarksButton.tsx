import { useState } from "react";
import { FaBookmark } from "react-icons/fa6";
import BookmarksPopover from "./BookmarksPopover";


export default function BookmarksButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section>
      <button onClick={() => setIsOpen(prev => !prev)} className="bookmarks-btn">
        Bookmarks <FaBookmark />
      </button>
      {isOpen && <BookmarksPopover />}
    </section>
  );
}
