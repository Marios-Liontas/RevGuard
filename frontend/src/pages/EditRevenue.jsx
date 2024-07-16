import React from 'react';
import { useParams } from 'react-router-dom';
import EditRevenueForm from '../Components/EditRevenueForm';

const EditRevenue = () => {
    const { id } = useParams();
    return (
        <div>
            <h1 className='flex justify-center pb-3 font-bold tracking-tight text-xl'>
                Editing Revenue
            </h1>
            <EditRevenueForm id={id} />
        </div>
    );
};

export default EditRevenue;