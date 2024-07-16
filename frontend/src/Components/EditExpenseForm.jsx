import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as apiClient from "../api-client";
import { useNavigate } from 'react-router-dom';

const EditExpenseForm = ({ id }) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log(id);
        const fetchExpense = async () => {
            try {
                const data = await apiClient.GetExpenseById(id);
                const formattedDate = new Date(data.date).toISOString().split('T')[0];
                console.log(data);
                setValue("amount", data.amount);
                setValue("date", formattedDate);
                setValue("category", data.category);
                setValue("description", data.description);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchExpense();
    }, [id, setValue]);

    const onSubmit = async (data) => {
        try {
            await apiClient.UpdateExpense(id, data);
            navigate("/expense");
            console.log("Expense editing was successful", data);
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <form className='flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
            <label className='text-gray-700 text-md font-bold flex-1'>
                Amount
                <input
                    type="number"
                    step="0.01"
                    className='border rounded-md border-gray-700 w-full py-1 px-2 font-normal no-arrows'
                    {...register("amount", {
                        required: "This field is required",
                        pattern: {
                            value: /^\d+(\.\d{1,2})?$/,
                        }
                    })}
                />
                {errors.amount && (
                    <p className='text-red-500'>
                        {errors.amount.message}
                    </p>
                )}
            </label>

            <label className='text-gray-700 text-md font-bold flex-1'>
                Date
                <input
                    type="date"
                    className='border rounded-md border-gray-700 w-full py-1 px-2 font-normal no-arrows'
                    {...register("date", { required: "This field is required" })}
                />
                {errors.date && (
                    <p className='text-red-500'>
                        {errors.date.message}
                    </p>
                )}
            </label>

            <label className='text-gray-700 text-md font-bold flex-1'>
                Category
                <select
                    className='border rounded-md border-gray-700 w-full py-1 px-2 font-normal no-arrows'
                    {...register("category", { required: "This field is required" })}
                >
                    <option value="">Select a category</option>
                    <option value="Housing">Housing</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Food">Food</option>
                    <option value="Health">Health</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Miscellaneous">Miscellaneous</option>
                </select>
                {errors.category && (
                    <p className='text-red-500'>
                        {errors.category.message}
                    </p>
                )}
            </label>

            <label className='text-gray-700 text-md font-bold flex-1'>
                Description
                <input
                    type="text"
                    className='border rounded-md border-gray-700 w-full py-1 px-2 font-normal no-arrows'
                    {...register("description", { required: "This field is required" })}
                />
                {errors.description && (
                    <p className='text-red-500'>
                        {errors.description.message}
                    </p>
                )}
            </label>

            <span>
                <button
                    type='submit'
                    className='bg-blue-500 text-white py-2 px-4 rounded'>
                   Save
                </button>
            </span>
        </form>
    );
};

export default EditExpenseForm;
