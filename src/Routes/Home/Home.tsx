import './Home.css';

export default function Home()
{
    return (
        <div className='w-full 2xl:flex 2xl:flex-col h-[100vh] pl-10 pr-10'>
            <div className='w-full h-fit flex flex-row justify-between sticky top-0 bg-pink'>
                <div className='flex gap-5'>
                    <img className='h-15' src='logo.png' />
                    <div className='flex justify-center gap-5'>
                        <button className='cursor-pointer hover:text-gray-300 text-white'>Home</button>
                        <button className='cursor-pointer hover:text-gray-300 text-white'>Trending</button>
                        <button className='cursor-pointer hover:text-gray-300 text-white'>Recently Added</button>
                        <button className='cursor-pointer hover:text-gray-300 text-white'>My List</button>
                    </div>
                </div>
                <div className='flex gap-5'>
                    <button className='cursor-pointer hover:text-gray-300 text-white'>Search</button>
                    <button className='cursor-pointer hover:text-gray-300 text-white'>Profile</button>
                </div>
            </div>
            <div>
            </div>
        </div>
    );
}
