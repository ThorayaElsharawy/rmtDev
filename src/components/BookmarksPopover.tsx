import { forwardRef } from "react";
import { useBookmarksContext } from "../contexts/BookmarksContextProvider";
import JobList from "./JobList";

const BookmarksPopover = forwardRef<HTMLDivElement>(function (_, ref) {
  const { bookmarkJobItems, isLoading } = useBookmarksContext();

  return <div ref={ref} className="bookmarks-popover">
    <JobList jobList={bookmarkJobItems} isLoading={isLoading} />
  </div>;
});

export default BookmarksPopover
