import React from 'react'
import PickDate from '../Components/Datepicker';
import { Link } from 'react-router-dom';

export const Expense = () => {
    return (
        <div className='flex flex-col items-center space-y-4'>
            <div className='w-full flex justify-center'>
                <PickDate />
            </div>

            <RenderRevenues />

            <div className='w-full flex justify-center'>
                <Link to="/addrevenue">
                    <button
                        className='border p-2 font-bold bg-blue-300 rounded-md mt-4 hover:bg-blue-500'>
                        Add Revenue
                    </button>
                </Link>
            </div>

        </div>
    );
};

export default Revenue;