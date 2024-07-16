import { useEffect, useState } from "react";
import { TJobItem } from "./types";

export function useJobItems(searchText: string) {
    const [jobList, setJobList] = useState<TJobItem[]>([]);
    const [isLoading, setIsLoading] = useState(false)

    const splicedJobList = jobList.splice(0, 7)

    useEffect(() => {
        if (!searchText) return
        const fetchJobs = async () => {
            try {
                setIsLoading(true)
                const response = await fetch(`https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`)

                if (!response.ok) throw new Error("Error in fetching data")

                const data = await response.json()
                setJobList(data.jobItems)
            } catch (error) {

            }

            setIsLoading(false)
        }

        fetchJobs()

    }, [searchText])


    return [
        splicedJobList,
        isLoading
    ] as const
}