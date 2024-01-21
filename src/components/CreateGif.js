import React, { useState } from 'react';
import { createGIF } from 'gifshot';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const CreateGif = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedImages, setSelectedImages] = useState([null, null, null]);
    const [createdGif, setCreatedGif] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [frameDuration, setFrameDuration] = useState(null);

    const location = useLocation();
    const { state } = location;
    const username = state ? state.username : '';

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!allowedTypes.includes(file.type)) {
                alert('Please upload a valid JPG, JPEG, or PNG image.');
                return;
            }

            const maxSize = 5 * 1024 * 1024; 
            if (file.size > maxSize) {
                alert('File size exceeds the maximum limit of 5MB.');
                return;
            }
    
            const updatedImages = [...selectedImages];
            updatedImages[currentPage - 1] = URL.createObjectURL(file);
            setSelectedImages(updatedImages);
        }
    };
    

    const handleCreateGif = () => {
        const images = selectedImages.filter((image) => image !== null);

        if (images.length === 3) {
            const options = {
                images,
                gifWidth: 500,
                gifHeight: 300,
                numWorkers: 5,
                frameDuration: parseFloat(frameDuration),
                sampleInterval: 10,
                progressCallback: () => { },
            };

            createGIF(options, (obj) => {
                if (!obj.error) {
                    console.log('GIF Image: ', obj.image);
                    setCreatedGif(obj.image);
                }
            });
        }
    };

    const handleDownload = () => {
        const a = document.createElement('a');
        a.href = createdGif;
        a.download = 'created_with_GifMaker.gif';
        a.click();
    };

    const handlePlayToggle = () => {
        setPlaying(!playing);
    };

    const placeholderUrls = [
        'https://via.placeholder.com/400x200?text=Click to upload',
        'https://via.placeholder.com/400x200?text=Click to upload',
        'https://via.placeholder.com/400x200?text=Click to upload',
    ];

    const isCreateButtonDisabled = selectedImages.some((image) => image === null) || !frameDuration;

    return (
        <>
            <div className="h-screen" style={{ backgroundColor: '#695958' }}>
                <Header username={username} />
                <div className="flex flex-col md:flex-row">
                    <div className="flex-1 md:w-1/2 p-4">
                        <label htmlFor={`imageInput${currentPage}`} className="cursor-pointer">
                            <div
                                className="w-[20rem] h-[20rem] mx-auto my-4 cursor-pointer border border-gray-300 overflow-hidden relative"
                                style={{ maxWidth: '100%' }}
                            >
                                <img
                                    src={selectedImages[currentPage - 1] || placeholderUrls[currentPage - 1]}
                                    alt={`Image ${currentPage}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </label>
                        <input
                            type="file"
                            id={`imageInput${currentPage}`}
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                        />
                        <button
                            style={{ backgroundColor: '#2f3e46' }}
                            className="mt-2 text-white px-3 py-1 rounded"
                            onClick={() => document.getElementById(`imageInput${currentPage}`).click()}
                        >
                            Select Image
                        </button>
                        <div className="flex items-center justify-center p-2">
                            {[1, 2, 3].map((pageNumber) => (
                                <button
                                    key={pageNumber}
                                    style={{ backgroundColor: '#e5d6c9', marginTop: '12px' }}
                                    className={`mx-2 text-black px-3  py-1 rounded-full ${currentPage === pageNumber ? 'bg-white text-blue-500' : ''}`}
                                    onClick={() => handlePaginationClick(pageNumber)}
                                >
                                    {pageNumber}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 md:w-1/2 p-4" style={{ backgroundColor: '#e5d6c9' }}>
                        <div className="relative w-[20rem] h-[20rem] mx-auto mb-4">
                            <img
                                src={createdGif}
                                className="w-full h-full object-cover"
                                style={{ display: playing ? 'none' : 'block' }}
                            />
                        </div>
                        <div className="flex items-center mb-2">
                            <label htmlFor="frameDuration" className="mr-4 px-2 text-black">Frame Duration(s) :</label>
                            <input
                                id="frameDuration"
                                type="number"
                                min="1"
                                max="10"
                                step="1"
                                value={frameDuration}
                                onChange={(e) => setFrameDuration(e.target.value)}
                                className="bg-gray-700 text-white px-2 py-1 rounded"
                            />
                        </div>
                        <div className="flex flex-col items-center">
                            <button
                                style={{ backgroundColor: '#2f3e46' }}
                                className={`text-white px-3 py-1 rounded mb-2 ${isCreateButtonDisabled ? 'cursor-not-allowed bg-gray-500' : ''}`}
                                onClick={handleCreateGif}
                                disabled={isCreateButtonDisabled}
                            >
                                Create GIF
                            </button>
                            <button
                                className={`bg-blue-500 text-white px-3 py-1 rounded ${createdGif && !playing ? '' : 'bg-gray-500 cursor-not-allowed'}`}
                                onClick={handleDownload}
                                disabled={!createdGif || playing}
                            >
                                Download GIF
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CreateGif;
