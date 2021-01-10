import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import { signout } from './actions/userActions'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { listProductCategories } from './actions/productActions';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import SellerScreen from './screens/SellerScreen';
import ProductScreen from './screens/ProductScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import SearchScreen from './screens/SearchScreen';
import SearchBox from './components/SearchBox';
import SellerRoute from './components/SellerRoute';
import MapScreen from './screens/MapScreen';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

import ContactUsScreen from './screens/ContactUsScreen';
import Button from '@material-ui/core/Button';




function App() {
  const cart = useSelector((state) => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
 
 

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);
  return (
    <BrowserRouter>
  
      <div className="grid-container">  
        <header className="row">
          <div>
            
          <button
              type="button"
              className="open-sidebar"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars"></i>
            </button>
           
          </div>
          
       
         
          <div>
            
          <Link to="/cart">
          <ShoppingCartIcon fontSize ='large' >  
              </ShoppingCartIcon>
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                <li>
                    <Link to="/profile">פרופיל משתמש</Link>
                  </li>
                <li>
                    <Link to="/orderhistory"> הזמנות</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                     יציאה
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin"> 
                <PersonOutlineIcon   fontSize ='large'></PersonOutlineIcon>
                
                </Link>
             
            )}
               {userInfo && userInfo.isSeller && (
              <div className="dropdown">
                <Link to="#admin">
                  מוכר <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/productlist/seller">מוצרים</Link>
                  </li>
                  <li>
                    <Link to="/orderlist/seller">הזמנות</Link>
                  </li>
                </ul>
              </div>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  מנהל <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                  
                  </li>
                  <li>
                    <Link to="/productlist">מוצרים</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">הזמנות</Link>
                  </li>
                  <li>
                    <Link to="/userlist">משתמשים</Link>
                  </li>
                </ul>
                
              </div>
            )}
          </div>
          {/* 
          <div>
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
          </div>
             */}
            <div></div>  
            <div></div>
            <div></div>  
            <div></div> 
            <div></div>  
            <div></div>
            <div></div>  
            <div ></div> 
            
          <Link className="brand" to="/search/name/" >
          קנבס אונליין
            </Link>
          

            
    </header>
    
    <aside className={sidebarIsOpen ? 'open' : ''}>
          <ul className="categories">
            <li>
              <strong>תמונות לפי קטגוריה</strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-close"></i>
              </button>
            </li>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                <li key={c}>
                  <Button   size="large" >
                  <Link className="toto"
                    to={`/search/category/${c}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {c}
                  </Link>
                  </Button>
                </li>
              ))
            )}
          </ul>
        </aside>

    <main>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" />
<a href="https://chatwith.io/s/5fea28b2e0a12" className="floata" target="_blank">
<i className="fa fa-whatsapp my-floata"></i>
</a>
   

    <Route path="/contactus" component={ContactUsScreen}></Route>
    <Route path="/seller/:id" component={SellerScreen}></Route>
    <Route path="/cart/:id?" component={CartScreen}></Route>
    <Route path="/product/:id" component={ProductScreen} exact></Route>
    <Route
            path="/product/:id/edit"
            component={ProductEditScreen}
            exact
          ></Route>
          
      <Route path="/signin" component={SigninScreen}></Route>
      <Route path="/register" component={RegisterScreen}></Route>
      <Route path="/shipping" component={ShippingAddressScreen}></Route>
      <Route path="/payment" component={PaymentMethodScreen}></Route>
      <Route path="/placeorder" component={PlaceOrderScreen}></Route>
      <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
      <Route path="/order/:id" component={OrderScreen}></Route>
      
      <AdminRoute
            path="/productlist"
            component={ProductListScreen}
            
          ></AdminRoute>
           <AdminRoute
            path="/productlist/pageNumber/:pageNumber"
            component={ProductListScreen}
            exact
          ></AdminRoute>
           <AdminRoute
            path="/orderlist"
            component={OrderListScreen}
          ></AdminRoute>
           <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
           <AdminRoute
            path="/user/:id/edit"
            component={UserEditScreen}
          ></AdminRoute>
             
           <Route
            path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name"
            component={SearchScreen}
            exact
          ></Route>
      <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
            <PrivateRoute path="/map" component={MapScreen}></PrivateRoute>
           <Route
            path="/search/name/:name?"
            component={SearchScreen}
            exact
          ></Route>
          
           <SellerRoute
            path="/productlist/seller"
            component={ProductListScreen}
            
          ></SellerRoute>
    
          <SellerRoute
            path="/orderlist/seller"
            component={OrderListScreen}
          ></SellerRoute>
      <Route path="/" component={HomeScreen} exact></Route>
     
    </main>
   
    <footer className="footer-distributed">
    <div className="foot">
 <div className="footer-left">
 
 <h3>Hot<span>Print</span></h3>
 
 <p className="footer-links">
   
 <a href="/">עמוד הבית</a>
 ·
 <a href="/contactUs">תקנון האתר</a>
 ·

 <a href="#">אודות</a>
 ·

 <a href="#">צור קשר</a> 
 </p>
 
 <p className="footer-company-name">danielziva&copy; 2021</p>
 </div>
 
 <div className="footer-center">
 
 <div>
 <i className="fa fa-map-marker"></i>
 <p><span>שוק הכרמל</span> תל אביב, ישראל</p>
 </div>
 
 <div>
 <i className="fa fa-phone"></i>
 <p>0533313049</p>
 </div>
 
 <div>
 <i className="fa fa-envelope"></i>
 <p><a href="mailto:support@company.com">hotprint@gmail.com</a></p>
 </div>
 
 </div>
 
 <div className="footer-right">
 
 <p className="footer-company-about">
 <span>אודות</span>
 Web Dev Trick is a blog for web designers, graphic designers, web developers &amp; SEO Learner.
 </p>
 
 <div className="footer-icons">
 
 <a href="#"><i className="fa fa-facebook"></i></a>
 <a href="#"><i className="fa fa-twitter"></i></a>
 <a href="#"><i className="fa fa-linkedin"></i></a>
 <a href="#"><i className="fa fa-github"></i></a>
 
 </div>
 
 </div>
 </div>
 </footer>

  </div>
  
</BrowserRouter>
);
}

export default App;

{/*<footer className="footer-distributed">
 
<div class="footer-left">

<h3>WebDev<span>Trick</span></h3>

<p class="footer-links">
<a href="#">Home</a>
·
<a href="#">Blog</a>
·
<a href="#">Pricing</a>
·
<a href="#">About</a>
·
<a href="#">Faq</a>
·
<a href="#">Contact</a>
</p>

<p class="footer-company-name">webdevtrick &copy; 2019</p>
</div>

<div class="footer-center">

<div>
<i class="fa fa-map-marker"></i>
<p><span>21 Revolution Street</span> Delhi, India</p>
</div>

<div>
<i class="fa fa-phone"></i>
<p>+1 555 123456</p>
</div>

<div>
<i class="fa fa-envelope"></i>
<p><a href="mailto:support@company.com">contact@webdevtrick.com</a></p>
</div>

</div>

<div class="footer-right">

<p class="footer-company-about">
<span>About the company</span>
Web Dev Trick is a blog for web designers, graphic designers, web developers &amp; SEO Learner.
</p>

<div class="footer-icons">

<a href="#"><i class="fa fa-facebook"></i></a>
<a href="#"><i class="fa fa-twitter"></i></a>
<a href="#"><i class="fa fa-linkedin"></i></a>
<a href="#"><i class="fa fa-github"></i></a>

</div>

</div>

</footer> */}