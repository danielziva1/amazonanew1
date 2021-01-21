import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';
import Rating from '../components/Rating';
import { prices, ratings } from '../utils';
import { BrowserRouter, Route } from 'react-router-dom';
import SearchBox from '../components/SearchBox';
import Button from '@material-ui/core/Button';
export default function SearchScreen(props) {

  
  const {
    name = 'all',
    category = 'all',
    min = 0,
    max = 0,
    rating = 0,
    order = 'newest',
    pageNumber = 1,
  } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(
      listProducts({
        pageNumber,
        name: name !== 'all' ? name : '',
        category: category !== 'all' ? category : '',
        min,
        max,
        rating,
        order,
      })
    );
  }, [category, dispatch, max, min, name, order, rating, pageNumber]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || pageNumber;
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    const filterRating = filter.rating || rating;
    const sortOrder = filter.order || order;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}/pageNumber/${filterPage}`;
  };

  
  return (
    <div >
   {/* <div className="edennn"></div>  */}
      <div className="row">
      {/* <div className="ship"> משלוח אקספרס חינם בהזמנה מעל 300 ₪</div>*/}
      <div>
        <BrowserRouter>
  
            </BrowserRouter>
            {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Route
          render={({ history }) => (
            <SearchBox history={history}></SearchBox>
          )}
        ></Route>

        )}
          </div>
        
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div className="eden"><h1>{products.length} תוצאות</h1></div>
        )}
        <div  >
          מיין לפי{' '}
          <select className='eden'
            value={order}
            onChange={(e) => {
              props.history.push(getFilterUrl({ order: e.target.value }));
            }}
          >

            <option value="newest">החדשים ביותר</option>
            <option value="lowest">מחיר: נמוך לגבוה</option>
            <option value="highest">מחיר: גבוה לנמוך</option>
            <option value="toprated">ממוצע: סקירת לקוחות</option>
            
          </select>
        </div>
      </div>
      
      <div className="row top">
        <div className="lini">
        <div className="col-1">
          </div>
          <h3>קטגוריה</h3>
          <div  >
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              <ul >
                <li>
                  <div className="edenn">
                    <Button >
                      
                  <Link className="eden"
                 
                    to={getFilterUrl({ category: 'all' })}
                  >
                    הכל
                  </Link>
                  
                  </Button>
                  </div>
                </li>
                {categories.map((c) => (
                  <li key={c} className="toto">
                      <Button>
                    <Link 
                      className={c === category ? 'active' : ''}
                      to={getFilterUrl({ category: c })}
                    >
                      <div className='eden'>
                      {c}
                      </div>
                    </Link>
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
          
            <h3>מחיר</h3>
            <ul>
              {prices.map((p) => (
                <li key={p.name}>
             
                  <Button >
                  
                  <Link
                    to={getFilterUrl({ min: p.min, max: p.max })}
                    className={
                      `${p.min}-${p.max}` === `${min}-${max}` ? 'active' : ''
                    }
                  >
                    <div className='eden'>
                    {p.name}
                    </div>
                
                  </Link>
               
                  </Button>
               
                </li>
              ))}
            </ul>
         
          </div>
          <div>
            <h3>ממוצע סקירת לקוחות</h3>
            <ul>
              {ratings.map((r) => (
                <li key={r.name}>
                  <Link
                    to={getFilterUrl({ rating: r.rating })}
                    className={`${r.rating}` === `${rating}` ? 'active' : ''}
                  >
                    <Rating caption={' & מעל'} rating={r.rating}></Rating>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-3">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {products.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
            {/*  <div className="row center pagination">
                {[...Array(pages).keys()].map((x) => (
                  <Link
                    className={x + 1 === page ? 'active' : ''}
                    key={x + 1}
                    to={getFilterUrl({ page: x + 1 })}
                  >
                    {x + 1}
                  </Link>
                ))}
              </div>
              */}
              <div className="row center">
                {products.map((product) => (
                  <Product key={product._id} product={product}></Product>
                ))}
              </div>
              <div className="row center pagination">
                {[...Array(pages).keys()].map((x) => (
                  <Link
                    className={x + 1 === page ? 'active' : ''}
                    key={x + 1}
                    to={getFilterUrl({ page: x + 1 })}
                  >
                    {x + 1}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      
    </div>

  );
}
