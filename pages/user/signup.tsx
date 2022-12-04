import SignupForm from '@/components/system/user/signup/SignupForm'

export default function Signup(): JSX.Element {
    return (
        <main>
            <div className='flex min-h-screen h-fit py-4 bg-cyan-800 items-center'>
                <div className='w-full max-w-7xl px-4 mx-auto'>
                    <div className='bg-white rounded-lg shadow-lg py-6 px-4 sm:px-10'>
                        <SignupForm />
                    </div>
                </div>
            </div>
        </main>
    )
}
