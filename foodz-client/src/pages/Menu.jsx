import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "../components/button/Button";
import MenuList from "../components/menu/MenuList";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filter, setFilter] = useState("All");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");
        const data = response.data.Products;
        setMenu(data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    fetchMenu();
  }, []);

  const handleCategoryClick = (categoryId) => {
    setFilter(categoryId === filter ? "All" : categoryId);
    setCurrentPage(0); // Reset current page when category filter changes
  };

  const isActive = (categoryId) => {
    return categoryId === filter || (categoryId === "All" && filter === "All");
  };

  const handleSortChange = (option) => {
    setSortOption(option);

    // Logic for sorting based on the selected option
    let sortedItems = [...menu];

    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        // Do nothing for the "default" case
        break;
    }

    setMenu(sortedItems);
    setCurrentPage(0); // Reset to first page after sorting
  };

  const filteredMenuItems = menu.filter((item) =>
    filter === "All" ? true : item.category.categoryId === filter
  );

  const totalPages = Math.ceil(filteredMenuItems.length / itemsPerPage);

  const currentItems = filteredMenuItems.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="p-14">
      <div className="container">
        <div className="flex items-center justify-center flex-col">
          <h1 className="text-5xl font-extrabold mb-9">
            Dive into Delights Of Delectable <span className="text-primary">Food</span>
          </h1>
          <p className="text-2xl font-medium text-text mb-9">
            Where Each Plate Weaves a Story of Culinary Mastery and Passionate Craftsmanship
          </p>
          <Button>Order Now</Button>
        </div>
        <div className="flex items-center justify-between mt-16 mb-16">
          <ul className="flex items-center gap-8 menu-nav cursor-pointer">
            <li>
              <NavLink
                to="/menu"
                onClick={() => handleCategoryClick("All")}
                className={`text-${
                  isActive("All") ? "primary" : "black"
                } hover:text-primary text-[18px]`}>
                All
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={() => handleCategoryClick("65f9011c28564c0f6b279700")}
                className={`text-${
                  isActive("65f9011c28564c0f6b279700") ? "primary" : "black"
                } hover:text-primary text-[18px]`}>
                Hot
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={() => handleCategoryClick("65f50bb9d3ae70c03ccc4530")}
                className={`text-${
                  isActive("65f50bb9d3ae70c03ccc4530") ? "primary" : "black"
                } hover:text-primary text-[18px]`}>
                Special
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={() => handleCategoryClick("667e39cbd25ff75436dbb308")}
                className={`text-${
                  isActive("667e39cbd25ff75436dbb308") ? "primary" : "black"
                } hover:text-primary text-[18px]`}>
                Drink
              </NavLink>
            </li>
            {/* Add other categories as needed */}
          </ul>
          <div className="flex items-center gap-2 bg-black text-white rounded-sm px-5 py-2 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6">
              <path
                fillRule="evenodd"
                d="M3.792 2.938A49.069 49.069 0 0 1 12 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 0 1 1.541 1.836v1.044a3 3 0 0 1-.879 2.121l-6.182 6.182a1.5 1.5 0 0 0-.439 1.061v2.927a3 3 0 0 1-1.658 2.684l-1.757.878A.75.75 0 0 1 9.75 21v-5.818a1.5 1.5 0 0 0-.44-1.06L3.13 7.938a3 3 0 0 1-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836Z"
                clipRule="evenodd"
              />
            </svg>
            <select
              id="sort"
              onChange={(e) => handleSortChange(e.target.value)}
              value={sortOption}
              className="bg-black text-white px-2 py-1 rounded-sm">
              <option value="default">Default</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="low-to-high">Low to High</option>
              <option value="high-to-low">High to Low</option>
            </select>
          </div>
        </div>
        <MenuList items={currentItems} />
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          previousLabel={<FaChevronLeft />}
          nextLabel={<FaChevronRight />}
          breakLabel={"..."}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          previousLinkClassName={"previous"}
          nextLinkClassName={"next"}
          disabledClassName={"disabled"}
        />
      </div>
    </div>
  );
};

export default Menu;
