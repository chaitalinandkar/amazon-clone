import React from 'react'
import './CSS/Order.css'
import moment from "moment"
import CheckoutProduct from './CheckoutProduct'
import { NumericFormat } from 'react-number-format'


function Order({order}) {
  return (
    <div className='order'>
      <h2>Order</h2>
      <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
      <p className='order__id'>
        <small>{order.id}</small>
      </p>
      {order.data.basket?.map((item, index) => (
        <CheckoutProduct
          key={index}
          id={item.id}
          title={item.title}
          rating={item.rating}
          image={item.image}
          price={item.price}
          hideButton
        />
      ))}
      <NumericFormat
        renderText={(value) => (
          <div>
            <h4 className='order__total'>Order Total: {value}</h4>
          </div>
        )}
        decimalScale={2}
        value={order.data.amount / 100}
        displayType={"text"}
        thousandSeparator={true}
        prefix={'$'}
      />
    </div>
  )
}

export default Order