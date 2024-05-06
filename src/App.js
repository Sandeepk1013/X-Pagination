import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [page, setPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerpage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const lastIdx = currentPage * postPerpage;
  const firstIdx = lastIdx - postPerpage;
  const currentPost = page.slice(firstIdx, lastIdx);

  // Fetch data from API
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = (pageNumber) => {
    axios
      .get(
        " https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      )
      .then((res) => {
        setPage(res.data);
        setTotalPages(10);
      })
      .catch(() => alert("failed to fetch data"));
  };
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="App">
      <h1>Employee Data table</h1>
      <table className="table-head">
        <thead className="row-head">
          <tr >
            <th > ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentPost.map((items) => (
            <tr key={items.id} >
              <td>{items.id}</td>
              <td>{items.name}</td>
              <td>{items.email}</td>
              <td>{items.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div  className="pagination">
        <button onClick={handlePrevious} className="btns">
          Previous
        </button>
        <span className="number">{currentPage}</span>
        <button onClick={handleNext} className="btns">
          Next
        </button>
      </div>
    </div>
  );
}

export default App;