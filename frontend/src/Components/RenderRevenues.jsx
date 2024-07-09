import React, { useState, useEffect } from 'react';
import * as apiClient from "../api-client";
import "../css/styles.css"

const RenderRevenues = () => {

    const [revenues, setRevenues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRevenues = async () => {
            try {
                const data = await apiClient.GetRevenues();
                setRevenues(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchRevenues();
    }, []);

    if (loading) return <p>loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = date.getFullYear(); 
        return `${day}-${month}-${year}`; // Format to "05-07-2024"
    };

    const revenueTotal = () => {
        let total = 0;
        for (let i = 0; i < revenues.length; i++) {
            total = total + revenues[i].amount;
        }
        return total;
    }

    return (
        <div>

            <span className='flex flex-row gap-5 justify-center pb-5'><h3 className='font-bold tracking-tight text-3xl'>Total Revenue:</h3> <p className='font-bold tracking-tight text-3xl'> {revenueTotal().toFixed(2)}  €</p></span>

            {revenues.length === 0 ? (
                <p>No revenues found!</p>
            ) : (
                <div className='flex items-center justify-center'>
                    <ul className='flex flex-wrap gap-4 justify-center '>
                        {revenues.map((revenue) => (
                            <li className='p-5 flex flex-col items-center min-w-[300px] max-w-[300px] border border-gray-900 rounded-md gray-900' key={revenue._id}>
                                <p><span className='font-bold tracking-tight'>Amount:</span>    {revenue.amount} €</p>
                                <p> <span className='font-bold tracking-tight'>Date:</span>   {formatDate(revenue.date)}</p>
                                <p className='truncate max-w-[250px]'><span className='font-bold tracking-tight'>Description:</span>   {revenue.description}</p>
                            </li>
                        
                        ))}
                    </ul>
                </div>
                
            )}
        </div>
    );
};


export default RenderRevenues;