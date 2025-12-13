import { useEffect, useState } from 'react';
import { faCaretDown, faPlay, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';

import Carousel from '../../Components/Carousel.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MovieInfoModal from './Components/MovieModal.tsx';
import { type MovieResponse } from '../../Api/Movie/Contracts/Responses/MovieResponse.ts';

import { useModal } from '../../Contexts/ModalContext.tsx';

import * as MovieService from '../../Api/Movie/MovieService.ts';

import './Home.css';

interface Breakpoint {
    carousel: {
        visible: number;
    };
};

export default function Home()
{
    const {setModal} = useModal();

    const [movies, setMovies] = useState<MovieResponse[]>([]);
    const [popularMovie, setPopularMovie] = useState<MovieResponse>();

    useEffect(() => {
        (async () => {
            const movies = await MovieService.get(1, 100);
            setMovies(movies);
            setPopularMovie(movies.sort(movie => movie.popularity).reverse()[0]);
        })();
    }, []);

    const [showCaret, setShowCaret] = useState<boolean>(true);
    const handleScroll = () => setShowCaret(!(window.scrollY > window.innerHeight/75));

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>();

    const breakpoints: Breakpoint[] = [
        {
            carousel: {
                visible: 6
            }
        },
        {
            carousel: {
                visible: 4
            }
        },
        {
            carousel: {
                visible: 3
            }
        }
    ];

    const handleResize = () => {
        if (window.innerWidth >= 1900) setCurrentBreakpoint(breakpoints[0]);
        else if (window.innerWidth >= 1600 && window.innerWidth < 1900) setCurrentBreakpoint(breakpoints[0]);
        else if (window.innerWidth >= 1300 && window.innerWidth < 1600) setCurrentBreakpoint(breakpoints[1]);
        else if (window.innerWidth >= 800 && window.innerWidth < 1300) setCurrentBreakpoint(breakpoints[2]);
    };

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const teatherTemplate = (movie: MovieResponse) => {
        const handleClick = () => {
            setModal(<MovieInfoModal movie={movie}/>);
        };

        return (
            <div className='bg-[#252525] h-100 w-65 carousel-entry rounded-2xl hover:scale-110 transition delay-125 cursor-pointer' onClick={handleClick}>
                <img className='object-cover h-full rounded-2xl' src={movie.posterPath} />
            </div>
        )
    };

    return (
        <div>
            <div className='pl-10 pr-10 w-full h-15 flex flex-row justify-between fixed bg-black/35 z-2 backdrop-blur-xl'>
                <div className='flex gap-5 items-center'>
                    <button className='cursor-pointer hover:text-gray-300 text-white'>
                        <FontAwesomeIcon icon={faCaretDown} />
                    </button>
                    <button className='cursor-pointer hover:text-gray-300 text-white'>
                        <img className='w-10 h-10 rounded-lg' src='profile.jpg' />
                    </button>
                </div>
                <div className='flex justify-center gap-5'>
                    <button className='cursor-pointer hover:text-gray-300 text-white'>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                    <button
                        className='cursor-pointer hover:text-gray-300 text-white'
                        onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        Início
                    </button>
                    <button
                        className='cursor-pointer hover:text-gray-300 text-white'
                        onClick={() => document.getElementById('popular')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                    >
                        Popular
                    </button>
                    <button
                        className='cursor-pointer hover:text-gray-300 text-white'
                        onClick={() => document.getElementById('originals')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                    >
                        Originais
                    </button>
                    <button
                        className='cursor-pointer hover:text-gray-300 text-white'
                        onClick={() => document.getElementById('most-rated')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                    >
                        Mais Avaliados
                    </button>
                </div>
                <div className='flex gap-5'>
                    <img className='h-15' src='symbol.png' />
                </div>
            </div>
            <div className='h-[calc(100vh)] bg-[#252525] text-white mb-10 overflow-hidden'>
                <div className='absolute z-1 p-5 h-full flex flex-col justify-center pl-10'>
                    <h1 className='text-5xl font-bold text-white'>{popularMovie?.title}</h1>
                    <div className='flex pt-5 pb-5 gap-4'>
                        <button className='block rounded bg-[#252525] hover:bg-[#151515] active:bg-[#101010] text-white h-13 w-45 py-2 font-semibold cursor-pointer'>
                            <FontAwesomeIcon className='pr-2' icon={faPlay} />
                            Assitir
                        </button>
                        <button className='block rounded bg-[#252525] hover:bg-[#151515] active:bg-[#101010] text-white h-13 w-35 py-2 font-semibold cursor-pointer'>
                            <FontAwesomeIcon className='pr-2' icon={faPlus} />
                            Minha Lista
                        </button>
                    </div>
                    <p className='text-white max-w-100'>{popularMovie?.synopsis}</p>
                </div>

                <div>
                    <img className='z-1 absolute w-[50%] rounded-md top-[50%] left-[60%] origin-center transform -translate-x-1/2 -translate-y-1/2' src={popularMovie?.backdropPath} />
                    <img className='h-full w-full blur-md' src={popularMovie?.backdropPath} />
                </div>

                <div className='absolute inset-0 bg-[linear-gradient(90deg,rgba(21,21,21,1),rgba(21,21,21,0))]' />
                <div className='absolute inset-0 bg-[linear-gradient(0deg,rgba(21,21,21,1),rgba(21,21,21,0))]' />

                <FontAwesomeIcon className={`absolute bottom-5 left-[50%] animate-bounce transition duration-250 ${showCaret ? `opacity-100` : `opacity-0`}`} icon={faCaretDown} />
            </div>
            <div className='p-5'>
                <div className='pl-10 pr-10 mb-10' id='popular'>
                    <h1 className='block mb-6 text-xl font-bold text-white'>Popular Agora</h1>
                    <Carousel value={movies.filter(movie => movie.popularity > 100)} visible={currentBreakpoint?.carousel.visible!} scroll={1} template={teatherTemplate}/>
                </div>
                <div className='pl-10 pr-10 mb-10' id='originals'>
                    <h1 className='block mb-6 text-xl font-bold text-white'>Filmes Originais</h1>
                    <Carousel value={movies.slice(10, 20).filter(movie => movie.original)} visible={currentBreakpoint?.carousel.visible!} scroll={1} template={teatherTemplate}/>
                </div>
                <div className='pl-10 pr-10 mb-10' id='most-rated'>
                    <h1 className='block mb-6 text-xl font-bold text-white'>Mais Avaliados</h1>
                    <Carousel value={movies.slice(20, 30).filter(movie => movie.rating >= 8)} visible={currentBreakpoint?.carousel.visible!} scroll={1} template={teatherTemplate}/>
                </div>
            </div>
        </div>
    );
}
