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

function App() {
  const [searchText, setSearchText] = useState("");
  const  debouncedSearchText  = useDebounce(searchText, 500)
  const { jobList, isLoading } = useJobItems(debouncedSearchText);

  const totalNumOfResult = jobList?.length || 0;
  const jobItemSliced = jobList?.slice(0,7) || []

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

          <JobList jobList={jobItemSliced} isLoading={isLoading} />
          <PaginationControls />
        </Sidebar>
        <JobItemContent />
      </Container>

      <Footer />

      <Toaster position="top-right" />
    </>
  )
}

export default App
