import "./Home.css";
import { IoSearchOutline } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import { FiMoon } from "react-icons/fi";
import { FiSun } from "react-icons/fi";
import { GoPencil } from "react-icons/go";
import { RiDeleteBinLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [dropdown, setDropdown] = useState("All");

  const [searchValue, setSearchValue] = useState("");

  const [rowData, setRowData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  // useEffect(() => {
  //   const filteredData = rowData.filter((task) => {
  //     return task.title.toLowerCase().includes(searchValue.toLowerCase());
  //   });
  //   setSearchResults(filteredData);
  // }, [searchValue]);

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved !== null ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const filteredDataa = rowData.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchValue.toLowerCase());

    if (dropdown === "completed") {
      return matchesSearch && task.completed;
    } else if (dropdown === "incomplete") {
      return matchesSearch && !task.completed;
    }
    return matchesSearch; // "All"
  });

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5160/api/todo");
      console.log("Fetched data:", response.data);
      setRowData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // Function to handle adding a new task

  const handleSHowAddTaskForm = () => {
    showForm ? setShowForm(false) : setShowForm(true);
  };

  // Function to handle form submission
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") {
      alert("Please enter a task.");
      return;
    }

    try {
      if (isEditing) {
        const res = await axios.put(
          `http://localhost:5160/api/todo/${editTaskId}`,
          {
            id: editTaskId,
            title: inputValue,
            completed: false,
          }
        );
        await fetchData(); // Refresh the data after editing
        setInputValue("");
        setShowForm(false);
        setIsEditing(false);
        setEditTaskId(null);
      } else {
        const res = await axios.post("http://localhost:5160/api/todo", {
          id: rowData.length + 1, // Assuming ID is auto-incremented
          title: inputValue,
          completed: false,
        });
        await fetchData();
        setInputValue("");
        // setRowData([...rowData, res.data]);
        setShowForm(false);
      }
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
  };

  const handleEditTask = (task) => {
    console.log("Edit task:", task);

    setShowForm(true);
    setInputValue(task.title);
    setIsEditing(true);
    setEditTaskId(task.id);
  };

  const handleToggleComplete = async (task) => {
    try {
      await axios.put(`http://localhost:5160/api/todo/${task.id}`, {
        ...task,
        completed: !task.completed,
      });
      await fetchData();
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5160/api/todo/${id}`);
      await fetchData();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

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
          <input
            placeholder="search note.."
            onChange={(e) => setSearchValue(e.target.value)}
            className="search"
            type="text"
          />
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

        {/* dark mode */}
        <div
          onClick={() => setDarkMode(!darkMode)}
          className="dark-mode-container"
        >
          {darkMode ? <FiSun /> : <FiMoon />}
        </div>
      </div>

      {/* list rows */}
      <div className="list-rows">
        {filteredDataa.length > 0 ? (
          filteredDataa.map((row) => (
            <div key={row.id} className="list-row">
              {/* left content */}
              <div className="row-left">
                <input
                  style={{ height: "20px", width: "20px" }}
                  type="checkbox"
                  checked={row.completed}
                  onChange={() => handleToggleComplete(row)}
                  className="checkbox"
                />
                <div
                  style={{
                    textDecoration: row.completed ? "line-through" : "none",
                  }}
                >
                  {row.title}
                </div>
              </div>
              {/* right content */}
              <div className="row-right">
                <div onClick={() => handleEditTask(row)}>
                  <GoPencil />
                </div>
                <div onClick={() => handleDeleteTask(row.id)}>
                  <RiDeleteBinLine />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-tasks">No tasks found</div>
        )}
      </div>

      {/* add button */}
      <div className="add-button" onClick={handleSHowAddTaskForm}>
        <FiPlus size={30} style={{}} />
      </div>

      {/* add task form */}
      <div
        style={{ display: showForm ? "block" : "none" }}
        className="parent-add-task-form"
      >
        <div
          style={{ display: showForm ? "block" : "none" }}
          id="add-task-form-container"
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h3>NEW NOTE</h3>
          </div>
          <form onSubmit={handleSubmitForm} className="add-task-form">
            <input
              type="text"
              placeholder="Add a new task..."
              value={inputValue || ""}
              onChange={(e) => setInputValue(e.target.value)}
              className="add-task-input"
              style={{
                width: "300px",
                height: "20px",
                padding: "5px",
                borderRadius: "10px",
              }}
            />
            <div className="add-task-buttons">
              <button
                className="cancel-btn"
                type="button"
                onClick={handleCancelForm}
              >
                Cancel
              </button>
              <button type="submit" className="add-task-button">
                Apply
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
