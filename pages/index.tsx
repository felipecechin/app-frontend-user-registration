import DrawerFormUpdateUser from '@/components/system/DrawerFormUpdateUser'
import { FaPencilAlt } from 'react-icons/fa'
import Header from '@/components/shared/template/Header'
import { IUserProfile } from '@/types/userProfile'
import { InferGetServerSidePropsType } from 'next'
import MainContent from '@/components/shared/template/MainContent'
import fetcher from '@/utils/fetcher'
import { useState } from 'react'
import { withSSRAuth } from '@/utils/withSSRAuth'

interface IResponseProfile {
    profile: IUserProfile
}

interface IHomeProps {
    profile: IUserProfile
}

export const getServerSideProps = withSSRAuth<IHomeProps>(async ({ token }) => {
    const response = (await fetcher({
        url: '/user',
        method: 'GET',
        auth: token,
    })) as IResponseProfile

    return {
        props: {
            profile: response.profile,
        },
    }
})

export default function Home({ profile }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
    const [showDrawerFormUpdateUser, setShowDrawerFormUpdateUser] = useState(false)

    return (
        <>
            <Header />
            <MainContent>
                <div className='flex flex-col'>
                    <div className='bg-white rounded-lg shadow-lg px-4 py-8 flex flex-col text-center space-y-2'>
                        <p className='font-bold text-xl'>Olá, {profile.name}!</p>
                        <button
                            className='w-full sm:max-w-xs mx-auto flex items-center justify-center py-2 px-2 text-md text-white font-semibold bg-cyan-800 hover:bg-cyan-900 border-3 border-cyan-900 shadow rounded transition duration-200'
                            onClick={() => setShowDrawerFormUpdateUser(true)}
                        >
                            <FaPencilAlt className='w-5 h-5 mr-2' />
                            Editar dados
                        </button>
                    </div>
                </div>
            </MainContent>
            <DrawerFormUpdateUser
                onClose={() => setShowDrawerFormUpdateUser(false)}
                open={showDrawerFormUpdateUser}
                profile={profile}
            />
        </>
    )
}
