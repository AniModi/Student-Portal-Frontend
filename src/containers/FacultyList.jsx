import React, { useEffect, useState } from "react";
import "./FacultyList.scss";
import axios from "axios";
import Table from "../components/Table";

export default function FacultyList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const jwt = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/registration/get-all-students",
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
  return <Table data={data} setData={setData}></Table>;
}
