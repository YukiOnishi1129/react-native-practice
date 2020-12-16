import React from 'react';
import SnapCarousel from 'react-native-snap-carousel';
import CarouselItem from '../molcules/CarouselItem';
import { width } from '../../lib/window';

interface Props {
  onEnd: () => void;
  onNext: () => void;
  carouselRef: any;
  onSnapToItem: (slide: number) => void;
  data: { text: string }[];
}

export default function Carousel(props: Props) {
  const { onEnd, onNext, onSnapToItem, carouselRef, data } = props;

  return (
    <SnapCarousel
      data={data}
      ref={carouselRef}
      renderItem={({ item, index }: { item: any; index: number }) => (
        <CarouselItem item={item} onPress={index === data.length - 1 ? onEnd : onNext} />
      )}
      sliderWidth={width}
      itemWidth={width}
      onSnapToItem={onSnapToItem}
    />
  );
}
