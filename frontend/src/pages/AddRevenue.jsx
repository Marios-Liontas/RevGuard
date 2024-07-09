import React from 'react';
import { useForm } from 'react-hook-form';
import '../css/styles.css';
import * as apiClient from "../api-client"
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';

const AddRevenue = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const mutation = useMutation(apiClient.CreateRevenue, {
        onSuccess: async (data) => {
            console.log("Revenue added successfully", data);
            await queryClient.invalidateQueries("revenue");
            navigate("/revenue");
            reset();
        },
        onError: (error) => {
            console.log("Failed to add revenue", error.message);
        }
    });
    const onSubmit = handleSubmit((data) => {
        console.log("Form data:", data);
        mutation.mutate(data);
    });

    return (
        <form className='flex flex-col gap-5' onSubmit={onSubmit}>
            
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
                   Add Revenue
                </button>
            </span>
        </form>
    );
}

export default AddRevenue;