import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import SignOutButton from './SignOutButton';

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className='bg-gray-900 py-3'>
      <div className='container mx-auto my-4 flex flex-col md:flex-row justify-between items-center'>
        {/* Logo Section */}
        <span className='text-3xl text-white font-bold tracking-tight mb-4 md:mb-0'>
          <Link to="/">RevGuard</Link>
        </span>

        {/* Navigation Links */}
        <span className='flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4'>
          {isLoggedIn ? (
            <>
              <Link to="/overview" className='text-white px-3 font-bold hover:bg-gray-400 py-2 md:py-0'>
                Overview
              </Link>
              <Link to="/expense" className='text-white px-3 font-bold hover:bg-gray-400 py-2 md:py-0'>
                Expense
              </Link>
              <Link to="/revenue" className='text-white px-3 font-bold hover:bg-gray-400 py-2 md:py-0'>
                Revenue
              </Link>
              <SignOutButton/>
            </>
          ) : (
              <></>
          )}
        </span>
      </div>
    </div>
  );
}

export default Header;
