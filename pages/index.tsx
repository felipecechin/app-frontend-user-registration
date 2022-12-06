import DrawerFormUpdateUser from '@/components/system/DrawerFormUpdateUser'
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
                    <div className='bg-white rounded-lg shadow-lg px-4 py-4 flex flex-col'>
                        <button onClick={() => setShowDrawerFormUpdateUser(true)}>Abrir formulário</button>
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
