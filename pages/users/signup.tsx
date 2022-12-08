import SignupForm from '@/components/system/user/signup/SignupForm'

export default function Signup(): JSX.Element {
    return (
        <main>
            <div className='flex min-h-screen h-fit py-4 bg-cyan-800 items-center'>
                <div className='w-full max-w-5xl px-4 mx-auto'>
                    <h2 className='text-center text-white text-3xl font-bold my-4'>Cadastro</h2>
                    <div className='bg-white rounded-lg shadow-lg p-6'>
                        <SignupForm />
                    </div>
                </div>
            </div>
        </main>
    )
}
