import { createContext, useContext } from "react"
import { useBookmarkJobItems, useLocalStorage } from "../lib/hooks";
import { TJobItemExpended } from "../lib/types";

type BookmarksContextValue = {
    bookMarkedIds: number[];
    handleToggleBookMark: (id: number) => void;
    bookmarkJobItems: TJobItemExpended[],
    isLoading: boolean
}

const BookmarksContext = createContext<BookmarksContextValue | null>(null)

export function BookmarksContextProvider({ children }: { children: React.ReactNode }) {
    const [bookMarkedIds, setBookMarkedIds] = useLocalStorage<number[]>('bookMarkedIds', []);
    const { bookmarkJobItems, isLoading } = useBookmarkJobItems(bookMarkedIds)

    console.log(bookmarkJobItems)
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
                handleToggleBookMark,
                bookmarkJobItems,
                isLoading
            }}>
            {children}
        </BookmarksContext.Provider>
    )
}


export const useBookmarksContext = () => {
    const context = useContext(BookmarksContext)
    if (!context)
        throw new Error('useContext (BookmarksContext) must be used within a BookmarkesContextProvider')

    return context
}