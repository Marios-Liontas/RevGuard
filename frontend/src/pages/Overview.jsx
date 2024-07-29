import React, { useState, useEffect } from 'react';
import * as apiClient from "../api-client";
import "../css/styles.css";
import { RevenueChart, ExpenseChart } from '../Components/charts';

const OverviewPage = () => {
    const [revenues, setRevenues] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const revenueData = await apiClient.GetRevenues();
                const expenseData = await apiClient.GetExpenses();
                setRevenues(revenueData);
                setExpenses(expenseData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const calculateTotal = (data) => data.reduce((total, item) => total + item.amount, 0);

    const totalRevenue = calculateTotal(revenues);
    const totalExpenses = calculateTotal(expenses);
    const netBalance = totalRevenue - totalExpenses;

    const getRecentTransactions = (revenues, expenses) => {
        // Combine revenues and expenses, adding a type indicator for formatting
        const combined = [...revenues.map(r => ({ ...r, type: 'revenue' })), ...expenses.map(e => ({ ...e, type: 'expense' }))];
        return combined.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
    };

    const getHighestTransaction = (data) => data.length ? Math.max(...data.map(item => item.amount)) : 0;
    const getLowestTransaction = (data) => data.length ? Math.min(...data.map(item => item.amount)) : 0;

    const getTransactionStyle = (type) => {
        return type === 'expense'
            ? 'bg-red-100 text-red-800'
            : 'bg-green-100 text-green-800';
    };

    return (
        <div className='p-6'>
            <h1 className='text-3xl font-bold mb-4'>Overview</h1>

            <div className='mb-8'>
                <h2 className='text-2xl font-bold mb-2'>Summary</h2>
                <div className='flex flex-col md:flex-row md:justify-around mb-4'>
                    <div className='p-4 bg-blue-100 rounded-md shadow-md text-center'>
                        <h3 className='text-xl font-semibold'>Total Revenue</h3>
                        <p className='text-lg'>{totalRevenue.toFixed(2)} €</p>
                    </div>
                    <div className='p-4 bg-green-100 rounded-md shadow-md text-center'>
                        <h3 className='text-xl font-semibold'>Net Balance</h3>
                        <p className='text-lg'>{netBalance.toFixed(2)} €</p>
                    </div>
                    <div className='p-4 bg-red-100 rounded-md shadow-md text-center'>
                        <h3 className='text-xl font-semibold'>Total Expenses</h3>
                        <p className='text-lg'>{totalExpenses.toFixed(2)} €</p>
                    </div>
                </div>
            </div>

            <div className='mb-8'>
                <h2 className='text-2xl font-bold mb-2'>Key Metrics</h2>
                <div className='flex flex-col md:flex-row md:justify-around mb-4'>
                    <div className='p-4 bg-gray-100 rounded-md shadow-md text-center'>
                        <h3 className='text-xl font-semibold'>Highest Revenue</h3>
                        <p className='text-lg'>{getHighestTransaction(revenues).toFixed(2)} €</p>
                    </div>
                    <div className='p-4 bg-gray-100 rounded-md shadow-md text-center'>
                        <h3 className='text-xl font-semibold'>Lowest Expense</h3>
                        <p className='text-lg'>{getLowestTransaction(expenses).toFixed(2) || 'N/A'} €</p>
                    </div>
                </div>
            </div>

            <div className='mb-8'>
                <h2 className='text-2xl font-bold mb-2'>Recent Transactions</h2>
                <ul className='border border-gray-300 rounded-md'>
                    {getRecentTransactions(revenues, expenses).map((item, index) => (
                        <li key={index} className={`p-4 border-b border-gray-200 ${getTransactionStyle(item.type)}`}>
                            <p><span className='font-bold'>Amount:</span> {item.type === 'expense' ? `- ${item.amount.toFixed(2)}` : item.amount.toFixed(2)} €</p>
                            <p><span className='font-bold'>Date:</span> {new Date(item.date).toLocaleDateString()}</p>
                            <p><span className='font-bold'>Description:</span> {item.description}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <div className='flex flex-col md:flex-row md:gap-8'>
                <div className='w-full md:w-1/2 mb-8'>
                    <h2 className='text-2xl font-bold mb-2'>Revenue Chart</h2>
                    <RevenueChart revenues={revenues} />
                </div>
                <div className='w-full md:w-1/2 mb-8'>
                    <h2 className='text-2xl font-bold mb-2'>Expense Chart</h2>
                    <ExpenseChart expenses={expenses} />
                </div>
            </div>
        </div>
    );
};

export default OverviewPage;
