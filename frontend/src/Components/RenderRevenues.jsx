import React, { useState, useEffect } from 'react';
import * as apiClient from "../api-client";
import "../css/styles.css"
import { FaEdit, FaTrash} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const RenderRevenues = () => {

    const [revenues, setRevenues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortConfig, setSortConfig] = useState({key:null, direction:"asc"})
    const navigate = useNavigate();

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

    const sortedRevenues = [...revenues].sort((a, b) => {
        if (sortConfig.key === 'date') {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return sortConfig.direction === 'asc'
                ? dateA - dateB
                : dateB - dateA;
        } else if (sortConfig.key === 'amount') {
            return sortConfig.direction === 'asc'
                ? a.amount - b.amount
                : b.amount - a.amount;
        }
        return 0 // Important to return 0 if no sorting condition is met
    });

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

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
        for (let i = 0; i < sortedRevenues.length; i++) {
            total = total + sortedRevenues[i].amount;
        }
        return total;
    }

    const handleEdit = (id) => {
        console.log(`Navigating to edit revenue with id: ${id}`);
        navigate(`/edit-revenue/${id}`);
    }

    const handleDelete = async (id) => {
                try {
                    await apiClient.DeleteRevenue(id);
                    console.log("revenue is being deleted");
                    setRevenues(prevRevenues => prevRevenues.filter(revenue => revenue._id !== id));
                } catch (error) {
                    console.error("Error deleting revenue", error.message);
                }
            }
        

    return (
        <div>

            <span className='flex flex-row gap-5 justify-center pb-5'>
                <h3 className='font-bold tracking-tight text-3xl'>
                    Total Revenue:
                </h3> <p className='font-bold tracking-tight text-3xl'>
                    {revenueTotal().toFixed(2)}  €
                </p>
            </span>

            <div className='flex justify-center pb-5 gap-4 flex-row pl-7'>
                <button
                    className='border p-2 rounded-md font-bold tracking-tight bg-blue-300'
                    onClick={() => requestSort('date')}>
                    Sort by Date
                </button>
                <button
                    className='border p-2 rounded-md font-bold tracking-tight bg-blue-300'
                    onClick={() => requestSort('amount')}>
                    Sort by Amount
                </button>
            </div>

            {sortedRevenues.length === 0 ? (
                <div className='flex items-center justify-center h-full'>
                    <p>No revenues found!</p>
                </div>
            ) : (
                <div className='flex items-center justify-center'>
                    <ul className='flex flex-wrap gap-4 justify-center '>
                        {sortedRevenues.map((revenue) => (
                            <li className='relative p-5 flex flex-col items-center min-w-[300px] max-w-[300px] border border-gray-900 rounded-md gray-900 bg-gray-300 hover:bg-gray-400' key={revenue._id}>
                                <div className="absolute top-2 right-2 flex gap-2">
                                    <FaEdit
                                        className="text-blue-500 cursor-pointer"
                                        onClick={() => handleEdit(revenue._id)}
                                    />
                                    <FaTrash
                                        className="text-red-500 cursor-pointer"
                                        onClick={() => handleDelete(revenue._id)}
                                    />
                                </div>
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