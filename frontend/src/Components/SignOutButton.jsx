import { useMutation, useQueryClient} from "react-query"
import * as apiClient from '../api-client'
import { useNavigate } from "react-router-dom"

const SignOutButton = () => {

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const mutation = useMutation(apiClient.SignOut, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("validateToken");
            console.log("Logged out succefully");
            navigate('/');
        },
        onError: (error) => {
            console.log(error.message);
        }
    })

    const handleClick = () => {
        mutation.mutate();
    }

    return (
        <span>
            <button onClick={handleClick}
                className="text-white rounded bg-red-500 px-3 font-bold hover:bg-red-700">
                Sign Out
            </button>
        </span>
    )
}

export default SignOutButton;