import React from 'react';
import Rating from './Rating';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

export default function Product(props) {
  const { product } = props;
  return (
    <div key={product._id} className="carda">
      <Link to={`/product/${product._id}`}>
        <img className="medium" src={product.image} alt={product.name} />
     </Link>
      <div className="carda-body">
      <Link to={`/product/${product._id}`}>
          <h2>{product.name}</h2>
        </Link>
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating>
        <div className="price">₪{product.price }</div> 
        <Button  fontSize='large' variant="outlined" to={`/product/${product._id}`}>
        <Link to={`/product/${product._id}`}>
         לרכישה
        </Link>
          </Button>
          
      </div>
    
    </div>
  );
}


{/*import React from 'react';
import Rating from './Rating';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

export default function Product(props) {
  const { product } = props;
  return (
    <div key={product._id} className="carda">
      <Link to={`/product/${product._id}`}>
        <img className="medium" src={product.image} alt={product.name} />
     </Link>
      <div className="carda-body">
      <Link to={`/product/${product._id}`}>
          <h2>{product.name}</h2>
        </Link>
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating>
        
     <div>
        <Button fontSize='large' variant="outlined" color="primary" to={`/product/${product._id}`}>
        <Link to={`/product/${product._id}`}>
         לרכישה
        </Link>
          </Button>
      </div>
      </div>
    </div>
  );
}*/}