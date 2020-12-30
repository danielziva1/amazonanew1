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
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
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
                    <Link >הזמנות</Link>
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
          <div>
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
          </div>
             
          <Link className="brand"   to="/contactus">
           <WhatsAppIcon  fontSize ='large' ></WhatsAppIcon>
           
            </Link>
            <div></div>  
            <div></div>
            <div></div>  
            <div></div> 
            <div></div>  
            <div></div>
            <div></div>  
            <div></div> 
            
          <Link className="brand" to="/">
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
    <footer className="row center">
      <div >
    שירות לקוחות
נשמח לסייע ולהעניק מענה לכל שאלה:
ימים א’-ה’ בין 09:00 – 17:00
טלפון: 00533313049
<Link>hotprint@gmail.com</Link>
</div>
</footer>
  </div>
  
</BrowserRouter>
);
}

export default App;