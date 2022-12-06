import Footer from '@/components/shared/template/Footer'
import Header from '@/components/shared/template/Header'
import MainContent from '@/components/shared/template/MainContent'

// export const getServerSideProps = withSSRAuth(async ({ token }) => {
//     return {
//         props: {},
//     }
// })

export default function Home(): JSX.Element {
    return (
        <>
            <Header />
            <MainContent>
                <div className='flex flex-col'>
                    <div className='bg-white rounded-lg shadow-lg px-4 py-4 flex flex-col'></div>
                </div>
            </MainContent>
            <Footer />
        </>
    )
}
