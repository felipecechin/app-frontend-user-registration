/* eslint-disable @typescript-eslint/no-explicit-any */
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import SigninForm from '.'
import { useAuth } from '@/contexts/AuthContext'
import { yupMessages } from '@/utils/yupMessages'

jest.mock('@/contexts/AuthContext')

describe('SigninForm component', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should render correctly', () => {
        const signinMock = jest.fn()
        const useAuthMocked = jest.mocked(useAuth)

        useAuthMocked.mockReturnValue({
            signin: signinMock,
        } as any)

        render(<SigninForm />)

        expect(screen.getByPlaceholderText('Digite seu e-mail')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Digite sua senha')).toBeInTheDocument()
    })

    it('should call signin function correctly when user submit the form', async () => {
        const signinMock = jest.fn()
        const useAuthMocked = jest.mocked(useAuth)

        useAuthMocked.mockReturnValue({
            signin: signinMock,
        } as any)

        render(<SigninForm />)

        const button = screen.getByText('Entrar')

        await act(() => {
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        })

        await waitFor(() => {
            expect(screen.getAllByText(yupMessages.required)).toHaveLength(2)
            expect(signinMock).toHaveBeenCalledTimes(0)
        })

        const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement
        const passwordInput = document.querySelector('input[name="password"]') as HTMLInputElement
        fireEvent.change(emailInput, { target: { value: 'email-invalid' } })

        await act(() => {
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        })

        await waitFor(() => {
            expect(screen.getByText(yupMessages.email)).toBeInTheDocument()
            expect(signinMock).toHaveBeenCalledTimes(0)
        })

        fireEvent.change(emailInput, { target: { value: 'ficechin@hotmail.com' } })
        fireEvent.change(passwordInput, { target: { value: '123' } })

        await act(() => {
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        })

        await waitFor(() => {
            expect(signinMock).toHaveBeenCalledTimes(1)
            expect(signinMock).toHaveBeenCalledWith('ficechin@hotmail.com', '123')
        })
    })
})
