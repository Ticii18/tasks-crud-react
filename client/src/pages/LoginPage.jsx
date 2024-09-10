import { useForm } from 'react-hook-form'
import { useAuth } from '../context/authContext'
import { Link } from 'react-router-dom'

function LoginPage() {

  const { register, handleSubmit, formState: { errors } } = useForm()

  const { signIn, errors: signinErrors } = useAuth()

  const onSubmit = handleSubmit(data => {
    signIn(data)
  })


  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
      <div className='bg-zinc-800 max-w-md w-full p-10 rounded-r-md'>
        {
          signinErrors.map((error, i) => (
            <div className='bg-red-500 p-2 text-white text-center my-2' key={i}>
              {error}
            </div>
          ))
        }

        <h1 className='text-2xl font-bold'>Login</h1>


        <form onSubmit={onSubmit}>
          <input type="email" placeholder='email' {...register('email', { required: true })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />
          {
            errors.email && <p className='text-red-500'>email is required</p>
          }

          <input type="password" placeholder='password' {...register('password', { required: true })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />
          {
            errors.password && <p className='text-red-500'>password is required</p>
          }
          <button className='bg-transparent hover:bg-blue-500 text-sky-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded my-2' type='submit'>
            Login
          </button>
        </form>
        <p className='flex gap-x-2 justify-between'>Don't have an account?
          <Link className='text-sky-500' to='/register'>Sign up here</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage