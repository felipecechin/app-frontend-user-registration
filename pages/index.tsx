import DrawerFormUpdateUser from '@/components/system/DrawerFormUpdateUser'
import Header from '@/components/shared/template/Header'
import MainContent from '@/components/shared/template/MainContent'
import { useState } from 'react'

// export const getServerSideProps = withSSRAuth(async ({ token }) => {
//     return {
//         props: {},
//     }
// })

export default function Home(): JSX.Element {
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
            />
        </>
    )
}
