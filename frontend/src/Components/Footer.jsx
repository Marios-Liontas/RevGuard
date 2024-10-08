import React from 'react';

const Footer = () => {
  return (
    <div className='bg-gray-900 py-3'>
      <div className='container mx-auto flex flex-col sm:flex-row justify-between items-center'>
        <span className='text-3xl text-white font-bold tracking-tight mb-4 sm:mb-0'>
          RevGuard.com
        </span>

        <span className='text-white font-bold flex flex-col sm:flex-row gap-4 tracking-tight'>
          <p className='cursor-pointer'>Privacy Policy</p>
          <p className='cursor-pointer'>Terms of Service</p>
          <p className='cursor-pointer'>About me</p>
        </span>
      </div>
    </div>
  );
};

export default Footer;
