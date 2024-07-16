import React from 'react';
import { useParams } from 'react-router-dom';
import EditExpenseForm from '../Components/EditExpenseForm';

const EditExpense = () => {
    const { id } = useParams();
    return (
        <div>
            <h1 className='flex justify-center pb-3 font-bold tracking-tight text-xl'>
                Editing Expense
            </h1>
            <EditExpenseForm id={id} />
        </div>
    );
};

export default EditExpense;