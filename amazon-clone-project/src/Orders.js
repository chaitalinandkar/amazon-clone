import React, { useEffect, useState } from 'react'
import "./CSS/Orders.css"
import Header from './Header'
import { db } from './firebase';
import { useStateValue } from './StateProvider';
import Order from './Order';

function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [order, setOrder] = useState();

  useEffect(() => {
    if (user) {
      db
        .collection('users')
        .doc(user?.uid)
        .collection('orders')
        .orderBy('created', 'desc')
        .onSnapshot(snapshot => (
          setOrder(snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          })))
        ))
    } else {
      setOrder([])
    }
  }, [user])
  return (
    <div className='orders'>
      <Header />
      <div className='orders__container'>
        <h1>Your Orders</h1>
          <div className='orders__order'>
            {order?.map(order => (
              <Order order={order} />
            ))}
          </div>
      </div>
      
    </div>
  )
}

export default Orders