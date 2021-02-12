import React, { Component } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

let  d ='/images/p7.jpg'
let  e ='/images/dddd.jpg'
let  a ='/images/p5.jpg'

export class aboutScreen extends Component {

    render() {
        return (
          <div className='g'>


              <Carousel    showArrows autoPlay showThumbs={false}>
             
                   
                      <img src={d} alt={d}  width="240"  />
                      <img src={d} alt={d} />
                      <img src={d} alt={d} />
               
                
             
              </Carousel>
              
          
  
            </div>

        )
    }
}

export default aboutScreen

