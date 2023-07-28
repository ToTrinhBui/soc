import React, { useEffect, useState } from "react";
import axios from 'axios';
import Navbar from "../components/Navbar";

const CheckOrder = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [data, setData] = useState([]);
  const userID = localStorage.getItem('userID') || null;

  useEffect(() => {
    axios.get(`http://localhost:8080/order/${userID}`)
      .then(response => {
        setItems(response.data.data);
        setData(response.data.data);
        console.log(response.data.data);
      })
      .catch(error =>
        console.error(error)
      );
  }, []);

  function handleSearchTermChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleSubmit() {
    const filterItem = data.filter(product => product.id.toString() === searchTerm)
    if (filterItem.length === 0) {
      setErrorMessage("Items not found");
      setItems([]);
    } else {
      setItems(filterItem);
      setErrorMessage(null);
    }
  }

  function handleClick() {
    setErrorMessage(null);
    setItems(data);
    setSearchTerm('');
  }

  if (userID) {
    return (
      <>
        <Navbar />
        <div className="container">
          <h2>Check Order Status</h2>

          <div className="search-part">
            <div className="search">
              <img src="../images/search.png" alt="search-icon" />
              <input id="search-term-input" type="text" value={searchTerm} onChange={handleSearchTermChange} placeholder="Nhập mã đặt đơn của bạn" />
            </div>
            <button onClick={handleSubmit}>Search</button>
            <button onClick={handleClick}>Reload</button>
          </div>

          {errorMessage && <div className="error-message">{errorMessage}</div>}

          {items.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.products.length}</td>
                    <td>{item.totalPrice}</td>
                    <td>{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </>
    )
  }
  return (
    <>
      <Navbar />
      <div div className="require" style={{ margin: '50px' }}> Maybe you need to login first</div >
    </>
  )

}

export default CheckOrder