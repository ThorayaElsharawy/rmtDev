import { useEffect, useState } from "react";
import { TJobItem, TJobItemExpended } from "./types";
import { useQuery } from "@tanstack/react-query";

const fetchJobItem = async (id: number | null): Promise<TJobItemExpended> => {
    const resopnse = await fetch(`https://bytegrad.com/course-assets/projects/rmtdev/api/data/${id}`)

    const data = await resopnse.json()
    return data.jobItem
}

export function useJobItem(id: number | null) {

    const { data, error, isLoading } = useQuery<TJobItemExpended | null >({
        queryKey: ['job-item', id],
        queryFn: () => id ? fetchJobItem(id) : null,
        staleTime: 100 * 60 * 60,
        refetchOnWindowFocus: false,
        retry: false,
        enabled: Boolean(id),
    })

    console.log(error)
    return [data, isLoading] as const
}


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

const fetchJobItems = async (searchText: string): Promise<TJobItem[]> => {
    const resopnse = await fetch(`https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`)

    if (!resopnse.ok) {
        const errorData = await resopnse.json()
        throw new Error(errorData.description)
    }
    const data = await resopnse.json()
    console.log(data.jobItems)
    return data.jobItems
}

export function useJobItems(searchText: string) {

    const { data, isLoading } = useQuery<TJobItem[] | null>({
        queryKey: ['job-items', searchText],
        queryFn: () => searchText ? fetchJobItems(searchText) : null,
        staleTime: 100 * 60 * 60,
        refetchOnWindowFocus: false,
        enabled: Boolean(searchText),
        retry: false,
    })



    return {
        jobList: data?.slice(0,7),
        isLoading,
        totalNumOfResult: data?.length
    } as const
}

export function useDebounce<T>(value: T, delay: number = 500): T {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {

        const timerId = setTimeout(() => setDebouncedValue(value), delay)

        return () => clearTimeout(timerId)

    }, [value, delay])

    return debouncedValue
}