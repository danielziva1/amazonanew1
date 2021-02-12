


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

export default function CartScreen(props) {

  const productId = props.match.params.id;
 let details = props.location.search ? props.location.search.split('&')[1]
 : 1;
 
  const size =details ? Number(details.split('=')[1])
  : 1;
  
  details = props.location.search ? props.location.search.split('&')[0]
  : 1;
  
  const qty = details
    ? Number(details.split('=')[1])
    : 1;

    const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
    const dispatch = useDispatch();
    useEffect(() => {
      if (productId) {
        dispatch(addToCart(productId, qty, size ));
      }
    }, [dispatch, productId, qty,size ]);
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
        // delete action
      };


      const checkoutHandler = () => {
        props.history.push('/signin?redirect=shipping');
      };
      let dan ;
      
  return (
    
    <div className="row top">

    <div className="col-222">
    
      <h1 >עגלת מוצרים</h1>
      {cartItems.length === 0 ? (
        <MessageBox>
          עגלת קניות ריקה. <Link to="/">המשך קניות</Link>
        </MessageBox>
      ) : (
        <ul>
          
          {cartItems.map((item) => (
            <li key={item.product}>
              <div className="row">
                <div>
                  
                  <img
                    src={item.image}
                    alt={item.name}
                    className="small"
                  ></img>
                </div>
                
                <div className="min-32">
                  <Link className='coli' to={`/product/${item.product}`}>{item.name}</Link>
                </div>
              
                  
               
                <div >
                  
                  <select
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(
                        addToCart(item.product,  Number(e.target.value))
                      )
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <h1 className='coli'>מחיר:</h1>
                
                <div> ₪{(item.size +item.price)*(item.qty)}</div>

               <h1 className='coli'>גודל תמונה:</h1>
               {item.size ===0 ? (
                  dan = '17X21'
                ) : item.size ===20 ?(
                  dan =  '25X30'

                ): (  '50X70'

                )}
          
                <div>
          
                  <DeleteIcon  fontSize="large" type="button" onClick={() => removeFromCartHandler(item.product)}></DeleteIcon>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
    <div className="col-1">
      <div className="card card-body">
        <ul>
          <li>
            <h2>
              סה"כ ({cartItems.reduce((a, c) => a + c.qty, 0)} מוצרים) : ₪
              {cartItems.reduce((a, c,) => a +(c.size+c.price) * c.qty, 0)}
            </h2>
            
          </li>
          <li>
            <button
              type="button"
              onClick={checkoutHandler}
              className="primary block"
              disabled={cartItems.length === 0}
            >
              התקדם לביצוע הרכישה 
            </button>
          </li>
          <a  className='up' href="#top">
            <ArrowUpwardIcon  fontSize ='large'> </ArrowUpwardIcon>
            </a>
        </ul>
      </div>
    </div>
    
  </div>
);
}


{/*


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

export default function CartScreen(props) {

  const productId = props.match.params.id;
 let details = props.location.search ? props.location.search.split('&')[1]
 : 1;
 
  const size =details ? Number(details.split('=')[1])
  : 1;
  
  details = props.location.search ? props.location.search.split('&')[0]
  : 1;
  
  const qty = details
    ? Number(details.split('=')[1])
    : 1;

    const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
    const dispatch = useDispatch();
    useEffect(() => {
      if (productId) {
        dispatch(addToCart(productId, qty, size ));
      }
    }, [dispatch, productId, qty,size ]);
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
        // delete action
      };


      const checkoutHandler = () => {
        props.history.push('/signin?redirect=shipping');
      };
      let dan ;
      
  return (
    
    <div className="row top">

    <div className="col-2">
    
      <h1 >עגלת מוצרים</h1>
      {cartItems.length === 0 ? (
        <MessageBox>
          עגלת קניות ריקה. <Link to="/">המשך קניות</Link>
        </MessageBox>
      ) : (
        <ul>
          
          {cartItems.map((item) => (
            <li key={item.product}>
              <div className="row">
                <div>
                  
                  <img
                    src={item.image}
                    alt={item.name}
                    className="small"
                  ></img>
                </div>
                <div className='q'> גודל התמונה</div>
                <div className='w'>מחיר</div>
                <div className='e'>כמות</div>

                <div className="min-32">
                  <Link className='coli' to={`/product/${item.product}`}>{item.name}</Link>
                </div>
              
                  
               
                <div >
                  
                  <select
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(
                        addToCart(item.product,  Number(e.target.value))
                      )
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
           
                
                <div> ₪{(item.size +item.price)*(item.qty)}</div>

       
               {item.size ===0 ? (
                  dan = '17X21'
                ) : item.size ===20 ?(
                  dan =  '25X30'

                ): (  '50X70'

                )}
          
                <div>
          
                  <DeleteIcon  fontSize="large" type="button" onClick={() => removeFromCartHandler(item.product)}></DeleteIcon>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
    <div className="col-1">
      <div className="card card-body">
        <ul>
          <li>
            <h2>
              סה"כ ({cartItems.reduce((a, c) => a + c.qty, 0)} מוצרים) : ₪
              {cartItems.reduce((a, c) => a +(c.size+c.price) * c.qty, 0)}
            </h2>
            
          </li>
          <li>
            <button
              type="button"
              onClick={checkoutHandler}
              className="primary block"
              disabled={cartItems.length === 0}
            >
              התקדם לביצוע הרכישה 
            </button>
          </li>
          <a  className='up' href="#top">
            <ArrowUpwardIcon  fontSize ='large'> </ArrowUpwardIcon>
            </a>
        </ul>
      </div>
    </div>
    
  </div>
);
}
*/}

{/*
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';
import DeleteIcon from '@material-ui/icons/Delete';

export default function CartScreen(props) {
  const productId = props.match.params.id;

  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;
    const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
    const dispatch = useDispatch();
    useEffect(() => {
      if (productId) {
        dispatch(addToCart(productId, qty));
      }
    }, [dispatch, productId, qty]);
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
        // delete action
      };
    
      const checkoutHandler = () => {
        props.history.push('/signin?redirect=shipping');
      };
  return (
    <div className="row top">
    <div className="col-2">
      <h1>עגלת מוצרים</h1>
      {cartItems.length === 0 ? (
        <MessageBox>
          עגלת קניות ריקה. <Link to="/">המשך קניות</Link>
        </MessageBox>
      ) : (
        <ul>
          {cartItems.map((item) => (
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
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                </div>
                <div>
                  <select
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(
                        addToCart(item.product, Number(e.target.value))
                      )
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                  
                
                <div>
                  <select
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(
                        addToCart(item.product, Number(e.target.value))
                      )
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div>₪{item.price}</div>
                <div>
                 
                  <DeleteIcon  fontSize="large" type="button" onClick={() => removeFromCartHandler(item.product)}></DeleteIcon>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
    <div className="col-1">
      <div className="card card-body">
        <ul>
          <li>
            <h2>
              סה"כ ({cartItems.reduce((a, c) => a + c.qty, 0)} מוצרים) : ₪
              {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
            </h2>
          </li>
          <li>
            <button
              type="button"
              onClick={checkoutHandler}
              className="primary block"
              disabled={cartItems.length === 0}
            >
              התקדם לביצוע הרכישה 
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
);
}
*/}


{/*
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';
import DeleteIcon from '@material-ui/icons/Delete';

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;
    const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
    const dispatch = useDispatch();
    useEffect(() => {
      if (productId) {
        dispatch(addToCart(productId, qty));
      }
    }, [dispatch, productId, qty]);
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
        // delete action
      };
    
      const checkoutHandler = () => {
        props.history.push('/signin?redirect=shipping');
      };
  return (
    <div className="row top">
    <div className="col-2">
      <h1>עגלת מוצרים</h1>
      {cartItems.length === 0 ? (
        <MessageBox>
          עגלת קניות ריקה. <Link to="/">המשך קניות</Link>
        </MessageBox>
      ) : (
        <ul>
          {cartItems.map((item) => (
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
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                </div>
      
                  
                
                <div>
                  <select
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(
                        addToCart(item.product, Number(e.target.value))
                      )
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div>₪{item.price}</div>
                <div>
                 
                  <DeleteIcon  fontSize="large" type="button" onClick={() => removeFromCartHandler(item.product)}></DeleteIcon>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
    <div className="col-1">
      <div className="card card-body">
        <ul>
          <li>
            <h2>
              סה"כ ({cartItems.reduce((a, c) => a + c.qty, 0)} מוצרים) : ₪
              {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
            </h2>
          </li>
          <li>
            <button
              type="button"
              onClick={checkoutHandler}
              className="primary block"
              disabled={cartItems.length === 0}
            >
              התקדם לביצוע הרכישה 
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
);
}


*/}