import { FaBookmark } from "react-icons/fa6";
import { useBookmarksContext } from "../contexts/BookmarksContextProvider";

type BookmarkIconProps = {
  id: number
}

export default function BookmarkIcon({ id }: BookmarkIconProps) {

  const { bookMarkedIds, handleToggleBookMark } = useBookmarksContext()

  return (
    <button onClick={(e) => {
      handleToggleBookMark(id);
      e.stopPropagation();
      e.preventDefault()
    }} className="bookmark-btn">
      <FaBookmark className={`${bookMarkedIds.includes(id) ? 'filled' : ''}`} />
    </button>
  );
}
