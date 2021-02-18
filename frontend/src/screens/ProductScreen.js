
 import React, { useEffect, useState } from 'react';
 import { useDispatch, useSelector } from 'react-redux';
 import { Link } from 'react-router-dom';
 import { createReview, detailsProduct } from '../actions/productActions';
 import LoadingBox from '../components/LoadingBox';
 import MessageBox from '../components/MessageBox';
 import Rating from '../components/Rating';
import { CART_ADD_ITEM } from '../constants/cartConstants';
 import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants'; 
 import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
 
 
 export default function ProductScreen(props) {

  
   const dispatch = useDispatch();
   const productId = props.match.params.id;
   const [qty, setQty] = useState(1);
   const [size, setSize] = useState(0);
   const productDetails = useSelector((state) => state.productDetails);
   const { loading, error, product } = productDetails;
   const userSignin = useSelector((state) => state.userSignin);
   const { userInfo } = userSignin;
 
   const productReviewCreate = useSelector((state) => state.productReviewCreate);
   const {
     loading: loadingReviewCreate,
     error: errorReviewCreate,
     success: successReviewCreate,
   } = productReviewCreate;
 
   const [rating, setRating] = useState(0);
   const [comment, setComment] = useState('');
   useEffect(() => {
    if (successReviewCreate) {
      window.alert('Review Submitted Successfully');
      setRating('');
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
     dispatch(detailsProduct(productId));
    }, [dispatch, productId, successReviewCreate]);
   const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}&size=${size}`);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(productId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert('Please enter comment and rating');
    }
  };

  const sizeArray =[{ key :'1', value:"0", content:"17x21"},{ key :'2', value:"20", content:"25x30"},{ key :'3', value:"80", content:"50x70"}]
  let Shi = 0;
  if (size ==='0') {
   Shi =0
  }
  else if (size ==='20') { 
   Shi = 20
  }
  else if  (size ==='80')(
    Shi = 80
  )
  else {
    Shi=0
  }
   return (
     <div  >
  
      
    {loading ? (
         <LoadingBox></LoadingBox>
       ) : error ? (
         <MessageBox variant="danger">{error}</MessageBox>
       ) : (
         <div>
           
           <Link className='mor' to="/">בחזרה לעמוד הבית</Link>
        
           <div className="row top">
             <div className="col-2">
               
               <img
                 className="large"
                 src={product.image}
                 alt={product.name}
               ></img>
             </div>
             <div className="col-1">
      
     
               <ul className ='col-22'>
                 <li >
                   <h1 className='zomi'>{product.name}</h1>
                 </li>
            
                 <li>   <div className='tryinggg'> ₪{product.price}</div>
           
                    </li>
                 <li>
                 <h2 className='d'>   תיאור המוצר : </h2>
                   <p>{product.description}</p>
                 </li>

                 <li>
                   <Rating
                     rating={product.rating}  
                     numReviews={product.numReviews}
                   ></Rating>
                 </li>
               </ul>
             </div>
             <div className="col-1">
               <div className="card card-body">
                 
                 <ul>
              

                   <li>
                     <div className="row">
                       <div>מחיר</div>
                       <div className="price">₪{ (  Shi + product.price)*qty}</div>
                       <></>
                     </div>
                   </li>
                   <li>
                     <div className="row">
                       <div>סטטוס</div>
                       <div>
                         {product.countInStock > 0 ? (
                           <span className="success">זמין במלאי</span>
                         ) : (
                           <span className="danger">לא זמין במלאי</span>
                         )}
                       </div>
                     </div>
                   </li>
                   {product.countInStock > 0 && (
                    <>
                    
                      <li>

                        <div className="row">
        

                          <div>כמות</div>
                        
                          <div>
                            <select className='min-31'
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                           
                           </div>

                        </div>
                        <div className="row">
                           <div  >גודל התמונה</div>
                            <select
                              value={size}
                              onChange={(e) => setSize(e.target.value)}
                            >
                              {sizeArray.map(
                                (x) => (
                                  <option key={x.key} value={x.value}>
                                    {x.content}
                                  </option>
                                )
                              )}
                            </select>
                            </div>  
              
                      </li>
                      <li>
                        
                        <button
                          onClick={addToCartHandler}
                          className="primary block"
                        >
                          הוסף לעגלת קניות
                        </button>
    
                      </li>
                   
                    </>
                    
                  )}
                </ul>
                <a  className='up' href="#top">
            <ArrowUpwardIcon  fontSize ='large'> </ArrowUpwardIcon>
            </a>
              </div>
            </div>
            
          </div>
     
          <div className='ed'>
 
            <h2 className='edd' id="reviews">דירוג</h2>
            {product.reviews.length === 0 && (
              <MessageBox>המוצר עדיין לא דורג</MessageBox>
            )}
            <ul>
              {product.reviews.map((review) => (
                <li key={review._id}>
            
                  <div class="container darker">
                  <strong>{review.name}</strong>
                  <Rating rating={review.rating} caption=" "></Rating>
<p >{review.comment}</p>

<span class="time-left">{review.createdAt.substring(0, 10)}</span>
</div>
                </li>
          
              ))}

              <li>
                {userInfo ? (
                  <form className="form" onSubmit={submitHandler}>
                    <div>
                      <h2>כתוב ביקורת לקוחות</h2>
                    </div>
                    <div>
                      <label htmlFor="rating">דירוג</label>
                      <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1- Poor</option>
                        <option value="2">2- Fair</option>
                        <option value="3">3- Good</option>
                        <option value="4">4- Very good</option>
                        <option value="5">5- Excelent</option>
                      </select>
                    </div>
                    <div >
                      <label htmlFor="comment">תגובה</label>
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <label />
                      <button className="primary" type="submit">
                        לחץ
                      </button>
                    </div>
                    <div>
                      {loadingReviewCreate && <LoadingBox></LoadingBox>}
                      {errorReviewCreate && (
                        <MessageBox variant="danger">
                          {errorReviewCreate}
                        </MessageBox>
                      )}
                    </div>
                
                  </form>
                ) : (
                  <MessageBox>
                    Please <Link to="/signin">Sign In</Link> to write a review
                  </MessageBox>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}



{/*
 import React, { useEffect, useState } from 'react';
 import { useDispatch, useSelector } from 'react-redux';
 import { Link } from 'react-router-dom';
 import { createReview, detailsProduct } from '../actions/productActions';
 import LoadingBox from '../components/LoadingBox';
 import MessageBox from '../components/MessageBox';
 import Rating from '../components/Rating';
 import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants'; 
 
 
 
 export default function ProductScreen(props) {

  
   const dispatch = useDispatch();
   const productId = props.match.params.id;
   const [qty, setQty] = useState(1);
   const [size, setSize] = useState(0);
   const productDetails = useSelector((state) => state.productDetails);
   const { loading, error, product } = productDetails;
   const userSignin = useSelector((state) => state.userSignin);
   const { userInfo } = userSignin;
 
   const productReviewCreate = useSelector((state) => state.productReviewCreate);
   const {
     loading: loadingReviewCreate,
     error: errorReviewCreate,
     success: successReviewCreate,
   } = productReviewCreate;
 
   const [rating, setRating] = useState(0);
   const [comment, setComment] = useState('');
   useEffect(() => {
    if (successReviewCreate) {
      window.alert('Review Submitted Successfully');
      setRating('');
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
     dispatch(detailsProduct(productId));
    }, [dispatch, productId, successReviewCreate]);
   const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}&size=${size}`);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(productId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert('Please enter comment and rating');
    }
  };

  const sizeArray =[{ key :'1', value:"0", content:"17x21"},{ key :'2', value:"20", content:"25x30"},{ key :'3', value:"80", content:"50x70"}]

   return (
     <div  >
  
      
    {loading ? (
         <LoadingBox></LoadingBox>
       ) : error ? (
         <MessageBox variant="danger">{error}</MessageBox>
       ) : (
         <div>
           
           <Link className='mor' to="/">בחזרה לעמוד הבית</Link>
           
           <div className="row top">
             <div className="col-2">
               <img
                 className="large"
                 src={product.image}
                 alt={product.name}
               ></img>
             </div>
             <div className="col-1">
      
     
               <ul>
                 <li>
                   <h1>{product.name}</h1>
                 </li>
                 <li>
                   <Rating
                     rating={product.rating}
                     numReviews={product.numReviews}
                   ></Rating>
                 </li>
                 <li> <h2 className='d'>מחיר : </h2>
                    ₪{product.price}
                    </li>
                 <li>
                 <h2 className='d'>   תיאור המוצר : </h2>
                   <p>{product.description}</p>
                 </li>
          
                 
               </ul>
             </div>
             <div className="col-1">
               <div className="card card-body">
                 
                 <ul>
              

                   <li>
                     <div className="row">
                       <div>מחיר</div>
                       <div className="price">₪{  product.price*qty}</div>
                       <></>
                     </div>
                   </li>
                   <li>
                     <div className="row">
                       <div>סטטוס</div>
                       <div>
                         {product.countInStock > 0 ? (
                           <span className="success">במלאי</span>
                         ) : (
                           <span className="danger">לא זמין במלאי</span>
                         )}
                       </div>
                     </div>
                   </li>
                   {product.countInStock > 0 && (
                    <>
                    
                      <li>

                        <div className="row">


                          <div>כמות</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                           
                          </div>
                          <div>גודל התמונה</div>
                            <select
                              value={size}
                              onChange={(e) => setSize(e.target.value)}
                            >
                              {sizeArray.map(
                                (x) => (
                                  <option key={x.key} value={x.value}>
                                    {x.content}
                                  </option>
                                )
                              )}
                            </select>
                        </div>
                        
                      </li>
                      <li>
                        
                        <button
                          onClick={addToCartHandler}
                          className="primary block"
                        >
                          הוסף לעגלת קניות
                        </button>
    
                      </li>
                   
                    </>
                    
                  )}
                </ul>
                
              </div>
            </div>
            
          </div>
     
          <div >
 
            <h2 id="reviews">דירוג</h2>
            {product.reviews.length === 0 && (
              <MessageBox>There is no review</MessageBox>
            )}
            <ul>
              {product.reviews.map((review) => (
                <li key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating rating={review.rating} caption=" "></Rating>
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </li>
              ))}
              <li>
                {userInfo ? (
                  <form className="form" onSubmit={submitHandler}>
                    <div>
                      <h2>כתוב ביקורת לקוחות</h2>
                    </div>
                    <div>
                      <label htmlFor="rating">דירוג</label>
                      <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1- Poor</option>
                        <option value="2">2- Fair</option>
                        <option value="3">3- Good</option>
                        <option value="4">4- Very good</option>
                        <option value="5">5- Excelent</option>
                      </select>
                    </div>
                    <div >
                      <label htmlFor="comment">תגובה</label>
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <label />
                      <button className="primary" type="submit">
                        לחץ
                      </button>
                    </div>
                    <div>
                      {loadingReviewCreate && <LoadingBox></LoadingBox>}
                      {errorReviewCreate && (
                        <MessageBox variant="danger">
                          {errorReviewCreate}
                        </MessageBox>
                      )}
                    </div>
                  </form>
                ) : (
                  <MessageBox>
                    Please <Link to="/signin">Sign In</Link> to write a review
                  </MessageBox>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
*/}

{/*
 import React, { useEffect, useState } from 'react';
 import { useDispatch, useSelector } from 'react-redux';
 import { Link } from 'react-router-dom';
 import { createReview, detailsProduct } from '../actions/productActions';
 import LoadingBox from '../components/LoadingBox';
 import MessageBox from '../components/MessageBox';
 import Rating from '../components/Rating';
 import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants'; 
 
 
 
 export default function ProductScreen(props) {

  
   const dispatch = useDispatch();
   const productId = props.match.params.id;
   const [qty, setQty] = useState(1);
   const [size, setSize] = useState(1);
   const productDetails = useSelector((state) => state.productDetails);
   const { loading, error, product } = productDetails;
   const userSignin = useSelector((state) => state.userSignin);
   const { userInfo } = userSignin;
 
   const productReviewCreate = useSelector((state) => state.productReviewCreate);
   const {
     loading: loadingReviewCreate,
     error: errorReviewCreate,
     success: successReviewCreate,
   } = productReviewCreate;
 
   const [rating, setRating] = useState(0);
   const [comment, setComment] = useState('');
   useEffect(() => {
    if (successReviewCreate) {
      window.alert('Review Submitted Successfully');
      setRating('');
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
     dispatch(detailsProduct(productId));
    }, [dispatch, productId, successReviewCreate]);
   const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}&size=${size}`);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(productId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert('Please enter comment and rating');
    }
  };

  const sizeArray =[{ key :'1', value:"1", content:"10x10"},{ key :'2', value:"50", content:"20x20"},{ key :'3', value:"100", content:"30x30"}]

   return (
     <div  >
  
      
    {loading ? (
         <LoadingBox></LoadingBox>
       ) : error ? (
         <MessageBox variant="danger">{error}</MessageBox>
       ) : (
         <div>
           
           <Link className='mor' to="/">בחזרה לעמוד הבית</Link>
           
           <div className="row top">
             <div className="col-2">
               <img
                 className="large"
                 src={product.image}
                 alt={product.name}
               ></img>
             </div>
             <div className="col-1">
      
     
               <ul>
                 <li>
                   <h1>{product.name}</h1>
                 </li>
                 <li>
                   <Rating
                     rating={product.rating}
                     numReviews={product.numReviews}
                   ></Rating>
                 </li>
                 <li> <h2 className='d'>מחיר : </h2>
                    ₪{product.price}
                    </li>
                 <li>
                 <h2 className='d'>   תיאור המוצר : </h2>
                   <p>{product.description}</p>
                 </li>
          
                 
               </ul>
             </div>
             <div className="col-1">
               <div className="card card-body">
                 
                 <ul>
              

                   <li>
                     <div className="row">
                       <div>מחיר</div>
                       <div className="price">₪{ product.price*qty}</div>
                     </div>
                   </li>
                   <li>
                     <div className="row">
                       <div>סטטוס</div>
                       <div>
                         {product.countInStock > 0 ? (
                           <span className="success">במלאי</span>
                         ) : (
                           <span className="danger">לא זמין במלאי</span>
                         )}
                       </div>
                     </div>
                   </li>
                   {product.countInStock > 0 && (
                    <>
                    
                      <li>

                        <div className="row">


                          <div>כמות</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                           
                          </div>
                          <div>גודלה התמונה</div>
                            <select
                              value={size}
                              onChange={(e) => setSize(e.target.value)}
                            >
                              {sizeArray.map(
                                (x) => (
                                  <option key={x.key} value={x.value}>
                                    {x.content}
                                  </option>
                                )
                              )}
                            </select>
                        </div>
                        
                      </li>
                      <li>
                        
                        <button
                          onClick={addToCartHandler}
                          className="primary block"
                        >
                          הוסף לעגלת קניות
                        </button>
    
                      </li>
                   
                    </>
                    
                  )}
                </ul>
                
              </div>
            </div>
            
          </div>
     
          <div >
 
            <h2 id="reviews">דירוג</h2>
            {product.reviews.length === 0 && (
              <MessageBox>There is no review</MessageBox>
            )}
            <ul>
              {product.reviews.map((review) => (
                <li key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating rating={review.rating} caption=" "></Rating>
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </li>
              ))}
              <li>
                {userInfo ? (
                  <form className="form" onSubmit={submitHandler}>
                    <div>
                      <h2>כתוב ביקורת לקוחות</h2>
                    </div>
                    <div>
                      <label htmlFor="rating">דירוג</label>
                      <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1- Poor</option>
                        <option value="2">2- Fair</option>
                        <option value="3">3- Good</option>
                        <option value="4">4- Very good</option>
                        <option value="5">5- Excelent</option>
                      </select>
                    </div>
                    <div >
                      <label htmlFor="comment">תגובה</label>
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <label />
                      <button className="primary" type="submit">
                        לחץ
                      </button>
                    </div>
                    <div>
                      {loadingReviewCreate && <LoadingBox></LoadingBox>}
                      {errorReviewCreate && (
                        <MessageBox variant="danger">
                          {errorReviewCreate}
                        </MessageBox>
                      )}
                    </div>
                  </form>
                ) : (
                  <MessageBox>
                    Please <Link to="/signin">Sign In</Link> to write a review
                  </MessageBox>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
*/}

{/*
 import React, { useEffect, useState } from 'react';
 import { useDispatch, useSelector } from 'react-redux';
 import { Link } from 'react-router-dom';
 import { createReview, detailsProduct } from '../actions/productActions';
 import LoadingBox from '../components/LoadingBox';
 import MessageBox from '../components/MessageBox';
 import Rating from '../components/Rating';
 import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants'; 
 
 
 
 export default function ProductScreen(props) {

  
   const dispatch = useDispatch();
   const productId = props.match.params.id;
   const [qty, setQty] = useState(1);
   const [size, setSize] = useState(1);
   const productDetails = useSelector((state) => state.productDetails);
   const { loading, error, product } = productDetails;
   const userSignin = useSelector((state) => state.userSignin);
   const { userInfo } = userSignin;
 
   const productReviewCreate = useSelector((state) => state.productReviewCreate);
   const {
     loading: loadingReviewCreate,
     error: errorReviewCreate,
     success: successReviewCreate,
   } = productReviewCreate;
 
   const [rating, setRating] = useState(0);
   const [comment, setComment] = useState('');
   useEffect(() => {
    if (successReviewCreate) {
      window.alert('Review Submitted Successfully');
      setRating('');
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
     dispatch(detailsProduct(productId));
    }, [dispatch, productId, successReviewCreate]);
   const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}&size=${size}`);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(productId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert('Please enter comment and rating');
    }
  };

  const sizeArray =[{ key :'1', value:"0", content:"10x10"},{ key :'2', value:"50", content:"20x20"},{ key :'3', value:"100", content:"30x30"}]

   return (
     <div  >
  
      
    {loading ? (
         <LoadingBox></LoadingBox>
       ) : error ? (
         <MessageBox variant="danger">{error}</MessageBox>
       ) : (
         <div>
           
           <Link className='mor' to="/">בחזרה לעמוד הבית</Link>
           
           <div className="row top">
             <div className="col-2">
               <img
                 className="large"
                 src={product.image}
                 alt={product.name}
               ></img>
             </div>
             <div className="col-1">
      
     
               <ul>
                 <li>
                   <h1>{product.name}</h1>
                 </li>
                 <li>
                   <Rating
                     rating={product.rating}
                     numReviews={product.numReviews}
                   ></Rating>
                 </li>
                 <li> <h2 className='d'>מחיר : </h2>
                    ₪{product.price}
                    </li>
                 <li>
                 <h2 className='d'>   תיאור המוצר : </h2>
                   <p>{product.description}</p>
                 </li>
          

                 
               </ul>
             </div>
             <div className="col-1">
               <div className="card card-body">
                 
                 <ul>
              

                   <li>
                     <div className="row">
                       <div>מחיר</div>
                       <div className="price">₪{product.price}</div>
                     </div>
                   </li>
                   <li>
                     <div className="row">
                       <div>סטטוס</div>
                       <div>
                         {product.countInStock > 0 ? (
                           <span className="success">במלאי</span>
                         ) : (
                           <span className="danger">לא זמין במלאי</span>
                         )}
                       </div>
                     </div>
                   </li>
                   {product.countInStock > 0 && (
                    <>
                    
                      <li>

                        <div className="row">


                          <div>כמות</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                           
                          </div>
                          <div>גודל התמונה</div>

<select
  value={size}
  onChange={(e) => setSize(e.target.value)}
>
  {sizeArray.map(
    (x) => (
      <option key={x.key} value={x.value}>
        {x.content}
      </option>
    )
  )}
</select>
                        </div>
                        
                      </li>
                      <li>
                        
                        <button
                          onClick={addToCartHandler}
                          className="primary block"
                        >
                          הוסף לעגלת קניות
                        </button>
    
                      </li>
                   
                    </>
                    
                  )}
                </ul>
                
              </div>
            </div>
            
          </div>
     
          <div >
 
            <h2 id="reviews">דירוג</h2>
            {product.reviews.length === 0 && (
              <MessageBox>There is no review</MessageBox>
            )}
            <ul>
              {product.reviews.map((review) => (
                <li key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating rating={review.rating} caption=" "></Rating>
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </li>
              ))}
              <li>
                {userInfo ? (
                  <form className="form" onSubmit={submitHandler}>
                    <div>
                      <h2>כתוב ביקורת לקוחות</h2>
                    </div>
                    <div>
                      <label htmlFor="rating">דירוג</label>
                      <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1- Poor</option>
                        <option value="2">2- Fair</option>
                        <option value="3">3- Good</option>
                        <option value="4">4- Very good</option>
                        <option value="5">5- Excelent</option>
                      </select>
                    </div>
                    <div >
                      <label htmlFor="comment">תגובה</label>
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <label />
                      <button className="primary" type="submit">
                        לחץ
                      </button>
                    </div>
                    <div>
                      {loadingReviewCreate && <LoadingBox></LoadingBox>}
                      {errorReviewCreate && (
                        <MessageBox variant="danger">
                          {errorReviewCreate}
                        </MessageBox>
                      )}
                    </div>
                  </form>
                ) : (
                  <MessageBox>
                    Please <Link to="/signin">Sign In</Link> to write a review
                  </MessageBox>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}*/}
{/*
 import React, { useEffect, useState } from 'react';
 import { useDispatch, useSelector } from 'react-redux';
 import { Link } from 'react-router-dom';
 import { createReview, detailsProduct } from '../actions/productActions';
 import LoadingBox from '../components/LoadingBox';
 import MessageBox from '../components/MessageBox';
 import Rating from '../components/Rating';
 import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants'; 
 
 
 
 export default function ProductScreen(props) {
   const dispatch = useDispatch();
   const productId = props.match.params.id;
   const [qty, setQty] = useState(1);

   const productDetails = useSelector((state) => state.productDetails);
   const { loading, error, product } = productDetails;
   const userSignin = useSelector((state) => state.userSignin);
   const { userInfo } = userSignin;
 
   const productReviewCreate = useSelector((state) => state.productReviewCreate);
   const {
     loading: loadingReviewCreate,
     error: errorReviewCreate,
     success: successReviewCreate,
   } = productReviewCreate;
 
   const [rating, setRating] = useState(0);
   const [comment, setComment] = useState('');
   useEffect(() => {
    if (successReviewCreate) {
      window.alert('Review Submitted Successfully');
      setRating('');
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
     dispatch(detailsProduct(productId));
    }, [dispatch, productId, successReviewCreate]);
   const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(productId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert('Please enter comment and rating');
    }
  };
   return (
     <div  >
  
      
    {loading ? (
         <LoadingBox></LoadingBox>
       ) : error ? (
         <MessageBox variant="danger">{error}</MessageBox>
       ) : (
         <div>
           
           <Link className='mor' to="/">בחזרה לעמוד הבית</Link>
           
           <div className="row top">
             <div className="col-2">
               <img
                 className="large"
                 src={product.image}
                 alt={product.name}
               ></img>
             </div>
             <div className="col-1">
      
     
               <ul>
                 <li>
                   <h1>{product.name}</h1>
                 </li>
                 <li>
                   <Rating
                     rating={product.rating}
                     numReviews={product.numReviews}
                   ></Rating>
                 </li>
                 <li> <h2 className='d'>מחיר : </h2>
                    ₪{product.price}
                    </li>
                 <li>
                 <h2 className='d'>   תיאור המוצר : </h2>
                   <p>{product.description}</p>
                 </li>
                 <li >
                  <h2 className='d'> גודל התמונה :</h2>
                   <p>{product.brand}</p>
                 </li>
                 
                 
               </ul>
             </div>
             <div className="col-1">
               <div className="card card-body">
                 
                 <ul>
              

                   <li>
                     <div className="row">
                       <div>מחיר</div>
                       <div className="price">₪{product.price}</div>
                     </div>
                   </li>
                   <li>
                     <div className="row">
                       <div>סטטוס</div>
                       <div>
                         {product.countInStock > 0 ? (
                           <span className="success">במלאי</span>
                         ) : (
                           <span className="danger">לא זמין במלאי</span>
                         )}
                       </div>
                     </div>
                   </li>
                   {product.countInStock > 0 && (
                    <>
                    
                      <li>

                        <div className="row">
                        <label for="standard-select">גודל התמונה</label>
<div class="select">
  <select id="standard-select">
    <option value="Option 1"> 25  * 60   </option>
    <option value="Option 2">20  * 40</option>
    <option value="Option 3">50  * 80</option>
    <option value="Option 4">30  * 47</option>
    <option value="Option 5">30  * 40</option>
    <option value="Option length">40  * 80</option>
  </select>
</div>

                          <div>כמות</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>

                        </div>
                        
                      </li>
                      <li>
                        
                        <button
                          onClick={addToCartHandler}
                          className="primary block"
                        >
                          הוסף לעגלת קניות
                        </button>
    
                      </li>
                   
                    </>
                    
                  )}
                </ul>
                
              </div>
            </div>
            
          </div>
     
          <div >
 
            <h2 id="reviews">דירוג</h2>
            {product.reviews.length === 0 && (
              <MessageBox>There is no review</MessageBox>
            )}
            <ul>
              {product.reviews.map((review) => (
                <li key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating rating={review.rating} caption=" "></Rating>
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </li>
              ))}
              <li>
                {userInfo ? (
                  <form className="form" onSubmit={submitHandler}>
                    <div>
                      <h2>כתוב ביקורת לקוחות</h2>
                    </div>
                    <div>
                      <label htmlFor="rating">דירוג</label>
                      <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1- Poor</option>
                        <option value="2">2- Fair</option>
                        <option value="3">3- Good</option>
                        <option value="4">4- Very good</option>
                        <option value="5">5- Excelent</option>
                      </select>
                    </div>
                    <div >
                      <label htmlFor="comment">תגובה</label>
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <label />
                      <button className="primary" type="submit">
                        לחץ
                      </button>
                    </div>
                    <div>
                      {loadingReviewCreate && <LoadingBox></LoadingBox>}
                      {errorReviewCreate && (
                        <MessageBox variant="danger">
                          {errorReviewCreate}
                        </MessageBox>
                      )}
                    </div>
                  </form>
                ) : (
                  <MessageBox>
                    Please <Link to="/signin">Sign In</Link> to write a review
                  </MessageBox>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
*/}


{/*
 import React, { useEffect, useState } from 'react';
 import { useDispatch, useSelector } from 'react-redux';
 import { Link } from 'react-router-dom';
 import { createReview, detailsProduct } from '../actions/productActions';
 import LoadingBox from '../components/LoadingBox';
 import MessageBox from '../components/MessageBox';
 import Rating from '../components/Rating';
 import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants'; 
 
 
 
 export default function ProductScreen(props) {
   const dispatch = useDispatch();
   const productId = props.match.params.id;
   const [qty, setQty] = useState(1);

   const productDetails = useSelector((state) => state.productDetails);
   const { loading, error, product } = productDetails;
   const userSignin = useSelector((state) => state.userSignin);
   const { userInfo } = userSignin;
 
   const productReviewCreate = useSelector((state) => state.productReviewCreate);
   const {
     loading: loadingReviewCreate,
     error: errorReviewCreate,
     success: successReviewCreate,
   } = productReviewCreate;
 
   const [rating, setRating] = useState(0);
   const [comment, setComment] = useState('');
   useEffect(() => {
    if (successReviewCreate) {
      window.alert('Review Submitted Successfully');
      setRating('');
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
     dispatch(detailsProduct(productId));
    }, [dispatch, productId, successReviewCreate]);
   const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(productId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert('Please enter comment and rating');
    }
  };
   return (
     <div  >
  
      
    {loading ? (
         <LoadingBox></LoadingBox>
       ) : error ? (
         <MessageBox variant="danger">{error}</MessageBox>
       ) : (
         <div>
           
           <Link className='mor' to="/">בחזרה לעמוד הבית</Link>
           
           <div className="row top">
             <div className="col-2">
               <img
                 className="large"
                 src={product.image}
                 alt={product.name}
               ></img>
             </div>
             <div className="col-1">
      
     
               <ul>
                 <li>
                   <h1>{product.name}</h1>
                 </li>
                 <li>
                   <Rating
                     rating={product.rating}
                     numReviews={product.numReviews}
                   ></Rating>
                 </li>
                 <li> <h2 className='d'>מחיר : </h2>
                    ₪{product.price}
                    </li>
                 <li>
                 <h2 className='d'>   תיאור המוצר : </h2>
                   <p>{product.description}</p>
                 </li>
                 <li >
                  <h2 className='d'> גודל התמונה :</h2>
                   <p>{product.brand}</p>
                 </li>
                 
                 
               </ul>
             </div>
             <div className="col-1">
               <div className="card card-body">
                 
                 <ul>
              

                   <li>
                     <div className="row">
                       <div>מחיר</div>
                       <div className="price">₪{product.price}</div>
                     </div>
                   </li>
                   <li>
                     <div className="row">
                       <div>סטטוס</div>
                       <div>
                         {product.countInStock > 0 ? (
                           <span className="success">במלאי</span>
                         ) : (
                           <span className="danger">לא זמין במלאי</span>
                         )}
                       </div>
                     </div>
                   </li>
                   {product.countInStock > 0 && (
                    <>
                    
                      <li>

                        <div className="row">
                        <label for="standard-select">גודל התמונה</label>
<div class="select">
  <select id="standard-select">
    <option value="Option 1"> 25  * 60   </option>
    <option value="Option 2">20  * 40</option>
    <option value="Option 3">50  * 80</option>
    <option value="Option 4">30  * 47</option>
    <option value="Option 5">30  * 40</option>
    <option value="Option length">40  * 80</option>
  </select>
</div>

                          <div>כמות</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>

                        </div>
                        
                      </li>
                      <li>
                        
                        <button
                          onClick={addToCartHandler}
                          className="primary block"
                        >
                          הוסף לעגלת קניות
                        </button>
    
                      </li>
                   
                    </>
                    
                  )}
                </ul>
                
              </div>
            </div>
            
          </div>
     
          <div >
 
            <h2 id="reviews">דירוג</h2>
            {product.reviews.length === 0 && (
              <MessageBox>There is no review</MessageBox>
            )}
            <ul>
              {product.reviews.map((review) => (
                <li key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating rating={review.rating} caption=" "></Rating>
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </li>
              ))}
              <li>
                {userInfo ? (
                  <form className="form" onSubmit={submitHandler}>
                    <div>
                      <h2>Write a customer review</h2>
                    </div>
                    <div>
                      <label htmlFor="rating">Rating</label>
                      <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1- Poor</option>
                        <option value="2">2- Fair</option>
                        <option value="3">3- Good</option>
                        <option value="4">4- Very good</option>
                        <option value="5">5- Excelent</option>
                      </select>
                    </div>
                    <div >
                      <label htmlFor="comment">Comment</label>
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <label />
                      <button className="primary" type="submit">
                        Submit
                      </button>
                    </div>
                    <div>
                      {loadingReviewCreate && <LoadingBox></LoadingBox>}
                      {errorReviewCreate && (
                        <MessageBox variant="danger">
                          {errorReviewCreate}
                        </MessageBox>
                      )}
                    </div>
                  </form>
                ) : (
                  <MessageBox>
                    Please <Link to="/signin">Sign In</Link> to write a review
                  </MessageBox>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
*/}


