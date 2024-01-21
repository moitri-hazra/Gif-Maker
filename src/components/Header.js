import React from 'react';
import gifMaker from '../assets/GifMaker.png';

const Header = ({ username }) => {
    const userInitial = username ? username.charAt(0).toUpperCase() : '';

    return (
        <header style={{ backgroundColor: '#2f3e46' }} className="p-2 flex justify-between items-center">
            <div className="flex items-center">
                <img src={gifMaker} style={{ height: '5rem', marginRight: '1rem' }} alt="Gif Maker Logo" />
                <div>
                    <h1 className="text-4xl Holyfat text-gray-100 text-center">
                        Gif Maker
                    </h1>
                </div>
            </div>
            <div className="flex items-center">
                <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center text-gray-800 font-bold">
                    {userInitial}
                </div>
            </div>
        </header>
    );
};

export default Header;
