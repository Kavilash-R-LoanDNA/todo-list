import { FiMoon, FiSun } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";

const TodoHeader = () => {
    
  return (
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
  );
};

export default TodoHeader;
