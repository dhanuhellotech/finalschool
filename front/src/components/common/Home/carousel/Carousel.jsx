import React from 'react';
import Slider from 'react-slick';  // Add this line
import {Link }from 'react-router-dom'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carosuel.css'
import slide1 from '../../../assets/cute-baby-with-toys.jpg';
import slide2 from '../../../assets/mother-with-son-painting-big-paper-with-their-hands.jpg';
import slide3 from '../../../assets/kid-playing-with-colorful-wooden-toys-full-shot.jpg'
export default function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="container-fluid p-0 mb-8">
    <Slider {...settings}>
      <div className="position-relative">
        <img className="img-fluid" src={slide1} alt="Slide 1" />
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center" style={{ background: 'rgba(0, 0, 0, .2)' }}>
          <div className="container">
            <div className="row justify-content-start">
              <div className="col-10 col-lg-8">
                <h1 className="text-white animated slideInDown mb-4 tophead ">The Best Kindergarten School For Your Child</h1>
                <p className="fs-5 fw-medium text-white mb-4 pb-2 toppara">Emphasizes hands-on learning, self-directed activity, and collaborative play. Look for content that aligns with Montessori principles.</p>
                <a href="admission" className="btn btn-primary rounded-pill py-sm-3 px-sm-5 me-3">Admission Open For 24-25</a>
                {/* <a href="franchise" className="btn btn-dark rounded-pill py-sm-3 px-sm-5 animated slideInRight">Our Franchise</a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="position-relative ">
        <img className="img-fluid" src={slide2} alt="Slide 2" />
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center" style={{ background: 'rgba(0, 0, 0, .2)' }}>
          <div className="container">
            <div className="row justify-content-start">
              <div className="col-10 col-lg-8">
                <h1 className="text-white animated slideInDown mb-4 tophead">Make A Brighter Future For Your Child</h1>
                <p className="fs-5 fw-medium text-white mb-4 pb-2 toppara">Focuses on child-led activities and project-based learning. Content should encourage exploration, creativity, and collaboration.</p>
                <a href="admission" className="btn btn-primary rounded-pill py-sm-3 px-sm-5 me-3 animated ">Admission Open For 24-25</a>
                {/* <a href="franchise" className="btn btn-dark rounded-pill py-sm-3 px-sm-5 animated slideInRight">Our Franchise</a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="position-relative">
        <img className="img-fluid" src={slide3} alt="Slide 2" />
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center" style={{ background: 'rgba(0, 0, 0, .2)' }}>
          <div className="container">
            <div className="row justify-content-start">
              <div className="col-10 col-lg-8">
                <h1 className="text-white animated slideInDown mb-4 tophead">Make A Brighter Future For Your Child</h1>
                <p className="fs-5 fw-medium text-white mb-4 pb-2 toppara">Focuses on child-led activities and project-based learning. Content should encourage exploration, creativity, and collaboration.</p>
                {/* <a href="admission" className="btn btn-primary rounded-pill py-sm-3 px-sm-5 me-3 animated slideInLeft">Admission Open For 24-25</a> */}
                <Link className="btn btn-primary rounded-pill py-sm-3 px-sm-5 me-3 animated " to='/admission'>Admission Open For 24-25</Link>
                {/* <a href="franchise" className="btn btn-dark rounded-pill py-sm-3 px-sm-5 animated slideInRight">Our Franchise</a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Slider>
  </div>
  );
}
