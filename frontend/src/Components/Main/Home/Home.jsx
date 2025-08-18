import "./Home.css";
import { IoSearchOutline } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import { FiMoon } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [dropdown, setDropdown] = useState("All");

  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const fetchData = async () =>{
        try {
            const response = await axios.get("http://localhost:5160/api/todo");
            setRowData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    fetchData();
}, []);



  return (
    <div className="home">
      {/* title */}
      <div className="header-title">
        <p>TODO LIST</p>
      </div>

      {/* list header */}
      <div className="list-header">
        {/* search */}
        <div className="search-container">
          <input placeholder="search note.." className="search" type="text" />
          <IoSearchOutline />
        </div>

        {/* filter button */}
        <select
          className="filter-dropdown"
          onChange={(e) => setDropdown(e.target.value)}
        >
          <option value="All">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>

        {/* delete */}
        <div>
          <FiMoon />
        </div>
      </div>

      {/* list rows */}
      <div className="list-rows">
        {rowData.map((row) => (
          <div
            key={row.id}
            className="list-row"
          >
            {/* left content */}
            <div className="row-left">
                <input style={{height:"20px",width:"20px"}} type="checkbox" />
                <div>{row.title}</div>
            </div>
            {/* right content */}
            <div className="row-right">
                <div>edit</div>
                <div>del</div>
            </div>
            
          </div>
        ))}
      </div>

      {/* add button */}
      <div className="add-button">
        <FiPlus size={30} style={{}} />
      </div>

      {/* add task form */}
      <div className="add-task-form-container">
        <div style={{ display: "flex", justifyContent: "center" }}>
            <h3>NEW NOTE</h3>
        </div>
        <form className="add-task-form">
          <input
            type="text"
            placeholder="Add a new task..."
            className="add-task-input"
            style={{ width: "300px",height: "20px", padding: "5px", borderRadius: "10px" }}
          />
          <div className="add-task-buttons">
            <button>Cancel</button>
            <button type="submit" className="add-task-button">
              Apply
            </button>

          </div>
          
        </form>
      </div>
    </div>  
  );
};

export default Home;
