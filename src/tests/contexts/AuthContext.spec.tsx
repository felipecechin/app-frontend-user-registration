/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import { act, renderHook, waitFor } from '@testing-library/react'

import fetcher from '@/utils/fetcher'

jest.mock('@/utils/fetcher')

describe('AuthContext test', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should set token if user is authenticated', async () => {
        const fetcherMock = jest.mocked(fetcher)
        fetcherMock.mockResolvedValue({
            data: 'token-123',
        })
        const { result } = renderHook(useAuth, {
            wrapper: AuthProvider,
        })

        await waitFor(() => {
            expect(result.current.token).toEqual('token-123')
        })
    })

    it('should set empty token if user is not authenticated', async () => {
        const fetcherMock = jest.mocked(fetcher)
        fetcherMock.mockRejectedValue('error')
        const { result } = renderHook(useAuth, {
            wrapper: AuthProvider,
        })

        await waitFor(() => {
            expect(result.current.token).toEqual('')
        })
    })

    it('should set token and redirect when user sign in', async () => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const useRouterMock = jest.spyOn(require('next/router'), 'useRouter')
        const pushMock = jest.fn()
        useRouterMock.mockImplementation(() => ({
            push: pushMock,
        }))

        const { result } = renderHook(useAuth, {
            wrapper: AuthProvider,
        })

        await waitFor(() => {
            expect(result.current.token).toEqual('')
        })

        const fetcherMock = jest.mocked(fetcher)
        fetcherMock.mockResolvedValue({
            data: 'token-12345',
        })

        act(() => {
            result.current.signin('email', 'password')
        })

        await waitFor(() => {
            expect(result.current.token).toEqual('token-12345')
            expect(pushMock).toHaveBeenCalledWith('/')
        })
    })

    it('should set token empty and redirect when user sign out', async () => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const useRouterMock = jest.spyOn(require('next/router'), 'useRouter')
        const pushMock = jest.fn()
        useRouterMock.mockImplementation(() => ({
            push: pushMock,
        }))
        const fetcherMock = jest.mocked(fetcher)
        fetcherMock.mockResolvedValueOnce({
            data: 'token-12345',
        })

        const { result } = renderHook(useAuth, {
            wrapper: AuthProvider,
        })

        await waitFor(() => {
            expect(result.current.token).toEqual('token-12345')
        })

        fetcherMock.mockResolvedValueOnce({
            data: 'All OK',
        })

        act(() => {
            result.current.signout()
        })

        await waitFor(() => {
            expect(result.current.token).toEqual('')
            expect(pushMock).toHaveBeenCalledWith('/users/signin')
        })
    })
})
