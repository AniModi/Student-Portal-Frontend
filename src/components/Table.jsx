// Table.jsx

import React, { useState } from 'react';
import './Table.scss';
import Pagination from './Pagination';

const dummyData = [
  { batch: '2022', studentId: 'S001', semester: 'Spring' },
  { batch: '2021', studentId: 'S002', semester: 'Fall' },
  { batch: '2023', studentId: 'S003', semester: 'Summer' },
  { batch: '2021', studentId: 'S002', semester: 'Fall' },
  { batch: '2023', studentId: 'S003', semester: 'Summer' },
  { batch: '2021', studentId: 'S002', semester: 'Fall' },
  { batch: '2023', studentId: 'S003', semester: 'Summer' },
  { batch: '2021', studentId: 'S002', semester: 'Fall' },
  { batch: '2023', studentId: 'S003', semester: 'Summer' },
  // Add more dummy data as needed
];

const Table = () => {
  const [filters, setFilters] = useState({
    studentId: '',
    semester: '',
    batch: '',
  });

  const filteredData = dummyData.filter((data) => {
    return (
      data.studentId.includes(filters.studentId) &&
      data.semester.includes(filters.semester) &&
      data.batch.includes(filters.batch)
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
          id="studentId"
          value={filters.studentId}
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
              <td>{data.studentId}</td>
              <td>{data.semester}</td>
              <td>
                <button>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={1}
        setCurrentPage={() => {}}
        totalPages={10}
        totalData={10}
      />
    </div>
  );
};

export default Table;
