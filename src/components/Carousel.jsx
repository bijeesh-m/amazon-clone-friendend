import React, { useEffect, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
const HomeCarousel = () => {
  const [index, setIndex] = useState(0);
  const slides = [
    {
      url: "https://res.cloudinary.com/dunf6rko6/image/upload/v1706528262/1._CB583514833__kxl7cp.jpg",
    },
    {
      url: "https://res.cloudinary.com/dunf6rko6/image/upload/v1706528262/D92807365-_1_Tallhero_2xx._CB598669664__xqllft.jpg",
    },
    {
      url: "https://res.cloudinary.com/dunf6rko6/image/upload/v1706528262/4_3000pc._CB583023268__tw4wzi.jpg",
    },
    {
      url: "https://res.cloudinary.com/dunf6rko6/image/upload/v1706528262/Under_1499_Tallhero_3000x1200._CB584583557__ydbtwf.jpg",
    },
    {
      url: "https://res.cloudinary.com/dunf6rko6/image/upload/v1706528262/D103625178_DesktopTallHero_3000x1200._CB574597993__jx9u2s.jpg",
    },
    {
      url: "https://res.cloudinary.com/dunf6rko6/image/upload/v1706528262/3000._CB583024006__r8ermv.jpg",
    },
  ];

  const prevSlide = () => {
    const isFirstSlide = index === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : index - 1;
    setIndex(newIndex);
  };
  const nextSlide = () => {
    const isLastSlide = index === slides.length - 1;
    const newIndex = isLastSlide ? 0 : index + 1;
    setIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <div className=" bg-center  h-[100vh]  w-[full]  relative ">
      <div
        style={{
          backgroundImage: `url(${slides[index].url}`,
        }}
        className=" w-full h-full bg-center bg-cover duration-150 "
      >
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-gray-200 to-transparent"></div>
      </div>
      <div
        onClick={prevSlide}
        className="  absolute  top-[24.5%] outline-[#5d9fa9] flex items-center justify-center  -translate-x-0 translate-y-[-50%] left-7 text-2xl h-[48%] w-[5%] p-2  text-white cursor-pointer"
      >
        <BsChevronCompactLeft size={30} />
      </div>
      <div
        onClick={nextSlide}
        className=" absolute  top-[24%] outline-[#5d9fa9]    focus:border flex items-center justify-center -translate-x-0 translate-y-[-50%] right-7 text-2xl h-[48%] w-[5%]  p-2  text-white cursor-pointer"
      >
        <BsChevronCompactRight size={30} />
      </div>
    </div>
  );
};

export default HomeCarousel;
