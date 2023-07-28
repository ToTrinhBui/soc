import React, { useEffect, useState } from "react";
import axios from 'axios';
import Navbar from "../components/Navbar";

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/product')
      .then(response => {
        setItems(response.data.data)
        setData(response.data.data)
      })
      .catch(error =>
        console.error(error)
      );
  }, []);

  function handleSearchTermChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleSubmit() {
    const filterItem = data.filter(product => product.id.toString() === searchTerm || product.productName === searchTerm)
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

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Check inventory</h2>

        <div className="search-part">
          <div className="search">
            <img src="../images/search.png" alt="search-icon" />
            <input id="search-term-input" type="text" value={searchTerm} onChange={handleSearchTermChange} placeholder="Nhập tên hoặc mã hàng hóa cần tìm" />
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
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.productName}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}

export default Inventory