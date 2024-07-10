import React, { useState, useEffect } from 'react';
import * as apiClient from "../api-client";
import "../css/styles.css"
import { FaEdit, FaTrash } from 'react-icons/fa';


const RenderExpenses = () => {

    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const data = await apiClient.GetExpenses();
                setExpenses(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchExpenses();
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

    const expenseTotal = () => {
        let total = 0;
        for (let i = 0; i < expenses.length; i++) {
            total = total + expenses[i].amount;
        }
        return total;
    }

    const handleEdit = (id) => {
        console.log("Editing Expense");
    }

    const handleDelete = (id) => {
        console.log("Deleting Expense");
    }


    return (
        <div>

            <span className='flex flex-row gap-5 justify-center pb-5'><h3 className='font-bold tracking-tight text-3xl'>Total Expenses:</h3> <p className='font-bold tracking-tight text-3xl'> - {expenseTotal().toFixed(2)}  €</p></span>

            {expenses.length === 0 ? (
                <div className='flex items-center justify-center h-full'>
                    <p>No expenses found!</p>
                </div>
            ) : (
                <div className='flex items-center justify-center'>
                    <ul className='flex flex-wrap gap-4 justify-center '>
                        {expenses.map((expense) => (
                            <li className='relative p-5 flex flex-col items-center min-w-[300px] max-w-[300px] border border-gray-900 rounded-md gray-900 bg-gray-300 hover:bg-gray-400' key={expense._id}>
                                <div className="absolute top-2 right-2 flex gap-2">
                                    <FaEdit
                                        className="text-blue-500 cursor-pointer"
                                        onClick={() => handleEdit(expense._id)}
                                    />
                                    <FaTrash
                                        className="text-red-500 cursor-pointer"
                                        onClick={() => handleDelete(expense._id)}
                                    />
                                </div>
                                <p><span className='font-bold tracking-tight'>Amount:</span> - {expense.amount} €</p>
                                <p> <span className='font-bold tracking-tight'>Date:</span>   {formatDate(expense.date)}</p>
                                <p className='truncate max-w-[250px]'><span className='font-bold tracking-tight'>Description:</span>   {expense.description}</p>
                            </li>
                        
                        ))}
                    </ul>
                </div>
                
            )}
        </div>
    );
};


export default RenderExpenses;