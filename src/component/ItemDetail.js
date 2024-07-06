import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../component/api";
import Header from "./Header";
import Footer from "./Footer";
import Star from "./StarRating";

function ItemDetail() {
  const { id } = useParams();
  const [itemData, setItemData] = useState(null);
  const { title } = useParams();
  const navigate = useNavigate();

  //   useEffect(() => {
  //     const fetchItemData = async () => {
  //       try {
  //         const response = await axios.get(`${BASE_URL}/products/${id}`);
  //         setItemData(response.data);
  //       } catch (error) {
  //         console.error("Error fetching item data:", error);
  //       }
  //     };
  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/products`);
        const products = response.data;
        const product = products.find(
          (product) =>
            product.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") ===
            title.toLowerCase()
        );
        if (product) {
          setItemData(product);
          if (
            title !== product.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")
          ) {
            navigate(
              `/products/${product.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")}`
            );
          }
        } else {
          console.error("Product not found");
        }
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };

    fetchItemData();
  }, [id]);

  if (!itemData) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <div>
        <h2>{itemData.title}</h2>
        <img src={itemData.image} alt={itemData.title} />
        <p>{itemData.description}</p>
        <p>Category: {itemData.category}</p>
        <p>Price: {itemData.price}</p>
        <p>Ratings: {itemData.rating.rate}</p>
        <p>
          Ratings: <Star rating={itemData.rating.rate} />
        </p>
        <p>Customer: {itemData.rating.count}</p>
        {/* other item details */}
      </div>
      <Footer />
    </div>
  );
}

export default ItemDetail;
