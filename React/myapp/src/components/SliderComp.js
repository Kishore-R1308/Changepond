import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import constData from '../shared/constant/constantfile';

const SliderComp = () => {
    return (
        <div>
            <Carousel>
      <Carousel.Item>
        {/* <ExampleCarouselImage text="First slide" /> */}
        <img src={constData.dosa} alt='' style={{width:"100%",height:"400px"}} />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        {/* <ExampleCarouselImage text="Second slide" /> */}
         <img src={constData.jalebi} alt='' style={{width:"100%",height:"400px"}} />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        {/* <ExampleCarouselImage text="Third slide" /> */}
         <img src={constData.samosa} alt='' style={{width:"100%",height:"400px"}} />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
        </div>
    )
}

export default SliderComp
