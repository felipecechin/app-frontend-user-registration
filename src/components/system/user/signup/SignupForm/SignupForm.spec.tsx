/* eslint-disable @typescript-eslint/no-explicit-any */
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import SignupForm from '.'
import fetcher from '@/utils/fetcher'
import { yupMessages } from '@/utils/yupMessages'

const signupDataMock = {
    email: 'ficechin@hotmail.com',
    name: 'Felipe',
    individualNumber: '93518921070',
    workerNumber: '9889432',
    address: {
        street: 'Avenida Dores',
        number: 4,
        city: 'Camboja City',
        state: 'Camboja State',
        country: 'KHM',
        zip: '9705000',
    },
    password: '12345',
    confirmPassword: '12345',
}

jest.mock('@/utils/fetcher')

describe('SignupForm component', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should render correctly', () => {
        render(<SignupForm />)

        expect(screen.getByText('Dados pessoais')).toBeInTheDocument()
        expect(screen.getByText('Endereço')).toBeInTheDocument()
        expect(screen.getByText('Dados de acesso')).toBeInTheDocument()
        expect(document.querySelector('input[name="react-select-address.state"]')).toBeInTheDocument()
        expect(document.querySelector('input[name="react-select-address.city"]')).toBeInTheDocument()

        const tagLinkToSignin = screen.getByText('Já possui conta? Faça login')
        expect(tagLinkToSignin).toHaveAttribute('href', '/users/signin')
    })

    it('should call fetcher function and redirect correctly when user submit the form with valid values', async () => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const useRouterMock = jest.spyOn(require('next/router'), 'useRouter')
        const pushMock = jest.fn()
        useRouterMock.mockImplementation(() => ({
            push: pushMock,
        }))
        const fetcherMock = jest.mocked(fetcher)

        const { queryByTestId } = render(<SignupForm />)

        const button = screen.getByText('Enviar')

        await act(() => {
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        })

        await waitFor(() => {
            expect(screen.getAllByText(yupMessages.required)).toHaveLength(10)
            expect(screen.getAllByText(yupMessages.typeNumber)).toHaveLength(1)
            expect(fetcherMock).toHaveBeenCalledTimes(0)
        })

        const divSelectCountry = queryByTestId('div-select-country') as HTMLDivElement
        expect(divSelectCountry).toBeDefined()
        expect(divSelectCountry).not.toBeNull()

        fireEvent.keyDown(divSelectCountry.lastChild as ChildNode, { key: 'ArrowDown' })

        await waitFor(() => screen.getByText('Camboja'))
        fireEvent.click(screen.getByText('Camboja'))

        const workerNumberInput = document.querySelector('input[name="workerNumber"]') as HTMLInputElement
        const individualNumberInput = document.querySelector('input[name="individualNumber"]') as HTMLInputElement
        const nameInput = document.querySelector('input[name="name"]') as HTMLInputElement
        const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement
        const addressZipInput = document.querySelector('input[name="address.zip"]') as HTMLInputElement
        const addressStreetInput = document.querySelector('input[name="address.street"]') as HTMLInputElement
        const addressNumberInput = document.querySelector('input[name="address.number"]') as HTMLInputElement
        const passwordInput = document.querySelector('input[name="password"]') as HTMLInputElement
        const confirmPasswordInput = document.querySelector('input[name="confirmPassword"]') as HTMLInputElement
        const addressStateInput = document.querySelector('input[name="address.state"]') as HTMLInputElement
        const addressCityInput = document.querySelector('input[name="address.city"]') as HTMLInputElement

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

        fireEvent.change(passwordInput, { target: { value: '23131' } })
        fireEvent.change(confirmPasswordInput, { target: { value: '32131' } })

        await act(() => {
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        })

        await waitFor(() => {
            expect(screen.getByText('As senhas devem ser iguais')).toBeInTheDocument()
            expect(fetcherMock).toHaveBeenCalledTimes(0)
        })

        fireEvent.change(workerNumberInput, { target: { value: signupDataMock.workerNumber } })
        fireEvent.change(individualNumberInput, { target: { value: signupDataMock.individualNumber } })
        fireEvent.change(nameInput, { target: { value: signupDataMock.name } })
        fireEvent.change(emailInput, { target: { value: signupDataMock.email } })
        fireEvent.change(addressZipInput, { target: { value: signupDataMock.address.zip } })
        fireEvent.change(addressStreetInput, { target: { value: signupDataMock.address.street } })
        fireEvent.change(addressNumberInput, { target: { value: signupDataMock.address.number } })
        fireEvent.change(addressCityInput, { target: { value: signupDataMock.address.city } })
        fireEvent.change(addressStateInput, { target: { value: signupDataMock.address.state } })
        fireEvent.change(passwordInput, { target: { value: signupDataMock.password } })
        fireEvent.change(confirmPasswordInput, { target: { value: signupDataMock.confirmPassword } })

        await act(() => {
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        })

        await waitFor(() => {
            expect(fetcherMock).toHaveBeenCalledTimes(1)
            expect(fetcherMock).toHaveBeenCalledWith({
                url: '/user',
                method: 'POST',
                data: {
                    ...signupDataMock,
                },
            })
            expect(pushMock).toHaveBeenCalledWith('/users/signin')
        })
    })

    it('should show input for state and city by country value', async () => {
        const { queryByTestId } = render(<SignupForm />)

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

        fireEvent.keyDown(selectCountryDiv.lastChild as ChildNode, { key: 'ArrowDown' })

        await waitFor(() => screen.getByText('Brasil'))
        fireEvent.click(screen.getByText('Brasil'))

        expect(stateInput).not.toBeInTheDocument()
        expect(cityInput).not.toBeInTheDocument()
        expect(document.querySelector('input[name="react-select-address.state"]')).toBeInTheDocument()
        expect(document.querySelector('input[name="react-select-address.city"]')).toBeInTheDocument()
    })
})
