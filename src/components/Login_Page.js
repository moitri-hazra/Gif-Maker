import React, { useState } from 'react';
import userData from '../users.json';
import { useNavigate } from 'react-router-dom';
import gifMaker from '../assets/GifMaker1.jpg'


import Header from './Header';

const Login_Page = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const user = userData.find((u) => u.username === username && u.password === password);

    if (user) {
      console.log(`User ${username} logged in`);
      navigate('/CreateGif', { state: { username } });

    } else {
      setError('Wrong username or password');
    }
  };




  return (
    <>
      <div className="flex h-screen" style={{ backgroundColor: '#695958' }}>
        <div className="w-full flex items-center justify-center">
          <form

            className="rounded-lg p-6 mb-6"
            onSubmit={handleSubmit}
          >
            <div className="flex items-center justify-center">
              <img
                src={gifMaker}
                alt="Placeholder Image"
                className="rounded-full"
                style={{
                  height: "7rem"
                }}
              />
            </div>
            <div>
              <h1 className=" text-6xl Holyfat px-1 mb-4  pt-2 text-gray-100 text-center">
                Gif Maker
              </h1>
              <h5 className="px-1 mb-4 pt-2 text-gray-100 text-center italic opacity-50"> [username: Jane Doe, password: password123  ||  username: "Will Smith",
      password: securePass456 ]</h5>

            </div>
            <div className="mb-4">
              <input
                className="shadow appearance-none bg-neutral-100 rounded w-[20rem] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="usename"
                type="text"
                placeholder="Enter your user name"
                value={username}
                onChange={handleUsernameChange}
              />
              {error && (
                <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                  <svg
                    className="flex-shrink-0 inline w-4 h-4 mr-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span className="sr-only">Info</span>
                  <div>{error}</div>
                </div>
              )}
            </div>
            <div className="mb-6">
              <input
                className="shadow appearance-none bg-neutral-100 rounded w-[20rem] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Enter your Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                style={{ backgroundColor: '#2f3e46', transition: 'background-color 0.3s ease-in-out' }}
                className="hover:bg-#ff6f8d text-white font-bold w-[20rem] py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );

};

export default Login_Page