import React, { useContext } from "react";
import "./loadmore.css";
import { GobalState } from "../../../../GobalState";

function LoadMore() {
  const value = useContext(GobalState);
  const [page, setPage] = value.page;
  const [result] = value.result;

  return (
    <div className="load-more">
      {result < page * 9 ? (
        ""
      ) : (
        <button onClick={() => setPage(page + 1)}>Load more</button>
      )}
    </div>
  );
}

export default LoadMore;
