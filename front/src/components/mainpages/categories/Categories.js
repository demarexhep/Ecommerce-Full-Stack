import React, { useState, useContext } from "react";
import axios from "axios";
import { GobalState } from "../../../GobalState";

export default function Categories() {
  const value = useContext(GobalState);
  const [categories, setCategories] = value.categories;
  const [token] = value.token;

  const [category, setCategory] = useState("");
  const [alert, setAlert] = useState("");
  const [onEdit, setOnEdit] = useState(false);
  const [categoryID, setCategoryID] = useState("");

  const getData = async () => {
    const res = await axios.get("/api/category");
    setCategories(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.put(
          `/api/category/${categoryID}`,
          { name: category },
          {
            headers: { Authorization: token },
          }
        );

        setAlert(res.data.msg);
      } else {
        const res = await axios.post(
          "/api/category",
          { name: category },
          {
            headers: { Authorization: token },
          }
        );

        setAlert(res.data.msg);
      }
      setOnEdit(false);
      setCategory("");
      setCategoryID("");
      getData();
    } catch (err) {
      err.response.data.msg && setAlert(err.response.data.msg);
    }
  };

  const deleteCategory = async (id) => {
    try {
      const res = await axios.delete(`/api/category/${id}`, {
        headers: { Authorization: token },
      });

      setAlert(res.data.msg);
      getData();
    } catch (err) {
      err.response.data.msg && setAlert(err.response.data.msg);
    }
  };

  const editCategory = async (id, name) => {
    try {
      setAlert("");
      setCategoryID(id);
      setCategory(name);
      setOnEdit(true);
    } catch (err) {
      err.response.data.msg && setAlert(err.response.data.msg);
    }
  };

  return (
    <>
      <p>{alert}</p>
      <div className="category">
        <form onSubmit={handleSubmit}>
          <label htmlFor="category">Category</label>

          <input
            type="text"
            name="category"
            id="category"
            value={category}
            required
            onChange={(e) => setCategory(e.target.value)}
          />

          <button type="submit">Save</button>
        </form>
        <div className="col">
          {categories.map((category) => (
            <div className="row" key={category._id}>
              <p>{category.name}</p>
              <div>
                <button
                  onClick={() => editCategory(category._id, category.name)}
                >
                  Edit
                </button>
                <button onClick={() => deleteCategory(category._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
