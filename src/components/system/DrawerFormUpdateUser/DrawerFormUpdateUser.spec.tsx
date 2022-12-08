/* eslint-disable @typescript-eslint/no-explicit-any */
import { act, render, screen, waitFor } from '@testing-library/react'

import DrawerFormUpdateUser from '.'
import fetcher from '@/utils/fetcher'
import { useAuth } from '@/contexts/AuthContext'

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
// jest.mock('@/contexts/AuthContext')

describe('DrawerFormUpdateUser component', () => {
    it('should render correctly', () => {
        const onCloseMock = jest.fn()
        render(
            <DrawerFormUpdateUser
                onClose={onCloseMock}
                open={true}
                profile={profileMock}
            />
        )

        // screen.debug(undefined, 30000)
        expect(screen.getByText('Atualize seus dados')).toBeInTheDocument()
    })

    it('should call fetcher when the form is submitted', async () => {
        const fetcherMock = jest.mocked(fetcher)
        // const useAuthMocked = jest.mocked(useAuth)
        // const signoutMocked = jest.fn()

        // useAuthMocked.mockReturnValueOnce({
        //     signout: signoutMocked,
        //     token: 'token-123',
        // } as any)

        const onCloseMock = jest.fn()
        render(
            <DrawerFormUpdateUser
                onClose={onCloseMock}
                open={true}
                profile={profileMock}
            />
        )

        // screen.debug(undefined, 30000)
        const button = screen.getByText('Salvar')
        await act(() => {
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        })

        await waitFor(() => {
            expect(fetcherMock).toHaveBeenCalledWith({
                url: '/user',
                method: 'PUT',
                data: {
                    ...profileMock,
                },
            })
        })
    })
})
