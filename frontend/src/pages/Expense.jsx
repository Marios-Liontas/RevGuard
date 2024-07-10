import React from 'react'
import PickDate from '../Components/Datepicker';
import { Link } from 'react-router-dom';
import RenderExpenses from '../Components/RenderExpenses';

export const Expense = () => {
    return (
        <div className='flex flex-col items-center space-y-4'>
            <div className='w-full flex justify-center'>
                <PickDate />
            </div>

            <RenderExpenses/>

            <div className='w-full flex justify-center'>
                <Link to="/addexpense">
                    <button
                        className='border p-2 font-bold bg-blue-300 rounded-md mt-4 hover:bg-blue-500'>
                        Add Expense
                    </button>
                </Link>
            </div>

        </div>
    );
};

export default Expense;