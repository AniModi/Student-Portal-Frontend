import React, { useEffect, useState } from 'react';
import './FinanceStudentList.scss';
import Table from '../components/Table';
import axios from 'axios';

const FinanceStudentList = () => {
    const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const jwt = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/verify-fees/get",
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        const data = response.data.data;
        for (let i = 0; i < data.length; i++) {
          data[i].batch = data[i].username.slice(0, 4);
        }
        setData(response.data.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);
    return (
        <Table data={data} setData={setData}></Table>
    );
}

export default FinanceStudentList;