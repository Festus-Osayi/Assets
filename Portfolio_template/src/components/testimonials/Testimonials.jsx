import React from "react";
import "./testimonials.css";
import AVTR1 from "../../Assets/avatar1.jpg";
import AVTR2 from "../../Assets/avatar2.jpg";
import AVTR3 from "../../Assets/avatar3.jpg";
import AVTR4 from "../../Assets/avatar4.jpg";

// import Swiper core and required modules
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const testimonials = [
  {
    
    image: AVTR1,
    name: "Ernest Achiever",
    review: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est
            reprehenderit, sed aspernatur vitae enim modi corrupti assumenda ex
            provident autem! Dolor, eos perferendis. Praesentium odio sunt
            molestiae consequatur assumenda soluta.`,
    alt: "first tesimonial",
  },

  {
    image: AVTR2,
    name: "Iyobor Lucky",
    review: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est
            reprehenderit, sed aspernatur vitae enim modi corrupti assumenda ex
            provident autem! Dolor, eos perferendis. Praesentium odio sunt
            molestiae consequatur assumenda soluta.`,
    alt: "second tesimonial",
  },

  {
    image: AVTR3,
    name: "Igbinedion Osayi",
    review: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est
            reprehenderit, sed aspernatur vitae enim modi corrupti assumenda ex
            provident autem! Dolor, eos perferendis. Praesentium odio sunt
            molestiae consequatur assumenda soluta.`,
    alt: "Third tesimonial",
  },

  {
   
    image: AVTR4,
    name: "Augustine Osayi",
    review: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est
            reprehenderit, sed aspernatur vitae enim modi corrupti assumenda ex
            provident autem! Dolor, eos perferendis. Praesentium odio sunt
            molestiae consequatur assumenda soluta.`,
    alt: "fourth tesimonial",
  }
]

const Testimonials = () => {
  return (
    <section id="testiomonials">
      <h5>Reviews from clients</h5>
      <h2>Testimonials</h2>
      <Swiper className="container testimonials__container"
        // install Swiper modules modules=
        modules={[Pagination]}
        spaceBetween={40}
        slidesPerView={1}
        pagination={{ clickable: true }}
        >

        {testimonials.map(({ image, name, review, alt }, index) => {
          return (
            <SwiperSlide key={index} className="testimonial">
              <div className="client__avatar">
                <img src={image} alt={alt} />
              </div>
              <h5 className="client__name">{name}</h5>
              <small className="client__review">{review}</small>
            </SwiperSlide>
          );
        })}
        {/* end of first testimony */}
      </Swiper>
    </section>
  );
};

export default Testimonials;
