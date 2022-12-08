/* eslint-disable @typescript-eslint/no-explicit-any */
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import DrawerFormUpdateUser from '.'
import fetcher from '@/utils/fetcher'
import { useAuth } from '@/contexts/AuthContext'
import { yupMessages } from '@/utils/yupMessages'

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
jest.mock('@/contexts/AuthContext')

describe('DrawerFormUpdateUser component', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should render correctly', () => {
        const onCloseMock = jest.fn()
        const useAuthMocked = jest.mocked(useAuth)
        const signoutMocked = jest.fn()

        useAuthMocked.mockReturnValue({
            token: 'token-123',
            signout: signoutMocked,
        } as any)

        render(
            <DrawerFormUpdateUser
                onClose={onCloseMock}
                open={true}
                profile={profileMock}
            />
        )

        expect(screen.getByText('Atualize seus dados')).toBeInTheDocument()
        expect(document.querySelector('input[name="react-select-address.state"]')).toBeInTheDocument()
        expect(document.querySelector('input[name="react-select-address.city"]')).toBeInTheDocument()
    })

    it('should call fetcher when the form is submitted', async () => {
        const fetcherMock = jest.mocked(fetcher)
        const useAuthMocked = jest.mocked(useAuth)
        const signoutMocked = jest.fn()

        useAuthMocked.mockReturnValue({
            token: 'token-123',
            signout: signoutMocked,
        } as any)

        const onCloseMock = jest.fn()
        render(
            <DrawerFormUpdateUser
                onClose={onCloseMock}
                open={true}
                profile={profileMock}
            />
        )

        const button = screen.getByText('Salvar')
        await act(() => {
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        })

        await waitFor(() => {
            expect(fetcherMock).toHaveBeenCalledTimes(1)
            expect(fetcherMock).toHaveBeenCalledWith({
                url: '/user',
                method: 'PUT',
                data: {
                    ...profileMock,
                },
                auth: 'token-123',
            })
        })
    })

    it('should show errors when the form is submitted with invalid values', async () => {
        const fetcherMock = jest.mocked(fetcher)
        const useAuthMocked = jest.mocked(useAuth)
        const signoutMocked = jest.fn()

        useAuthMocked.mockReturnValue({
            token: 'token-123',
            signout: signoutMocked,
        } as any)

        const onCloseMock = jest.fn()
        render(
            <DrawerFormUpdateUser
                onClose={onCloseMock}
                open={true}
                profile={profileMock}
            />
        )

        const workerNumberInput = document.querySelector('input[name="workerNumber"]') as HTMLInputElement
        const individualNumberInput = document.querySelector('input[name="individualNumber"]') as HTMLInputElement
        const nameInput = document.querySelector('input[name="name"]') as HTMLInputElement

        fireEvent.change(workerNumberInput, { target: { value: '' } })
        fireEvent.change(individualNumberInput, { target: { value: '' } })
        fireEvent.change(nameInput, { target: { value: '' } })
        const button = screen.getByText('Salvar')

        await act(() => {
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        })

        await waitFor(() => {
            expect(screen.getAllByText(yupMessages.required)).toHaveLength(3)
            expect(fetcherMock).toHaveBeenCalledTimes(0)
        })

        fireEvent.change(workerNumberInput, { target: { value: '1651156' } })
        fireEvent.change(individualNumberInput, { target: { value: '98484' } })
        fireEvent.change(nameInput, { target: { value: 'Felipe Cechin' } })

        await act(() => {
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        })

        await waitFor(() => {
            expect(screen.getByText('Por favor, informe um CPF válido')).toBeInTheDocument()
            expect(fetcherMock).toHaveBeenCalledTimes(0)
        })

        fireEvent.change(individualNumberInput, { target: { value: '85394154023' } })

        await act(() => {
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        })

        await waitFor(() => {
            expect(fetcherMock).toHaveBeenCalledTimes(1)
            expect(fetcherMock).toHaveBeenCalledWith({
                url: '/user',
                method: 'PUT',
                data: {
                    ...profileMock,
                    individualNumber: '85394154023',
                    workerNumber: '1651156',
                    name: 'Felipe Cechin',
                },
                auth: 'token-123',
            })
        })
    })

    it('should show input type text for state and city when country is different from Brazil', async () => {
        const useAuthMocked = jest.mocked(useAuth)
        const signoutMocked = jest.fn()

        useAuthMocked.mockReturnValue({
            token: 'token-123',
            signout: signoutMocked,
        } as any)

        const onCloseMock = jest.fn()
        const { queryByTestId } = render(
            <DrawerFormUpdateUser
                onClose={onCloseMock}
                open={true}
                profile={profileMock}
            />
        )

        const selectCountryDiv = queryByTestId('div-select-country') as HTMLDivElement
        expect(selectCountryDiv).toBeDefined()
        expect(selectCountryDiv).not.toBeNull()

        fireEvent.keyDown(selectCountryDiv.lastChild as ChildNode, { key: 'ArrowDown' })

        await waitFor(() => screen.getByText('Tonga'))
        fireEvent.click(screen.getByText('Tonga'))

        const stateInput = document.querySelector('input[name="address.state"]') as HTMLInputElement
        const cityInput = document.querySelector('input[name="address.city"]') as HTMLInputElement

        expect(stateInput).toBeInTheDocument()
        expect(cityInput).toBeInTheDocument()
        expect(document.querySelector('input[name="react-select-address.state"]')).not.toBeInTheDocument()
        expect(document.querySelector('input[name="react-select-address.city"]')).not.toBeInTheDocument()
    })

    it('should call fetcher and signout when the user confirms data deletion', async () => {
        const fetcherMock = jest.mocked(fetcher)
        const useAuthMocked = jest.mocked(useAuth)
        const signoutMocked = jest.fn()

        useAuthMocked.mockReturnValue({
            token: 'token-123',
            signout: signoutMocked,
        } as any)

        const onCloseMock = jest.fn()
        render(
            <DrawerFormUpdateUser
                onClose={onCloseMock}
                open={true}
                profile={profileMock}
            />
        )

        const deleteButton = screen.getByText('Remover dados')
        fireEvent.click(deleteButton)

        await waitFor(() => screen.getByText('Sim, remover!'))
        fireEvent.click(screen.getByText('Sim, remover!'))

        await waitFor(() => {
            expect(fetcherMock).toHaveBeenCalledTimes(1)
            expect(fetcherMock).toHaveBeenCalledWith({
                url: '/user',
                method: 'DELETE',
                auth: 'token-123',
            })
            expect(signoutMocked).toHaveBeenCalled()
        })
    })
})
