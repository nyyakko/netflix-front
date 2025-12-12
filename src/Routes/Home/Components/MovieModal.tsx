import { createPortal } from 'react-dom';

import type { MovieResponse } from '../../../Api/Movie/Contracts/Responses/MovieResponse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { useModal } from '../../../Contexts/ModalContext';

export default function MovieInfoModal({ movie }: { movie: MovieResponse })
{
    const { setModal } = useModal();

    const handleKeypress = (event: KeyboardEvent) => {
        if (event.key == 'Escape') {
            setModal(undefined);
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeypress);
        return () => document.removeEventListener('keydown', handleKeypress);
    }, []);

    return createPortal((
        <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[35%] md:w-[75%] lg:w-[80%] lg:aspect-video bg-[#252525] z-50 overflow-auto rounded-2xl flex justify-between'>
            <div className='flex flex-col z-1 p-10 gap-4'>
                <h1 className='text-6xl text-white'>{movie.title}</h1>

                <div className='flex flex-row items-center gap-4'>
                    <h1 className='text-lg font-bold text-green-400'>{`Avaliações: ${Math.round(movie.rating/10 * 100)}%`}</h1>
                    <h1 className='text-white'>{`Lançamento: ${new Date(movie.releaseDate).toLocaleDateString('en-ca')}`}</h1>
                </div>

                <p className='text-xl text-white/80 max-w-400'>{movie.synopsis}</p>

                <div className='flex pt-5 pb-5 gap-4'>
                    <button className='block rounded bg-red-600 hover:bg-red-700 active:bg-red-900 text-white h-13 w-45 py-2 font-semibold cursor-pointer'>
                        <FontAwesomeIcon className='pr-2' icon={faPlay} />
                        Assitir
                    </button>
                    <button className='block rounded bg-[#252525] hover:bg-[#151515] active:bg-[#101010] text-white h-13 w-35 py-2 font-semibold cursor-pointer'>
                        <FontAwesomeIcon className='pr-2' icon={faPlus} />
                        Minha Lista
                    </button>
                </div>
            </div>
            <div>
                <img className='object-cover h-full w-300' src={movie.backdropPath} />
                <div className='absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,1),rgba(21,21,21,0))]' />
            </div>
        </div>
    ), document.querySelector('#modal-root')!);
}
