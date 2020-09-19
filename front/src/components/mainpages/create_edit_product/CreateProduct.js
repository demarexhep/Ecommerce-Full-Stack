import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { GobalState } from "../../../GobalState";
import { useParams, useHistory } from "react-router-dom";
import Loading from "../../utils/loading/Loading";

const initialState = {
  product_id: "",
  title: "",
  price: 0,
  description:
    "How to and tutorial videos of cool CSS effect, Web Design ideas,JavaScript libraries, Node.",
  content:
    "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
  category: "",
  _id: "",
};

export default function CreateProduct() {
  const params = useParams();
  const [onEdit, setOnEdit] = useState(false);
  const value = useContext(GobalState);
  const [products] = value.products;
  const [categories] = value.categories;
  const [isAdmin] = value.isAdmin;
  const [token] = value.token;

  const [product, setProduct] = useState(initialState);
  const [images, setImages] = useState(false);
  const [alert, setAlert] = useState(false);
  const [callback, setCallback] = value.callback;
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const styleUpload = {
    display: images ? "block" : "none",
  };

  useEffect(() => {
    if (params.id) {
      const newData = [...products];
      newData.forEach((item) => {
        if (item._id === params.id) {
          setProduct(item);
          setImages(item.images);
        }
      });
      setOnEdit(true);
    } else {
      setOnEdit(false);
      setProduct(initialState);
      setImages(false);
    }
  }, [params, products, token]);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (isAdmin === false) return setAlert("You're not an admin");
      const file = e.target.files[0];
      if (!file) return setAlert("File not exist.");

      if (file.size > 1024 * 1024) return setAlert("Size too large!");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return setAlert("File format is incorrect");

      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });

      setLoading(false);
      setAlert("Uploaded Success");
      setImages(res.data);
    } catch (err) {
      err.response.data.msg && setAlert(err.response.data.msg);
    }
  };

  const handleCleanUpload = async () => {
    try {
      if (isAdmin === false) return setAlert("You're not an admin");
      await axios.post(
        "/api/destroy",
        { public_id: images.public_id },
        {
          headers: { Authorization: token },
        }
      );

      setImages(false);
    } catch (err) {
      err.response.data.msg && setAlert(err.response.data.msg);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    setAlert(false);
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      if (!images) return setAlert("No Image Upload");

      if (onEdit) {
        await axios.put(
          `/api/products/${product._id}`,
          { ...product, images },
          {
            headers: { Authorization: token },
          }
        );
        setCallback(!callback);
      } else {
        await axios.post(
          "/api/products",
          { ...product, images },
          {
            headers: { Authorization: token },
          }
        );
        setCallback(!callback);
      }

      setImages(false);
      setProduct(initialState);
      history.push("/");
    } catch (err) {
      err.response.data.msg && setAlert(err.response.data.msg);
    }
  };

  return (
    <>
      {alert && <h3>{alert}</h3>}
      <div id="ad_create_product">
        <div className="upload">
          <input type="file" name="file" id="file_up" onChange={handleUpload} />

          {loading ? (
            <div id="file_img">
              <Loading />
            </div>
          ) : (
            <div id="file_img" style={styleUpload}>
              <img src={images ? images.url : ""} alt="" />
              <span onClick={handleCleanUpload}>X</span>
            </div>
          )}
        </div>

        <form onSubmit={saveProduct}>
          <div className="row">
            <label htmlFor="product_id">Product ID</label>
            <input
              type="text"
              name="product_id"
              id="product_id"
              required
              value={product.product_id}
              disabled={onEdit}
              onChange={handleChangeInput}
            />
          </div>

          <div className="row">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              required
              value={product.title}
              onChange={handleChangeInput}
            />
          </div>

          <div className="row">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              required
              value={product.price}
              onChange={handleChangeInput}
            />
          </div>

          <div className="row">
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              name="description"
              rows="5"
              id="description"
              required
              value={product.description}
              onChange={handleChangeInput}
            />
          </div>

          <div className="row">
            <label htmlFor="content">Content</label>
            <textarea
              type="text"
              name="content"
              rows="7"
              id="content"
              required
              value={product.content}
              onChange={handleChangeInput}
            />
          </div>

          <div className="row">
            <label htmlFor="categories">Categories: </label>
            <select
              style={{ minWidth: "150px", textTransform: "capitalize" }}
              name="category"
              value={product.category}
              onChange={handleChangeInput}
              required
            >
              <option value="">Please select a category!</option>
              {categories.map((category) => (
                <option value={category._id} key={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit">Save</button>
        </form>
      </div>
    </>
  );
}
