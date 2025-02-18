import {useState, useEffect} from 'react'
import authService from '../appwrite/auth.service'
import {Link, useNavigate} from 'react-router-dom'
import { login } from '../store/authSlice'
import {Button, Input, Logo} from '../components/index.js'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

function SignUp() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const userData = useSelector((state) => state.auth.userData); // Get the logged-in user data from the Redux store

    useEffect(() => {
        if (userData) {
            navigate('/'); // Navigate to home page if user is signed up
        }
    }, [userData, navigate]);

    const signup = async(data) => {
        setError("")
        try {
            const userdata = await authService.createAccount(data)
            if(userdata){
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData))
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className="flex items-center justify-center pt-5 pb-5">
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                <span className="inline-block w-full max-w-[100px]">
                    <Logo width='50px'/>
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign Up to create account</h2>
            <p className="mt-2 text-center text-base text-black/60">
            Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            <form onSubmit={handleSubmit(signup)}>
                <div className='space-y-5'>
                    <Input
                    label="Name: "
                    placeholder="Enter your full name"
                    {...register("name", {
                        required: true,
                    })}
                    />
                    <Input 
                    label = "Email: "
                    placeholder="Enter your email"
                    type="email"
                    {...register("email", {
                            required: true,
                            validate: { matchPattern :(value) =>  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be valid address",
                            }
                    })}
                    />
                    <Input
                    label="Password: "
                    placeholder="Enter your password"
                    type="password"
                    {...register("password",{
                        required:true,
                    })}
                    />
                    <Button
                    type="Submit"
                    className='w-full'
                    >Create Account</Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default SignUp