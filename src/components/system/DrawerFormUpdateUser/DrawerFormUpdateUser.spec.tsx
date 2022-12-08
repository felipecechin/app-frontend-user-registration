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

const updateProfileDataMock = {
    email: 'felipecechinm@hotmail.com',
    name: 'Felipe',
    individualNumber: '91786000067',
    workerNumber: '9889432',
    address: {
        street: 'Avenida Dores',
        number: 4,
        city: 'Camboja City',
        state: 'Camboja State',
        country: 'KHM',
        zip: '498498489',
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

    it('should call fetcher function correctly when the user submit form', async () => {
        const fetcherMock = jest.mocked(fetcher)
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

        const workerNumberInput = document.querySelector('input[name="workerNumber"]') as HTMLInputElement
        const individualNumberInput = document.querySelector('input[name="individualNumber"]') as HTMLInputElement
        const nameInput = document.querySelector('input[name="name"]') as HTMLInputElement
        const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement
        const addressZipInput = document.querySelector('input[name="address.zip"]') as HTMLInputElement
        const addressStreetInput = document.querySelector('input[name="address.street"]') as HTMLInputElement
        const addressNumberInput = document.querySelector('input[name="address.number"]') as HTMLInputElement

        const divSelectCountry = queryByTestId('div-select-country') as HTMLDivElement
        expect(divSelectCountry).toBeDefined()
        expect(divSelectCountry).not.toBeNull()

        fireEvent.keyDown(divSelectCountry.lastChild as ChildNode, { key: 'ArrowDown' })

        await waitFor(() => screen.getByText('Camboja'))
        fireEvent.click(screen.getByText('Camboja'))

        fireEvent.change(workerNumberInput, { target: { value: '' } })
        fireEvent.change(individualNumberInput, { target: { value: '' } })
        fireEvent.change(nameInput, { target: { value: '' } })
        fireEvent.change(emailInput, { target: { value: '' } })
        fireEvent.change(addressZipInput, { target: { value: '' } })
        fireEvent.change(addressStreetInput, { target: { value: '' } })
        fireEvent.change(addressNumberInput, { target: { value: '' } })
        const button = screen.getByText('Salvar')

        await act(() => {
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        })

        await waitFor(() => {
            expect(screen.getAllByText(yupMessages.required)).toHaveLength(8)
            expect(screen.getAllByText(yupMessages.typeNumber)).toHaveLength(1)
            expect(fetcherMock).toHaveBeenCalledTimes(0)
        })

        fireEvent.change(individualNumberInput, { target: { value: '98484' } })

        await act(() => {
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        })

        await waitFor(() => {
            expect(screen.getByText('Por favor, informe um CPF válido')).toBeInTheDocument()
            expect(fetcherMock).toHaveBeenCalledTimes(0)
        })

        fireEvent.change(emailInput, { target: { value: 'email-invalid' } })

        await act(() => {
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        })

        await waitFor(() => {
            expect(screen.getByText(yupMessages.email)).toBeInTheDocument()
            expect(fetcherMock).toHaveBeenCalledTimes(0)
        })

        fireEvent.change(workerNumberInput, { target: { value: 'worker-number' } })
        fireEvent.change(addressZipInput, { target: { value: 'address-zip' } })
        await act(() => {
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        })

        await waitFor(() => {
            expect(screen.getAllByText('Informe apenas números')).toHaveLength(2)
            expect(fetcherMock).toHaveBeenCalledTimes(0)
        })

        const addressCityInput = document.querySelector('input[name="address.city"]') as HTMLInputElement
        const addressStateInput = document.querySelector('input[name="address.state"]') as HTMLInputElement

        fireEvent.change(workerNumberInput, { target: { value: updateProfileDataMock.workerNumber } })
        fireEvent.change(individualNumberInput, { target: { value: updateProfileDataMock.individualNumber } })
        fireEvent.change(nameInput, { target: { value: updateProfileDataMock.name } })
        fireEvent.change(emailInput, { target: { value: updateProfileDataMock.email } })
        fireEvent.change(addressZipInput, { target: { value: updateProfileDataMock.address.zip } })
        fireEvent.change(addressStreetInput, { target: { value: updateProfileDataMock.address.street } })
        fireEvent.change(addressNumberInput, { target: { value: updateProfileDataMock.address.number } })
        fireEvent.change(addressCityInput, { target: { value: updateProfileDataMock.address.city } })
        fireEvent.change(addressStateInput, { target: { value: updateProfileDataMock.address.state } })

        await act(() => {
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        })

        await waitFor(() => {
            expect(fetcherMock).toHaveBeenCalledTimes(1)
            expect(fetcherMock).toHaveBeenCalledWith({
                url: '/user',
                method: 'PUT',
                data: {
                    ...updateProfileDataMock,
                },
                auth: 'token-123',
            })
        })
    })

    it('should show input for state and city by country value', async () => {
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

        const divSelectCountry = queryByTestId('div-select-country') as HTMLDivElement
        expect(divSelectCountry).toBeDefined()
        expect(divSelectCountry).not.toBeNull()

        fireEvent.keyDown(divSelectCountry.lastChild as ChildNode, { key: 'ArrowDown' })

        await waitFor(() => screen.getByText('Tonga'))
        fireEvent.click(screen.getByText('Tonga'))

        const stateInput = document.querySelector('input[name="address.state"]') as HTMLInputElement
        const cityInput = document.querySelector('input[name="address.city"]') as HTMLInputElement

        expect(stateInput).toBeInTheDocument()
        expect(cityInput).toBeInTheDocument()
        expect(document.querySelector('input[name="react-select-address.state"]')).not.toBeInTheDocument()
        expect(document.querySelector('input[name="react-select-address.city"]')).not.toBeInTheDocument()

        fireEvent.keyDown(divSelectCountry.lastChild as ChildNode, { key: 'ArrowDown' })

        await waitFor(() => screen.getByText('Brasil'))
        fireEvent.click(screen.getByText('Brasil'))

        expect(stateInput).not.toBeInTheDocument()
        expect(cityInput).not.toBeInTheDocument()
        expect(document.querySelector('input[name="react-select-address.state"]')).toBeInTheDocument()
        expect(document.querySelector('input[name="react-select-address.city"]')).toBeInTheDocument()
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
