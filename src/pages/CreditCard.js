import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function CreditCard() {
    const [cardData, setCardData] = useState({
        cardNumber: "",
        cardHolder: "",
        expiredAt: "",
    });
    const [errorMessage, setErrorMessage] = useState(null);
    const { orderId } = useParams();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            const response = axios.post(`http://localhost:8080/payment/${orderId}`, {
                cardNumber: cardData.cardNumber,
                cardHolder: cardData.cardHolder,
                expiredAt: cardData.expiredAt,
            });
            const res = response.data;
            console.log(res)
            navigate(`/check-order`);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCardData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <>
            <Navbar/>
            <div className="credit-card">
                <h2>Enter your credit card information</h2>
                <form className="card-form" style={{ margin: '20px' }} onSubmit={handleSubmit}>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <div className="card-input">
                        <div className="part">
                            <label>Card Number:</label>
                            <input type="text" name='cardNumber' value={cardData.cardNumber} onChange={handleChange} placeholder="Enter" />
                        </div>
                        <div className="part">
                            <label>Card Holder:</label>
                            <input type="text" name='cardHolder' value={cardData.cardHolder} onChange={handleChange} placeholder="Enter" />
                        </div>
                        <div className="part">
                            <label>Expired At:</label>
                            <input type="date" name='expiredAt' value={cardData.expiredAt} onChange={handleChange} placeholder="Enter" />
                        </div>
                    </div>
                    <button type="submit">Continue</button>
                </form>
            </div>
        </>
    )
}