import { TJobItem } from "../lib/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

type JobListProps = {
  jobList: TJobItem[]
  isLoading: boolean
}

export function JobList({ jobList, isLoading }: JobListProps) {
  return <ul className="job-list">
    {isLoading && <Spinner />}
    {!isLoading &&jobList.map(job => <JobListItem key={job.id} job={job} />)}
  </ul>;
}

export default JobList;
