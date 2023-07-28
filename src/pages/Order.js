import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Navbar from "../components/Navbar";

const Order = () => {
  const [items, setItems] = useState([]);
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const userID = localStorage.getItem('userID') || null;

  useEffect(() => {
    axios.get('http://localhost:8080/product')
      .then(response => {
        setItems(response.data.data)
        const list = response.data.data;
        let defaultList = {};
        for (const item of list) {
          defaultList[item.id] = 0;
        }
        setData(defaultList);
      })
      .catch(error =>
        console.error(error)
      );
  }, []);

  function check(itemId) {
    setData((prev) => ({ ...prev, [itemId]: 1 }));
  };

  function uncheck(itemId) {
    setData((prev) => ({ ...prev, [itemId]: 0 }));
  };

  function isChecked(itemId) {
    if (data[itemId] === 1)
      return true;
    else return false;
  }

  const checkout = async () => {
    if (userID) {
      // Get an array of selected itemIds from the data object
      const selectedItems = Object.keys(data).filter(itemId => data[itemId] === 1);
      const totalPrice = selectedItems.reduce(
        (accumulator, currentItemId) =>
          accumulator + items.find(item => item.id === parseInt(currentItemId, 10)).price,
        0
      );

      try {
        const response = await axios.post(`http://localhost:8080/order/${userID}`, {
          idUser: userID,
          totalPrice: totalPrice,
          status: "ordered",
          productsId: selectedItems,
        });
        const res = response.data;
        const orderId = res.data;
        navigate(`/payment/${orderId}`);
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      alert('You have to login first!');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2 style={{ padding: '20px' }}>Order</h2>
        {items.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.productName}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>
                    {isChecked(item.id) ?
                      <div className="box btn" onClick={() => uncheck(item.id)}>
                        <svg height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path style={{ fill: "#A5EB78" }} d="M433.139,67.108L201.294,298.953c-6.249,6.249-16.381,6.249-22.63,0L78.861,199.15L0,278.011 l150.547,150.549c10.458,10.458,24.642,16.333,39.431,16.333l0,0c14.788,0,28.973-5.876,39.43-16.333L512,145.968L433.139,67.108z"></path> <g style={{ opacity: "0.1" }}> <path d="M485.921,119.888L187.59,418.22c-8.254,8.253-18.633,13.882-29.847,16.391c9.363,6.635,20.608,10.28,32.235,10.28l0,0 c14.788,0,28.973-5.876,39.43-16.333L512,145.966L485.921,119.888z"></path> </g> </g></svg>
                      </div>
                      :
                      <div className="box btn" onClick={() => check(item.id)}>

                      </div>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <button style={{ margin: '20px' }} onClick={checkout}>Check out</button>
      </div>
    </>
  )
}

export default Order;