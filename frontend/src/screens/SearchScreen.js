
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';
import Rating from '../components/Rating';
import { prices, ratings } from '../utils';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { BrowserRouter, Route } from 'react-router-dom';
import SearchBox from '../components/SearchBox';
import Button from '@material-ui/core/Button';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
export default function SearchScreen(props) {

 let  tr = '/category/tr.png'

 let cover = '/category/cover.png'
 
 let  dog ='/category/dog.png'

 let paint = '/category/paint.png'
let sale = '/category/sale.png'
let animals = '/category/animals3.png'
let city = '/category/city.png'
let icons='/category/icons.png'
let flowers ='/category/flower.png'
let pop = '/category/pop1.png'
let oilColors = '/category/oil.png'

let view = '/category/view.png'










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

  var scrollTop = function() {
    window.scrollTo(1000, 1000);
};
  return (
    
    <div >
       
    {/*   <div className='deliveryy'> משלוח אקספרס חינם בהזמנה מעל 299 ₪
</div> */}
            
<div className='g'>


<Carousel    showArrows autoPlay={false} showThumbs={false}>

     
        <img src={tr} alt={tr}  width="240"  />
        <img src={dog} alt={dog}   width="240"/>
        <img src={cover} alt={cover}  width="240" />
 
  

</Carousel>



</div>
<div className="row">
  
    {/* <img src={e} alt="Girl in a jacket" width="1240" height="300"/> */}
    
      
   <h1> </h1>
   <div className='piciiz'></div>
   <div className='piciizz'>קטגוריות נבחרות:</div>
  
  <div className='no-drop'>
  {loadingCategories ? (
          <LoadingBox></LoadingBox>
        ) : errorCategories ? (
          <MessageBox variant="danger">{errorCategories}</MessageBox>
        ) : (
          <div className='oni'>
          <div className='row' >

            {categories.map((z) => (
              <div key={z} className="toto">
             
                <Link 
                  className='upp' href='#top'
                  to={getFilterUrl({ category: z}, )}
                >
                  
                  <div className='eden'>
               <div className='row'>
              
          {
           z==='בעלי חיים'?(<div className='no-drop' onClick={(e) => scrollTop()}> <div className='animals'>  <img className='alt' src={animals} alt="" width="280"  height="180"></img> <h1 className='bot'>בעלי חיים</h1></div></div>)
          :z==='נופים'?(<div className='no-drop' onClick={(e) => scrollTop()}> <div className='animals'>  <img className='alt' src={view} alt="" width="280"  height="180"></img> <h1 className='bot'>נופים</h1></div></div>)
          :z==='sell'?(<div className='no-drop' onClick={(e) => scrollTop()}> <div className='animals'>  <img className='alt' src={sale} alt="" width="280"  height="180"></img> <h1 className='bot'>sell</h1></div></div>)
          :z==='פופ ארט'?(<div className='no-drop' onClick={(e) => scrollTop()}> <div className='animals'>  <img className='alt' src={pop} alt="" width="280"  height="180"></img> <h1 className='bot'>פופ ארט</h1></div> </div>)
          :z==='אייקון'?(<div className='no-drop' onClick={(e) => scrollTop()}> <div className='animals'>  <img className='alt' src={icons} alt="" width="280"  height="180"></img> <h1 className='bot'>Icons</h1></div></div>)
          :z==='פרחים וטבע'?(<div className='no-drop' onClick={(e) => scrollTop()}> <div className='animals'>  <img className='alt' src={flowers} alt="" width="280"  height="180"></img> <h1 className='bot'>פרחים וטבע</h1></div></div>)
          :z==='ערים ומקומות בעולם'?(<div className='no-drop' onClick={(e) => scrollTop()}> <div className='animals'>  <img className='alt' src={city} alt="" width="280"  height="180"></img> <h1 className='bot'>ערים ומקומות בעולם</h1></div></div>)
          :z==='צבעי מים'?(<div className='no-drop' onClick={(e) => scrollTop()}> <div className='animals'>  <img className='alt' src={oilColors} alt="" width="280"  height="180"></img> <h1 className='bot'>צבעי מים</h1></div></div>)
          :z==='ציורים'?(<div className='no-drop' onClick={(e) => scrollTop()}> <div className='animals'>  <img className='alt' src={paint} alt="" width="280"  height="180"></img> <h1 className='bot'>ציורים</h1></div></div>)
          :z==='sample category'?(<div className='no-drop' onClick={(e) => scrollTop()}> <div className='animals'>  <img className='alt' src={paint} alt="" width="280"  height="180"></img> <h1 className='bot'>sample</h1></div></div>)
          :z==='דוגמה'?(<div className='no-drop' onClick={(e) => scrollTop()}> <div className='animals'>  <img className='alt' src={paint} alt="" width="280"  height="180"></img> <h1 className='bot'>דוגמה</h1></div></div>)
          :z==='צבעי שמן'&&(<div className='no-drop' onClick={(e) => scrollTop()}> <div className='animals'>  <img className='alt' src={oilColors} alt="" width="280"  height="180"></img> <h1 className='bot'>צבעי שמן</h1></div></div>)
      
         
    } 
      
      {/*<div className='no-drop' onClick={(e) => scrollTop()}> <div className='animals'>  <img className='alt' src={f} alt="Girl in a jacket" width="217"  height="180"></img> <h1 className='bot'>{z}</h1></div></div>*/}
 
           </div>

                  </div>
                </Link>
            
              </div>
            )) }
               </div>      

          </div>
          
        )}

</div>

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

            <option  className="f" value="newest">החדשים ביותר</option>
            <option className="f" value="lowest">מחיר: נמוך לגבוה</option>
            <option className="f" value="highest">מחיר: גבוה לנמוך</option>
            <option className="f"  value="toprated">ממוצע: סקירת לקוחות</option>
            
          </select>
          <br></br>
        </div>

      </div>
<div></div>
      <div className="row top">
        <div className="lini">
       
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
     
              <div className="row center">
                {products.map((product) => (
                  <Product key={product._id} product={product}></Product>
                ))}
              </div>
              <a  className='up' href="#top">
            <ArrowUpwardIcon  fontSize ='large'> </ArrowUpwardIcon>
            </a>
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
// לבדוק מה כדאי ומה היותר יפה

{/*import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';
import Rating from '../components/Rating';
import { prices, ratings } from '../utils';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { BrowserRouter, Route } from 'react-router-dom';
import SearchBox from '../components/SearchBox';
import Button from '@material-ui/core/Button';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
export default function SearchScreen(props) {

 let  d ='/images/poster-mockup-2853865.jpg'
 let  e ='/images/dddd.jpg'
 let  a ='/images/p5.jpg'
 
 let  r ='/images/animals2.png'
 let  f ='/images/p3.jpg'
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

  var scrollTop = function() {
    window.scrollTo(1000, 1000);
};
  return (
    
    <div >
       
      
            <div className='delivery'> משלוח אקספרס חינם בהזמנה מעל 299 ₪
</div>
<div className='g'>


<Carousel    showArrows autoPlay showThumbs={false}>

     
        <img src={e} alt={e}  width="240"  />
        <img src={r} alt={r}   width="240"/>
        <img src={d} alt={d}  width="240" />
 
  

</Carousel>



</div>

      <div className="row">
    {/* <img src={e} alt="Girl in a jacket" width="1240" height="300"/> */}
    
      {/*
   <h1> </h1>
   <div className='piciiz'></div>
   <div className='piciizz'>קטגוריות נבחרות:</div>
  
  <div className='no-drop'>
  {loadingCategories ? (
          <LoadingBox></LoadingBox>
        ) : errorCategories ? (
          <MessageBox variant="danger">{errorCategories}</MessageBox>
        ) : (
          <div className='row' >
        
  {categories.map((z) => (
              <div key={z} className="toto">
             
                <Link 
                  className='upp' href='#top'
                  to={getFilterUrl({ category: z}, )}
                >
                  <div className='eden'>
               <div className='row'>
     
          {z === "חיות" ? (<div className='no-drop' onClick={(e) => scrollTop()}> <div className='animals'>  <img className='alt' src={r} alt="Girl in a jacket" width="217"  height="180"></img> <h1 className='bot'>חיות</h1></div></div>)
          :z==='נופים'?(<div className='no-drop' onClick={(e) => scrollTop()}> <div className='animals'>  <img className='alt' src={a} alt="Girl in a jacket" width="217"  height="180"></img> <h1 className='bot'>נופים</h1></div></div>)
          :z==='sell'?(<div className='no-drop' onClick={(e) => scrollTop()}> <div className='animals'>  <img className='alt' src={f} alt="Girl in a jacket" width="217"  height="180"></img> <h1 className='bot'>sell</h1></div></div>)
          :(<div className='no-drop' onClick={(e) => scrollTop()}> <div className='animals'>  <img className='alt' src={f} alt="Girl in a jacket" width="217"  height="180"></img> <h1 className='bot'>{z}</h1></div></div>)} 
 
           </div>

                  </div>
                </Link>
            
              </div>
            ))}
                     

          </div>
        )}

</div>
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
          <br></br>
        </div>

      </div>
<div></div>
      <div className="row top">
        <div className="lini">
        <div className="col-1">
          </div>
          
          <div className='bord'>
       
          <h3 className='dd'>קטגוריה</h3>
          <div  >
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              <ul >
                <li>
                  <div className="edenn">
              
                      
                  <Link className="eden"
                  
                    to={getFilterUrl({ category: 'all' })}
                  >
                    הכל
                  </Link>
                
                  </div>
                </li>
                {categories.map((c) => (
                  <li key={c} className="toto">  
                    
                    <Link 
                      className={c === category ? 'active' : ''}
                      to={getFilterUrl({ category: c })}
                    >
                      <div className='eden'>
                   <div className='cate'>
                   
          
              
              {c }
               </div>

                      </div>
                    </Link>
                
                  </li>
                ))}

              </ul>
            )}
          </div>
          <div>
         


            <h3 className='dd'>טווח מחירים</h3>
         
            <ul>
              {prices.map((p) => (
                <li key={p.name}>
             
                
                  
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
               
               
               
                </li>
              ))}
            </ul>
         
          </div>
          <div className='eden'>
            <h3 className='dd'>ממוצע סקירת לקוחות</h3>
            
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
     
              <div className="row center">
                {products.map((product) => (
                  <Product key={product._id} product={product}></Product>
                ))}
              </div>
              <a  className='up' href="#top">
            <ArrowUpwardIcon  fontSize ='large'> </ArrowUpwardIcon>
            </a>
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

*/}
