import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as apiClient from "../api-client";
import { useNavigate} from 'react-router-dom';

const EditRevenueForm = ({ id }) => {
    const {
        register,
        handleSubmit
        , setValue,
        formState: { errors }
    } = useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRevenue = async () => {
            try {
                const data = await apiClient.GetRevenueById(id);
                const formattedDate = new Date(data.date).toISOString().split('T')[0];
                console.log(data);
                setValue("amount", data.amount);
                setValue("date", formattedDate);
                setValue("description", data.description);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchRevenue();
    }, [id, setValue]);

    const onSubmit = async (data) => {
        try {
            await apiClient.UpdateRevenue(id, data);
            navigate("/revenue");
            console.log("Revenue editing was successfull", data)
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
            <label className='text-gray-700 text-md font-bold flex-1'>
                Amount
                <input
                    type="number"
                    step="0.01" // Allows for 2 decimals
                    className='border rounded-md border-gray-700 w-full py-1 px-2 font-normal no-arrows'
                    {...register("amount", {
                        required: "This field is required",
                        pattern: {
                            value: /^\d+(\.\d{1,2})?$/, // Regex for up to 2 decimal places
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

export default EditRevenueForm;
