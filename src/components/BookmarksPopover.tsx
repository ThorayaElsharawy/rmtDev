import { useBookmarksContext } from "../contexts/BookmarksContextProvider";
import JobList from "./JobList";

export default function BookmarksPopover() {
  const { bookmarkJobItems, isLoading } = useBookmarksContext();

  return <div className="bookmarks-popover">
    <JobList jobList={bookmarkJobItems} isLoading={isLoading} />
  </div>;
}
