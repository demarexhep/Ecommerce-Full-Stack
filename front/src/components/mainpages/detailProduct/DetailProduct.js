import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { GobalState } from "../../../GobalState";
import { Link } from "react-router-dom";
import ProductContainer from "../../utils/productContainer/ProductContainer";

export default function DetailProduct() {
  const params = useParams();

  const value = useContext(GobalState);
  const [products] = value.products;
  const [product, setProduct] = useState([]);
  const [related, setRelated] = useState([]);

  const addCart = value.addCart;

  useEffect(() => {
    if (params) {
      const newData = products.filter((item) => {
        return item._id === params.id;
      });
      const related = products.filter((item) => {
        return item.category === newData[0].category;
      });
      setProduct(newData);
      setRelated(related);
    }
  }, [params, products]);

  return (
    <>
      {product.map((item) => (
        <div className="details" key={item._id}>
          <img src={item.images.url} alt="" />
          <div className="box-details">
            <div className="row">
              <h2>{item.title}</h2>
            </div>
            <span>$ {item.price}</span>
            <p>{item.description}</p>
            <p>{item.content}</p>
            <p>Sold: {item.sold}</p>
            <Link to="/cart" className="cart" onClick={() => addCart(item._id)}>
              Buy Now
            </Link>
          </div>
        </div>
      ))}

      <div className="related_products">
        <h2>Related products</h2>
        <ProductContainer productsOutside={related} addCart={addCart} />
      </div>
    </>
  );
}
