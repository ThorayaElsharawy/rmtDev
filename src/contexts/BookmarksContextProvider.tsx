import { Children, createContext, useContext, useEffect, useState } from "react"
import { useLocalStorage } from "../lib/hooks";

type BookmarksContextValue = {
    bookMarkedIds: number[];
    handleToggleBookMark: (id: number) => void;
}

const BookmarksContext = createContext<BookmarksContextValue | null>(null)

export function BookmarksContextProvider({ children }: { children: React.ReactNode }) {
    const [bookMarkedIds, setBookMarkedIds] = useLocalStorage<number[]>('bookMarkedIds', [])

    const handleToggleBookMark = (id: number) => {
        if (bookMarkedIds.includes(id)) {
            setBookMarkedIds(prev => prev.filter((item) => item !== id))
        } else {
            setBookMarkedIds(prev => [...prev, id])
        }
    }

    return (
        <BookmarksContext.Provider
            value={{
                bookMarkedIds,
                handleToggleBookMark
            }}>
            {children}
        </BookmarksContext.Provider>
    )
}


export const useBookmarksContext = () => {
    const context = useContext(BookmarksContext)
    if(!context)
        throw new Error('useContext (BookmarksContext) must be used within a BookmarkesContextProvider')

    return context
}