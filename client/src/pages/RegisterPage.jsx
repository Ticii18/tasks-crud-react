import { useForm } from 'react-hook-form'
import { useAuth } from '../context/authContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm()

    const { signUp, isAuthenticated, errors: registerErrors } = useAuth()

    const navigate = useNavigate()


    useEffect(() => {
        if (isAuthenticated) navigate("/tasks")
    }, [isAuthenticated])

    const onSubmit = handleSubmit(async (values) => {
        signUp(values)
    })
    return (
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">
            
            
            
            <div className='bg-zinc-800 max-w-md w-full p-10 rounded-r-md'>
            {
                registerErrors.map((error, i) => (
                    <div className='bg-red-500 p-2 text-white' key={i}>
                        {error}
                    </div>
                ))
            }
            <h1 className='text-2xl font-bold'>Register</h1>

                <form onSubmit={onSubmit}>
                    <input type="text" placeholder='Username' {...register('username', { required: true })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    />

                    {
                        errors.username && <p className='text-red-500'>Username is required</p>
                    }

                    <input type="email" placeholder='email' {...register('email', { required: true })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />
                    {
                        errors.email && <p className='text-red-500'>email is required</p>
                    }

                    <input type="password" placeholder='password' {...register('password', { required: true })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />
                    {
                        errors.password && <p className='text-red-500'>password is required</p>
                    }
                    <button class="bg-transparent hover:bg-blue-500 text-sky-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded my-2" type='submit'>
                        Register
                    </button>
                </form>
                <p className='flex gap-x-2 justify-between'>Alread have an account=
                    <Link className='text-sky-500' to='/login'>Sign in here</Link>
                </p>
            </div>
        </div>
    )
}

export default RegisterPage