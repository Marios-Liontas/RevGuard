import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

const RevenueChart = ({ revenues }) => {
    const sortedByDateRevenues = [...revenues].sort((a, b) => new Date(a.date) - new Date(b.date));

    const lineChartData = sortedByDateRevenues.map(revenue => ({
        date: formatDate(revenue.date),
        amount: revenue.amount,
    }));

    return (
        <div className='pr-8 flex' style={{ width: '100%', height: '400px' }}>
            <ResponsiveContainer>
                <LineChart
                    data={lineChartData}
                    margin={{ top: 20, right: 20, bottom: 60, left: 40 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="date"
                        label={{ value: 'Date', position: 'insideBottomRight', offset: -10, fontSize: 12 }}
                        tick={{ fontSize: 12 }}
                        angle={-20}
                        textAnchor="end"
                    />
                    <YAxis
                        label={{ value: 'Amount', angle: -90, position: 'insideLeft', offset: 0, fontSize: 12 }}
                        tick={{ fontSize: 12 }}
                    />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="amount"
                        stroke="#0000ff"
                        strokeWidth={2}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

const ExpenseChart = ({ expenses }) => {
    const sortedByDateExpenses = [...expenses].sort((a, b) => new Date(a.date) - new Date(b.date));

    const lineChartData = sortedByDateExpenses.map(expense => ({
        date: formatDate(expense.date),
        amount: expense.amount,
    }));

    return (
        <div className='pr-8 flex' style={{ width: '100%', height: '400px' }}>
            <ResponsiveContainer>
                <LineChart
                    data={lineChartData}
                    margin={{ top: 20, right: 20, bottom: 60, left: 40 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="date"
                        label={{ value: 'Date', position: 'insideBottomRight', offset: -10, fontSize: 12 }}
                        tick={{ fontSize: 12 }}
                        angle={-20}
                        textAnchor="end"
                    />
                    <YAxis
                        label={{ value: 'Amount', angle: -90, position: 'insideLeft', offset: 0, fontSize: 12 }}
                        tick={{ fontSize: 12 }}
                    />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="amount"
                        stroke="#ff0000"
                        strokeWidth={2}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export { RevenueChart, ExpenseChart };
