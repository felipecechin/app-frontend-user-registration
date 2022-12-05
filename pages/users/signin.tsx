import Link from 'next/link'
import SigninForm from '@/components/system/user/signin/SigninForm'

export default function Signin(): JSX.Element {
    return (
        <main>
            <div className='flex min-h-screen h-fit py-4 bg-cyan-800 items-center'>
                <div className='container px-4 mx-auto'>
                    <div className='bg-white rounded-lg shadow sm:max-w-md sm:w-full sm:mx-auto py-6 px-4 sm:px-10'>
                        <div className='mx-auto'>
                            <div className='text-center mb-8'>
                                <h2 className='flex flex-row justify-center text-cyan-800 font-bold text-4xl'>
                                    Olá, visitante!
                                </h2>
                            </div>
                            <SigninForm />
                            <span className='flex justify-center'>
                                <Link
                                    className='inline-block mt-4 text-center text-sm text-gray-800 font-semibold'
                                    href={'/users/signup'}
                                >
                                    Não tem uma conta? Cadastre-se aqui
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
