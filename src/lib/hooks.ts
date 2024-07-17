import { useEffect, useState } from "react";
import { TJobItem, TJobItemExpended } from "./types";


export function useActiveId() {
    const [activeId, setActiveId] = useState<number | null>(null);

    useEffect(() => {
        const handleHashChange = () => {
            const id = +window.location.hash.slice(1);
            setActiveId(id);
        };
        handleHashChange();

        window.addEventListener("hashchange", handleHashChange);

        return () => {
            window.removeEventListener("hashchange", handleHashChange);
        };
    }, []);

    return activeId;
}

export function useJobItem(id: number | null) {
    const [jobItem, setJobItem] = useState<TJobItemExpended | null>()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (!id) return
        setIsLoading(true)
        const fetchJobItem = async () => {
            const resopnse = await fetch(`https://bytegrad.com/course-assets/projects/rmtdev/api/data/${id}`)
            const data = await resopnse.json()
            setJobItem(data.jobItem)
            setIsLoading(false)
        }
        fetchJobItem()

    }, [id])

    return [jobItem, isLoading] as const
}

export function useJobItems(searchText: string) {
    const [jobList, setJobList] = useState<TJobItem[]>([]);
    const [isLoading, setIsLoading] = useState(false)

    const splicedJobList = jobList.slice(0, 7)

    useEffect(() => {
        if (!searchText) return
        const fetchJobs = async () => {
            console.log('here')
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