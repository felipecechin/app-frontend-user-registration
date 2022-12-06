import { FaUserAlt } from 'react-icons/fa'
import { useAuth } from '@/contexts/AuthContext'

function Header(): JSX.Element {
    const { signout } = useAuth()

    return (
        <header className='w-full bg-gradient-to-r from-cyan-700 to-cyan-500 px-4 py-4'>
            <div className='max-w-7xl flex flex-col mx-auto pb-28'>
                <div className='rounded-lg bg-white flex items-center justify-between px-4 py-4'>
                    <span className='flex items-center normal-case text-xl font-bold text-cyan-800'>
                        <FaUserAlt className='h-5 w-5 mr-2 self-center flex-shrink-0' />
                        Meus dados
                    </span>
                    <button
                        className='text-cyan-700 hover:text-cyan-900'
                        onClick={signout}
                    >
                        Sair
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header
