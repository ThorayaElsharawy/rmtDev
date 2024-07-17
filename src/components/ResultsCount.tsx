export default function ResultsCount({ totalNumOfResult }: { totalNumOfResult: number }) {
  
  return <p className="count">
    <span className="u-bold">{totalNumOfResult}</span> results</p>;
}
