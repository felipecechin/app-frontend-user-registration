import { createContext, useContext, useEffect, useState } from 'react'
import { reactSwal, sweetAlertOptions } from '@/utils/sweetAlert'

import FetchError from '@/utils/FetchError'
import fetcher from '@/utils/fetcher'
import { useRouter } from 'next/router'

type TAuthContextData = {
    token: string
    signin: (email: string, password: string) => Promise<void>
    signout: () => Promise<void>
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const AuthContext = createContext({} as TAuthContextData)

interface IGetTokenResponse {
    data: string
}

interface ISigninResponse {
    data: string
}

interface IAuthProviderProps {
    children: React.ReactNode
}

export function AuthProvider({ children }: IAuthProviderProps): JSX.Element {
    const [token, setToken] = useState('')
    const router = useRouter()

    useEffect(() => {
        const getToken = async (): Promise<void> => {
            try {
                const response = (await fetcher({
                    method: 'GET',
                    url: '/api/getToken',
                    nextApi: true,
                })) as IGetTokenResponse

                setToken(response.data)
            } catch (error) {
                /* como o token é verificado no Server Side com Next, se o usuário tentar acessar uma rota protegida sem estar logado, 
                    ele será redirecionado para a página de login. Não é necessário tratar o erro aqui. */
                setToken('')
            }
        }
        getToken()
    }, [])

    const signin = async (email: string, password: string): Promise<void> => {
        reactSwal.fire({
            title: 'Por favor, aguarde...',
            allowEscapeKey: false,
            allowOutsideClick: false,
        })
        reactSwal.showLoading(null)
        try {
            const response = (await fetcher({
                url: '/api/signin',
                method: 'POST',
                data: { email, password },
                nextApi: true,
            })) as ISigninResponse

            setToken(response.data)
            reactSwal.close()
            router.push('/')
        } catch (e) {
            if (e instanceof FetchError) {
                console.log(e.data)
            }
            reactSwal.fire({
                title: 'Oops!',
                icon: 'error',
                text: 'E-mail e/ou senha inválidos',
                confirmButtonColor: sweetAlertOptions.confirmButtonColor,
            })
        }
    }

    const signout = async (): Promise<void> => {
        await fetcher({
            url: '/api/signout',
            method: 'GET',
            nextApi: true,
        })
        setToken('')
        router.push('/users/signin')
    }

    return <AuthContext.Provider value={{ token, signin, signout }}>{children}</AuthContext.Provider>
}

export const useAuth = (): TAuthContextData => useContext(AuthContext)
