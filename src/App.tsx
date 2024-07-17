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

function App() {
  const [searchText, setSearchText] = useState("");
  const  debouncedSearchText  = useDebounce(searchText, 500)
  const { jobList, isLoading, totalNumOfResult } = useJobItems(debouncedSearchText);


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
            <SortingControls />
          </div>

          <JobList jobList={jobList} isLoading={isLoading} />
          <PaginationControls />
        </Sidebar>
        <JobItemContent />
      </Container>

      <Footer />
    </>
  )
}

export default App
