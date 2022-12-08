/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from '@testing-library/react'

import Header from '.'
import { useAuth } from '@/contexts/AuthContext'

jest.mock('@/contexts/AuthContext')

describe('Header component', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should render correctly', () => {
        const useAuthMocked = jest.mocked(useAuth)

        useAuthMocked.mockReturnValueOnce({
            signout: jest.fn(),
        } as any)

        render(<Header />)

        expect(screen.getByText('Meus dados')).toBeInTheDocument()
    })

    it('should call signout function when click on signout button', () => {
        const useAuthMocked = jest.mocked(useAuth)
        const signoutMocked = jest.fn()

        useAuthMocked.mockReturnValueOnce({
            signout: signoutMocked,
        } as any)

        render(<Header />)

        const buttonSignout = screen.getByText('Sair')
        fireEvent.click(buttonSignout)

        expect(signoutMocked).toHaveBeenCalled()
    })
})
