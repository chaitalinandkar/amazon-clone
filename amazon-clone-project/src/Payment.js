
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import "./CSS/Payment.css";
import Header from './Header';
import { useStateValue } from './StateProvider';
import { NumericFormat } from 'react-number-format';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { getBasketTotal } from './reducer'; 
// import { getTaxes } from './reducer';
// import { getTotalAmount } from './reducer';
import axios from './axios';

function Payment() {

  const [{ basket, user }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  
  //for checkout address
  const [check, setCheck] = useState(false);
  const [state, setState] = useState({
    deliveryFirstName: "",
    deliveryLastName: "",
    deliveryAddress: "",
    deliveryPhone: "",
  })

  const onChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  //to catch error
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [clientSecret, setClientSecret] = useState(true);

  //whenever the basket changes it will make below request and it will update the special stripe secret
  // which allows us to charge a customer the correct amount
  useEffect(() => {
    //generate the special stripe secrect which allows us to charge a customer
    const getClientSecret = async() => {
      const response = await axios({
        method: 'post',
        //stripe expects the total in currencies subunits
        url: `/payment/create?total=${getBasketTotal(basket) * 100}`
      });
      setClientSecret(response.data.clientSecret);
    }
    getClientSecret();
  }, [basket])

  console.log('THE SECRET IS >>>>>', clientSecret);


  const handleSubmit = async(e) => {
    // styling the stripe stuff
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    }).then(({ paymentIntent }) => {
      //paymentIntent = payment confirmation
      setSucceeded(true)
      setError(null)
      setProcessing(false)
      dispatch({
        type: 'EMPTY_BASKET'
      })
      // navigate('/orders', {replace:true})
      navigate("/orders")
    })
  }



  const handleChange = e => {
    //Listen for changes in the CardElement
    //and display any error as the customer types their card details
    setDisabled(e.error);
    setError(e.error ? e.error.message : "");
  }

  
  return (
    <div className='payment'>

      <Header />
      
      <div className='payment__container'>
        <h1>
          Checkout(
          {basket?.length} items
          )
        </h1>

        {/* payment-section ------- review itemss */}
        <div className='payment__section mt-3'>
          
          <div className='payment__title'>
            <h3>Review items : </h3>
          </div>
          <div className='review__items'>
            
            {basket.map((item, index) => (
              <CheckoutProduct
                key={index}
                id={item.id}
                title={item.title}
                rating={item.rating}
                image={item.image}
                price={item.price}
              />
            ))}
          </div>
        </div>

        {/* payment-section ------ delivery address */}
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Delivery Address : </h3>
          </div>
          <div className='payment__address'>
            <p className='fs-5'><strong>{user?.email}</strong></p>
            
            <form className='Delivery__address__form'>
              <input type='text' className='input-font' name='deliveryFirstName' placeholder='First Name' autoComplete='{false}' onChange={onChange}></input>
              <input type='text' className='input-font' name='deliveryLastName' placeholder='Last Name' autoComplete='{false}' onChange={onChange}></input>
              <input type='text' className='input-font' name='deliveryAddress' placeholder='Address' autoComplete='{false}' onChange={onChange}></input>
              <input type='text' className='input-font' name='deliveryPhone' placeholder='Phone Number' autoComplete='{false}' onChange={onChange}></input>
            </form>

          </div>
        </div>
        
        {/* payment-section ------ billing address */}
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Billing Address : </h3>
          </div>
          <div className='payment__address'>
            {/* For billing address */}
            <form className=''>
              <div className='check'>
                <label htmlFor='checkbox'>Same as Delivery Address</label>
                <input type='checkbox' className='ms-2' value='false' name='checkbox' onChange={() => setCheck(!check)}></input>
              </div>
              <div className='billing__address_form mt-3'>
                <input type='text' className='input-font' name='billingFirstName' placeholder='First Name' autoComplete='{false}' value={check ? state.deliveryFirstName : ""}></input>
                <input type='text' className='input-font' name='billingLastName' placeholder='Last Name' autoComplete='{false}' value={check ? state.deliveryLastName : ""}></input>
                <input type='text' className='input-font' name='billingAddress' placeholder='Address' autoComplete='{false}' value={check ? state.deliveryAddress : ""}></input>
                <input type='text' className='input-font' name='billingPhone' placeholder='Phone' autoComplete='{false}' value={check ? state.deliveryPhone : ""}></input>
              </div>
            </form>
          </div>
        </div>


        {/* payment-section ----------- payment-method */}
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Payment Method : </h3>
          </div>
          <div className='payment__method__section'>

            <div className='payment__info__stripe'>
              <div className='payment__details'>
                {/* stripe */}
                <form onSubmit={handleSubmit} >
                  <CardElement onChange={handleChange}  className='mt-2 mb-3'/>
                  <div className='payment__priceContainer'>
                    <NumericFormat
                      renderText={(value) => (
                        <div>
                          <h4>Order Total: <strong>{value}</strong></h4>
                        </div>
                      )}
                      decimalScale={2}
                      value={getBasketTotal(basket)}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={'$'}
                    />
                    <button disabled={processing || disabled || succeeded}>
                      <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                    </button>
                  </div>
                  {/* If this is an error only then show the div with the error in */}
                  {error && <div>{error}</div>}
                </form>
              </div>
            </div>
            
          </div>
          
        </div>
      </div>
      
    </div>
  )
}

export default Payment;