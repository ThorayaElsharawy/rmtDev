import { useEffect, useState } from "react";
import { TJobItem, TJobItemExpended } from "./types";
import { useQuery, useQueries } from "@tanstack/react-query";
import toast from "react-hot-toast";

const fetchJobItem = async (id: number | null): Promise<TJobItemExpended> => {
    const resopnse = await fetch(`https://bytegrad.com/course-assets/projects/rmtdev/api/data/${id}`)
    const data = await resopnse.json()
    return data.jobItem
}

export function useJobItem(id: number | null) {
    const { data, error, isLoading } = useQuery<TJobItemExpended | null>({
        queryKey: ['job-item', id],
        queryFn: () => id ? fetchJobItem(id) : null,
        staleTime: 100 * 60 * 60,
        refetchOnWindowFocus: false,
        retry: false,
        enabled: Boolean(id),
    })

    useEffect(() => {
        if (!error) return
        const message = handleError(error)
        toast.error(message);

    }, [error])

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
    return data.jobItems
}

export function useJobItems(searchText: string) {

    const { data, isLoading, error } = useQuery({
        queryKey: ['job-items', searchText],
        queryFn: () => searchText ? fetchJobItems(searchText) : null,
        staleTime: 100 * 60 * 60,
        refetchOnWindowFocus: false,
        enabled: Boolean(searchText),
        retry: false
    })

    useEffect(() => {
        if (!error) return
        const message = handleError(error)
        toast.error(message);

    }, [error])

    return {
        jobList: data,
        isLoading
    } as const
}

export function useBookmarkJobItems(ids: number[]) {
    const results = useQueries({
        queries: ids.map(id => ({
            queryKey: ['job-item', id],
            queryFn: () => id ? fetchJobItem(id) : null,
            staleTime: 100 * 60 * 60,
            refetchOnWindowFocus: false,
            retry: false,
            enabled: Boolean(id),
        }))
    })

    const bookmarkJobItems = results.map(result => result?.data) as TJobItemExpended[]
    const isLoading = results.some(result => result.isLoading)

    return { bookmarkJobItems, isLoading } as const
}

export function useDebounce<T>(value: T, delay: number = 500): T {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {

        const timerId = setTimeout(() => setDebouncedValue(value), delay)

        return () => clearTimeout(timerId)

    }, [value, delay])

    return debouncedValue
}

const handleError = (error: unknown) => {

    let message;

    if (error instanceof Error) {
        message = error.message;
    } else if (typeof error === "string") {
        message = error;
    } else {
        message = "An error occurred.";
    }

    return message
}

const localStorageValue = <T>(key: string, initialValue: T) => {
    const value = localStorage.getItem(key)

    if (!value) return JSON.stringify(initialValue)
    return JSON.parse(value)
}

export function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [value, setValue] = useState(() => localStorageValue(key, initialValue));

    // localStorageValue(key)

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, key])

    return [value, setValue] as const
}