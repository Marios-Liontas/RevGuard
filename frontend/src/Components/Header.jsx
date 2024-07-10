import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import SignOutButton from './SignOutButton';

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className='bg-gray-900 py-3'>
      <div className='container mx-auto my-4 flex justify-between items-center'>
        <span className='text-3xl text-white font-bold tracking-tight'>
          <Link to="/">RevGuard</Link>
        </span>

        <span className='flex flex-row space-x-1'>
          {isLoggedIn ? (
            <>
              <Link to="/overview" className='flex items-center text-white px-3 font-bold hover:bg-gray-400'>
                Overview
              </Link>
              <Link to="/expense" className='flex items-center text-white px-3 font-bold hover:bg-gray-400'>
                Expense
              </Link>
              <Link to="/revenue" className='flex items-center text-white px-3 font-bold hover:bg-gray-400'>
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
