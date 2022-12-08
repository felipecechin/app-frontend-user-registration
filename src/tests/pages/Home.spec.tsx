/* eslint-disable @typescript-eslint/no-explicit-any */
import * as cookiesFunctions from '@/utils/cookies'

import Home, { getServerSideProps } from '../../../pages'
import { render, screen } from '@testing-library/react'

import fetcher from '@/utils/fetcher'

const profileMock = {
    email: 'ficechin@hotmail.com',
    name: 'Felipe',
    individualNumber: '93518921070',
    workerNumber: '9889432',
    address: {
        street: 'Avenida Dores',
        number: 4,
        city: 'Santa Maria',
        state: 'RS',
        country: 'BRA',
        zip: '9705000',
    },
}

jest.mock('@/utils/fetcher')
jest.mock('@/utils/cookies')

describe('Home page', () => {
    it('should render correctly', () => {
        render(<Home profile={profileMock} />)

        expect(screen.getByText('Olá, ' + profileMock.name + '!')).toBeInTheDocument()
        expect(screen.getByText('Editar dados')).toBeInTheDocument()
    })

    it('should redirect if token does not exist', async () => {
        const getTokenMock = jest.spyOn(cookiesFunctions, 'getToken')
        getTokenMock.mockReturnValue('')

        const response = await getServerSideProps({} as any)
        expect(response).toEqual(
            expect.objectContaining({
                redirect: expect.objectContaining({
                    destination: '/users/signin',
                }),
            })
        )
    })

    it('should load initial page if token exists', async () => {
        const getTokenMock = jest.spyOn(cookiesFunctions, 'getToken')
        getTokenMock.mockReturnValue('token')

        const fetcherMock = jest.mocked(fetcher)
        fetcherMock.mockResolvedValue({
            profile: profileMock,
        })

        const response = await getServerSideProps({} as any)
        expect(response).toEqual(
            expect.objectContaining({
                props: {
                    profile: profileMock,
                },
            })
        )
    })
})
