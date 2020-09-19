import React, { useContext } from "react";
import "./filter.css";
import { GobalState } from "../../../../GobalState";

function Filters() {
  const value = useContext(GobalState);
  const [categories] = value.categories;
  const [category, setCategory] = value.category;
  const [sort, setSort] = value.sort;
  const [search, setSearch] = value.search;

  const handleCategory = (e) => {
    setCategory(e.target.value);
    setSearch("");
  };

  return (
    <div className="filter-menu">
      <div className="row">
        <span>Filters: </span>
        <select
          name="category"
          onChange={handleCategory}
          required
          value={category}
        >
          <option value="">All Products</option>
          {categories.map((category) => (
            <option value={"category=" + category._id} key={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <input
        type="text"
        name="srch"
        id="srch"
        value={search}
        autoComplete="off"
        placeholder="Enter your search !"
        onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
      />

      <div className="row">
        <span>Sort By: </span>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          required
          className="sort"
        >
          <option value="">Newest</option>
          <option value="sort=oldest">Oldest</option>
          <option value="sort=-sold">Best sales</option>
          <option value="sort=-price">Price: High-Low</option>
          <option value="sort=price">Price: Low-High</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;
