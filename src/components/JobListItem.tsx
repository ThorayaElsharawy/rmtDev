import { TJobItem } from "../lib/types";
import BookmarkIcon from "./BookmarkIcon";

type JobListItemProps = {
  job: TJobItem
}

export default function JobListItem({job}: JobListItemProps) {
  return (
    <li className="job-item">
      <a href={`#${job.id}`} className="job-item__link">
        <div className="job-item__badge">{job.badgeLetters}T</div>

        <div className="job-item__middle">
          <h3 className="third-heading">{job.title}</h3>
          <p className="job-item__company">{job.company}</p>
        </div>

        <div className="job-item__right">
          <BookmarkIcon />
          <time className="job-item__time">{job.daysAgo}d</time>
        </div>
      </a>
    </li>
  );
}
