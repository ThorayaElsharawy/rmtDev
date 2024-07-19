import { useEffect, useState } from "react";
import Background from "./components/Background"
import Container from "./components/Container"
import Footer from "./components/Footer"
import Header from "./components/Header"
import { useDebounce, useJobItems } from "./lib/hooks";
import SearchForm from "./components/SearchForm";
import BookmarksButton from "./components/BookmarksButton";
import Logo from "./components/Logo";
import Sidebar from "./components/Sidebar";
import JobItemContent from "./components/JobItemContent";
import ResultsCount from "./components/ResultsCount";
import SortingControls from "./components/SortingControls";
import JobList from "./components/JobList";
import PaginationControls from "./components/PaginationControls";
import { Toaster } from "react-hot-toast";
import { RESULTS_PER_PAGE } from "./lib/constants";
import { TDirection, TSortBy } from "./lib/types";

function App() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500)
  const { jobList, isLoading } = useJobItems(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<TSortBy>('relevant')

  const totalNumOfResult = jobList?.length || 0;
  const totalNumOfPage = totalNumOfResult / RESULTS_PER_PAGE
  const sortedJobList = [...(jobList || [])]?.sort((a, b) => {
    if (sortBy == 'relevant') {
      return b.relevanceScore - a.relevanceScore
    } else {
      return a.daysAgo - b.daysAgo
    }
  })

  console.log(sortedJobList)
  const jobItemSliced = sortedJobList?.slice(
    currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE);

  const handleChangePage = (direction: TDirection) => {
    if (direction === 'previous') {
      setCurrentPage(prev => prev - 1)
    }
    if (direction === 'next') {
      setCurrentPage(prev => prev + 1)
    }
  }

  const handleChangeSortBy = (newSort: TSortBy) => {
    setCurrentPage(1)
    setSortBy(newSort)
  }

  return (
    <>
      <Background />

      <Header>
        <div className="header__top">
          <Logo />
          <BookmarksButton />
        </div>

        <SearchForm searchText={searchText} setSearchText={setSearchText} />
      </Header>

      <Container>
        <Sidebar>
          <div className="sidebar__top">
            <ResultsCount totalNumOfResult={totalNumOfResult} />
            <SortingControls sortBy={sortBy} onClick={handleChangeSortBy} />
          </div>

          <JobList jobList={jobItemSliced} isLoading={isLoading} />
          <PaginationControls onClick={handleChangePage} currentPage={currentPage} totalNumOfPage={totalNumOfPage} />
        </Sidebar>
        <JobItemContent />
      </Container>

      <Footer />

      <Toaster position="top-right" />
    </>
  )
}

export default App
