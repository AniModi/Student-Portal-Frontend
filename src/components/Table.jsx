import React, { useState } from "react";
import "./Table.scss";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";

const Table = ({data, setData}) => {
  const [filters, setFilters] = useState({
    username: "",
    semester: "",
    batch: "",
  });

  const navigate = useNavigate();

  

  const filteredData = data.filter((_data) => {
    return (
      _data.username.includes(filters.username) &&
      _data.semester.includes(filters.semester) &&
      _data.batch.includes(filters.batch)
    );
  });

  const handleFilterChange = (e) => {
    const { id, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [id]: value }));
  };

  return (
    <div className="table_container">
      <div className="table_container__filter_container">
        <label htmlFor="studentIdFilter">Student ID:</label>
        <input
          type="text"
          id="username"
          value={filters.username}
          onChange={handleFilterChange}
          placeholder="Filter by Student ID"
        />

        <label htmlFor="semesterFilter">Semester:</label>
        <input
          type="text"
          id="semester"
          value={filters.semester}
          onChange={handleFilterChange}
          placeholder="Filter by Semester"
        />

        <label htmlFor="batchFilter">Batch:</label>
        <input
          type="text"
          id="batch"
          value={filters.batch}
          onChange={handleFilterChange}
          placeholder="Filter by Batch"
        />
      </div>
      <table className="table_container__table">
        <thead>
          <tr>
            <th>Batch</th>
            <th>Student ID</th>
            <th>Semester</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((data, index) => (
            <tr key={index}>
              <td>{data.batch}</td>
              <td>{data.username}</td>
              <td>{data.semester}</td>
              <td>
                <button
                  onClick={() => {
                    navigate(`${data.username}/${data.semester}`);
                  }}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={1}
        setCurrentPage={() => {}}
        totalPages={(filteredData.length + 9) / 10}
        totalData={10}
      />
    </div>
  );
};

export default Table;
