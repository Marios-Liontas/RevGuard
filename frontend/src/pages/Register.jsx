import { useForm } from 'react-hook-form';
import * as apiClient from "../api-client";
import { useMutation, useQueryClient} from 'react-query';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const mutation = useMutation(apiClient.registerUser, {
        onSuccess: async (data) => {
            console.log("Registration Successful", data);
            await queryClient.invalidateQueries("validateToken");
            navigate("/");
        },
        onError: (error) => {
            console.error('Registration failed', error.message);
        }
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });

    return (
        <form className='flex flex-col gap-10' onSubmit={onSubmit}>

            <div className='flex flex-col md:flex-row gap-10'>

                <label className='text-gray-700 text-md font-bold flex-1'>
                    First Name
                  <input
                    className='border rounded-md border-gray-700 w-full py-1 px-2 font-normal'
                    {...register('firstName', { required: "This field is required" })} />
                  {errors.firstName &&
                        (<p className='text-red-500'>{errors.firstName.message}</p>)}
                </label>

               <label className='text-gray-700 text-md font-bold flex-1'>
                    Last Name        
                  <input className='border rounded-md border-gray-700 w-full py-1 px-2 font-normal'
                    {...register('lastName', { required: "This field is required" })} />
                  {errors.lastName &&
                        (<p className='text-red-500'>{errors.lastName.message}</p>)}
                </label>

            </div>

            <label className='text-gray-700 text-md font-bold flex-1'>
                Email
              <input
                className='border rounded-md border-gray-700 w-full py-1 px-2 font-normal'
                type='email'
                {...register('email', { required: "This field is required" })} />
              {errors.email &&
                    (<p className='text-red-500'>{errors.email.message}</p>)}
            </label>

            <label className='text-gray-700 text-md font-bold flex-1'>
                Password
              <input
                className='border rounded-md border-gray-700 w-full py-1 px-2 font-normal'
                type='password'
                    {...register('password',
                        {
                            required: "This field is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters long",
                            }
                        })} />
              {errors.password &&
                    (<p className='text-red-500'>{errors.password.message}</p>)}
            </label>

            <label className='text-gray-700 text-md font-bold flex-1'>
                Confirm Password
              <input
                className='border rounded-md border-gray-700 w-full py-1 px-2 font-normal'
                type='password'
                    {...register('confirmPassword', {
                        validate: (val) => {
                            if (!val) {
                                return  "This field is required"
                            } else if (watch("password") !== val) {
                                return  "Your passwords do not match"
                            }
                    }
                } )} />
              {errors.confirmPassword &&
                    (<p className='text-red-500'>{errors.confirmPassword.message}</p>)}
            </label>

            <span>
                <button
                    type='submit'
                    className='rounded bg-gray-700 text-white p-2 mt-2 font-bold hover:bg-gray-900'>
                    Create Account
                </button>
            </span>

        </form>
    )
}

export default Register;