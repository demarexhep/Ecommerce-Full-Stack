import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ProductContainer({ isAdmin, productsOutside, token, addCart }) {
  const [products, setProducts] = useState([]);
  const [isDelete, setIsDelete] = useState(true);
  const [isCheckAll, setIsCheckAll] = useState(false);

  useEffect(() => {
    setProducts(productsOutside);
  }, [productsOutside]);

  const checkAll = () => {
    const newProducts = [...products];
    newProducts.forEach((product) => {
      product.checked = !isCheckAll;
    });
    setProducts(newProducts);
    setIsCheckAll(!isCheckAll);
  };

  const handleCheck = (id) => {
    const newProducts = [...products];
    newProducts.forEach((product) => {
      if (product._id === id) {
        product.checked = !product.checked;
      }
    });
    setProducts(newProducts);
  };

  const deleteProduct = async (id, public_id) => {
    try {
      await axios.delete(`/api/products/${id}`, {
        headers: { Authorization: token },
      });
      await axios.post(
        "/api/destroy",
        { public_id },
        {
          headers: { Authorization: token },
        }
      );

      if (isDelete) return (window.location.href = "/");
    } catch (err) {
      window.location.href = "/";
    }
  };

  const deleteAll = () => {
    try {
      setIsDelete(false);
      products.forEach((product) => {
        if (product.checked === true) {
          console.log({ id: product._id, public_id: product.images.public_id });
          deleteProduct(product._id, product.images.public_id);
        }
      });
    } catch (err) {
      window.location.href = "/";
    }
  };

  return (
    <>
      {isAdmin && (
        <div className="delete-all">
          <span>Select all</span>
          <input type="checkbox" onChange={checkAll} checked={isCheckAll} />
          <button onClick={deleteAll}>Delete ALL</button>
        </div>
      )}

      <div className="products_container">
        {products.length === 0 && <h2>Products Empty</h2>}

        {products.map((product) => (
          <div className="product_card" key={product._id}>
            {isAdmin && (
              <input
                type="checkbox"
                checked={product.checked}
                onChange={() => handleCheck(product._id)}
              />
            )}
            <img src={product.images.url} alt="" />
            <div className="product_box">
              <h2 title={product.title}>{product.title}</h2>
              <span>${product.price}</span>
              <p>{product.description}</p>
            </div>
            <div className="row_btn">
              {isAdmin ? (
                <>
                  <Link
                    id="btn_buy"
                    to="#!"
                    onClick={() =>
                      deleteProduct(product._id, product.images.public_id)
                    }
                  >
                    Delete
                  </Link>

                  <Link id="btn_view" to={`/edit_product/${product._id}`}>
                    Edit
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    id="btn_buy"
                    to="#!"
                    onClick={() => addCart(product._id)}
                  >
                    Buy
                  </Link>
                  <Link id="btn_view" to={`/details/${product._id}`}>
                    View
                  </Link>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ProductContainer;
