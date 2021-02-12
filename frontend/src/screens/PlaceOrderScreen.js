import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
export default function PlaceOrderScreen(props) {
  
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    props.history.push('/payment');
  }
 

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
 
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * (c.price + c.size), 0)
  );
  cart.shippingPrice = cart.itemsPrice > 300 ? toPrice(0) : toPrice(30);
  cart.taxPrice = toPrice(0.0 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };
  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);
  let Shi;
  if ((330) - cart.totalPrice.toFixed(2) >=0) {
   Shi = <h1 className='shipi'>  רק עוד ₪{330-cart.totalPrice.toFixed(2)} למשלוח אקספרס חינם!!</h1>
  }
  else { 
   Shi = <h1 className='shipi' >המשלוח עלינו !!!</h1>
  }
  console.log("ITEMs", cart.cartItems);
  let dan;
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>משלוח</h2>
                <p>
            
                  <strong>שם:</strong> {cart.shippingAddress.fullName} <br />
                  <strong>כתובת: </strong> {cart.shippingAddress.address},
                  {cart.shippingAddress.city}, <br></br>  <strong>מספר דירה: </strong>{cart.shippingAddress.apartment}, <br></br>  <strong>מיקוד: </strong>{cart.shippingAddress.postalCode}
                  <br></br>  <strong>מדינה: </strong>{cart.shippingAddress.country}<br></br><strong>מספר פלאפון: </strong>{cart.shippingAddress.phone},
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>תשלום</h2>
              
                <p>
                  <strong>שיטה:</strong> {cart.paymentMethod}
                 
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>פריטי הזמנה</h2>
                <ul>
                  {cart.cartItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                            
                          </Link>
                          
                        </div>
             

                        <div>
                        כמות: {item.qty}<br></br>
                        מידה:     {item.size ===0 ? (
                  dan = '17X21'
                ) : item.size ===20 ?(
                  dan =  '25X30'

                ): (  '50X70'

                )}{/*{item.size}*/}<br></br>
                         מחיר: ₪{item.qty * (item.price + item.size)}
                          </div>
                          <div>
                          <a  className='up' href="#top">
            <ArrowUpwardIcon  fontSize ='large'> </ArrowUpwardIcon>
            </a>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul >
              <li>
                <h2>סיכום הזמנה</h2>
              </li>
              <li>
                <div className="row">
                  <div>פריטים</div>
                  <div>₪{cart.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>דמי משלוח</div>
                  <div>₪{cart.shippingPrice.toFixed(2)}</div>
                </div>
              </li>

   
              <li>
                <div className="row">
                  <div className='line'>
              
                    <strong> סה"כ לתשלום</strong>
                  </div>
                  <div>
                    <strong className='line'>₪{cart.totalPrice.toFixed(2)}</strong>
                
                  </div>
                </div>
            
              </li>
              
              <li>
                <button
                  type="button"
                  onClick={placeOrderHandler}
                  className="primary block"
                  disabled={cart.cartItems.length === 0}
                    
                >
                  Place Order
                </button>
              </li>
              
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </ul>
            
          </div>
          {Shi}
        </div>
        
      </div>
    </div>
  );
}

{/*import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function PlaceOrderScreen(props) {
  const shipr = () => {}
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    props.history.push('/payment');
  }
 
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
 
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 300 ? toPrice(0) : toPrice(30);
  cart.taxPrice = toPrice(0.0 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };
  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>משלוח</h2>
                <p>
                  <strong>שם:</strong> {cart.shippingAddress.fullName} <br />
                  <strong>כתובת: </strong> {cart.shippingAddress.address},
                  {cart.shippingAddress.city}, <br></br>  <strong>מספר דירה: </strong>{cart.shippingAddress.apartment}, <br></br>  <strong>מיקוד: </strong>{cart.shippingAddress.postalCode}
                  <br></br>  <strong>מדינה: </strong>{cart.shippingAddress.country}<br></br><strong>מספר פלאפון: </strong>{cart.shippingAddress.phone},
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>תשלום</h2>
                <p>
                  <strong>שיטה:</strong> {cart.paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>פריטי הזמנה</h2>
                <ul>
                  {cart.cartItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                            
                          </Link>
                          
                        </div>

                        <div>
                          {item.qty}X{item.price} = ₪{item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul >
              <li>
                <h2>סיכום הזמנה</h2>
              </li>
              <li>
                <div className="row">
                  <div>פריטים</div>
                  <div>₪{cart.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>דמי משלוח</div>
                  <div>₪{cart.shippingPrice.toFixed(2)}</div>
                </div>
              </li>

   
              <li>
                <div className="row">
                  <div className='line'>
              
                    <strong> סה"כ לתשלום</strong>
                  </div>
                  <div>
                    <strong className='line'>₪{cart.totalPrice.toFixed(2)}</strong>
                
                  </div>
                </div>
            
              </li>
              <li>
                <button
                  type="button"
                  onClick={placeOrderHandler}
                  className="primary block"
                  disabled={cart.cartItems.length === 0}
                    
                >
                  Place Order
                </button>
              </li>
              
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </ul>
          </div>
          <div className='shipi'>
         
            <h1>נותרו רק  עוד ₪{330 - cart.totalPrice.toFixed(2)} למשלוח אקספרס חינם</h1>
        
          </div>
        </div>
      </div>
    </div>
  );
}
*/}