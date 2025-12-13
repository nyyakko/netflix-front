import { useEffect, useRef, useState, type ReactElement } from 'react';

interface CarouselProps<T> {
    value: T[];
    visible: number;
    scroll: number;
    template?: (value: T) => ReactElement;
    className?: string;
    cycle?: boolean;
}

export default function Carousel<T>(props: CarouselProps<T>) {
    const [index, setIndex] = useState<number>(0);

    const handleScroll = (event: WheelEvent) => {
        if (!event.shiftKey) return;

        if (props.value.length < props.visible) {
            setIndex(0);
            return;
        }

        setIndex(index + ((index + event.deltaY) < 0 ? -1 : +1));
    };

    const carouselRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        carouselRef.current?.addEventListener('wheel', handleScroll);
        return () => carouselRef.current?.removeEventListener('wheel', handleScroll);
    });

    return (
        <div className={`flex justify-between ${props.className}`} ref={carouselRef}>
            {
                (() => {
                    let indexes = [...Array(props.visible).keys()].map(_index => _index + index);
                    return indexes.map(index => {
                        return props.value.map((value) => { return (
                            <div key={Math.random()} > {props.template!(value)} </div>
                        )})[((index % props.value.length) + props.value.length) % props.value.length]
                    });
                })()
            }
        </div>
    );
}
