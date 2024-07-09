import { useForm } from 'react-hook-form';
import * as apiClient from "../api-client";
import { useMutation,useQueryClient } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {

    const navigate = useNavigate();
    const queryClient = useQueryClient();
   
    const {
        register,
        handleSubmit,
        formState: { errors } } =
        useForm();

    const mutation = useMutation(apiClient.loginUser, {
        onSuccess: async (data) => {
            console.log("User login Successful", data);
            await queryClient.invalidateQueries("validateToken");
            navigate("/");
        },
        onError: (error) => {
            console.log("Login failed", error.message);
        }
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });

    return (
        <form className='flex flex-col gap-10' onSubmit={onSubmit}>
            <label className='text-gray-700 text-md font-bold flex-1'>
                Email
                <input
                    type='email'
                    className='border rounded-md border-gray-700 w-full py-1 px-2 font-normal'
                    {...register("email", { required: "This field is required" })} />
                {errors.email && (
                    <p className='text-red-500'>
                        {errors.email.message}
                    </p>
                )}
            </label>

            <label className='text-gray-700 text-md font-bold flex-1'>
                Password
                <input
                    type='password'
                    className='border rounded-md border-gray-700 w-full py-1 px-2 font-normal'
                    {...register("password", { required: "This field is required" })} />
                {errors.password && (
                    <p className='text-red-500'>
                        {errors.password.message}
                    </p>
                )}
            </label>

            <span className='flex flex-row items-center'>
                <button
                    type='submit'
                    className='rounded bg-gray-700 text-white p-2 mt-2 font-bold hover:bg-gray-900'>
                    Sign In
                </button>
                <p className='pl-3'>Don't have an account? <Link to="/register" className='underline'>Register here</Link></p>
            </span>
        </form>
    );
}

export default SignIn;