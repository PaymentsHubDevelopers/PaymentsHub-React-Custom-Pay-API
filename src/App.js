import './App.css';
import { useState } from 'react';

function App() {

  const [cardNumber, setCardNumber] = useState("4111111111111111");
  const [CVV, setCVV] = useState("123");
  const [cardExpiryDate, setCardExpiryDate] = useState("2501");
  const [message, setMessage] = useState("")
  const amount = 8.99;

  const sendPaymentRequest = () => {
    setMessage("")
    fetch("http://localhost:8080/pay", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cardNumber,
        CVV,
        cardExpiryDate,
        amount
      })
    })
      .then(r => r.text())
      .then(r => {
        console.log(r)

        if (r.startsWith("APPROVAL")) {
          setMessage("Payment successful!")
        }
      })
  }

  return (
    <div className="App">
      <div className="mainContainer">
        <div className='title'>Custom Pay API<div></div>Payment Form</div>
        <div className="inputGroup">
          <label htmlFor="cardNumber">Enter Card Number</label>
          <input id="cardNumber" type="number" min={1000000000000000} max={9999999999999999} value={cardNumber} onChange={ev => setCardNumber(ev.target.value)} />
        </div>
        <div className="inputGroup">
          <label htmlFor="CVV">Enter Card CVV</label>
          <input type='number' max={999} min={100} id="CVV" value={CVV} onChange={ev => setCVV(ev.target.value)} />
        </div>
        <div className="inputGroup">
          <label htmlFor="cardExpiryDate">Enter Card Expiry Date as YYMM</label>
          <input type='number' max={9912} min={2501} id="cardExpiryDate" value={cardExpiryDate} onChange={ev => setCardExpiryDate(ev.target.value)} />
        </div>
        <div className="inputGroup">
          <label htmlFor="amount">Your Total</label>
          <input id="amount" defaultValue={"$" + amount} disabled />
        </div>
        <div>
          <button className='submitButton' onClick={sendPaymentRequest}>Pay Now</button>
        </div>
      </div>

      <div className="result">
        {message}
      </div>
    </div>
  );
}

export default App;
