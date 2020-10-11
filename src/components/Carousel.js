import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselCaption,
  CarouselIndicators,
  CarouselControl,
} from 'reactstrap';

export default ({ carousel }) => {
  const [activeIndex, setActive] = useState(0);
  const [anim, setAnim] = useState(false);
  const next = () => {
    if (anim) return;
    const nextIndex = activeIndex === carousel.length - 1 ? 0 : activeIndex + 1;
    setActive(nextIndex);
  };

  const previous = () => {
    if (anim) return;
    const prevIndex = activeIndex === 0 ? carousel.length - 1 : activeIndex - 1;
    setActive(prevIndex);
  };

  const goToIndex = (idx) => {
    if (anim) return;
    setActive(idx);
  };

  const slides = carousel.map((item, idx) => {
    return (
      <CarouselItem
        onExiting={() => setAnim(true)}
        onExited={() => setAnim(false)}
        key={idx}
      >
        <img
          src={item.image}
          alt={`slide-${idx}`}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
        <CarouselCaption captionText='' captionHeader={item.title} />
      </CarouselItem>
    );
  });

  return (
    <Carousel activeIndex={activeIndex} next={next} previous={previous}>
      <CarouselIndicators
        items={carousel}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction='prev'
        directionText='Previous'
        onClickHandler={previous}
      />
      <CarouselControl
        direction='next'
        directionText='Next'
        onClickHandler={next}
      />
    </Carousel>
  );
};
