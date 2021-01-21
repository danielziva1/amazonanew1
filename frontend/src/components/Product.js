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
        <Link to={`/product/${product._id}`}>
        <input  to={`/product/${product._id}`} type="submit" value="רכישה" id="buttonn-blue"/>
        </Link>
       
          
      </div>
    
    </div>
    
  );
}



{/*      <div key={product._id} class="card">
      <img className="medium" src={product.image} alt={product.name} />
      <Link to={`/product/${product._id}`}>
          <h2>{product.name}</h2>
        </Link>
        <div className="price">₪{product.price }</div>
  <p>Some text about the jeans. Super slim and comfy lorem ipsum lorem jeansum. Lorem jeamsun denim lorem jeansum.</p>
  <p><button> <Link to={`/product/${product._id}`}>
         לרכישה
        </Link></button></p>
</div>
    

    
  );
}
*/}


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