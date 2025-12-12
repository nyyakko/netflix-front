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

        if (event.deltaY < 0) {
            setIndex(index === 0 ? props.value.length - props.visible : index - 1);
        } else {
            setIndex(index === props.value.length - props.visible ? 0 : index + 1);
        }
    };

    const carouselRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        carouselRef.current?.addEventListener('wheel', handleScroll);
        return () => carouselRef.current?.removeEventListener('wheel', handleScroll);
    });

    return (
        <div className={`flex gap-15 w-fit ${props.className}`} ref={carouselRef}>
            {
                (() => {
                    let indexes = [...Array(props.visible).keys()].map(_index => _index + index);
                    return indexes.map(index => {
                        return props.value.map((value) => { return (
                            <div key={Math.random()} > {props.template!(value)} </div>
                        )})[index]
                    });
                })()
            }
        </div>
    );
}
