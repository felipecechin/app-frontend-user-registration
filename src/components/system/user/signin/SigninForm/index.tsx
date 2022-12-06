import * as yup from 'yup'

import { useCallback, useMemo } from 'react'

import { FaSignInAlt } from 'react-icons/fa'
import InputGroup from '@/components/shared/form/InputGroup'
import { SubmitHandler } from 'react-hook-form'
import { useAuth } from '@/contexts/AuthContext'
import { useFormWithSchema } from '@/hooks/useFormWithSchema'
import { yupMessages } from '@/utils/yupMessages'

export default function SigninForm(): JSX.Element {
    const { signin } = useAuth()

    const loginSchema = useMemo(() => {
        return yup.object({
            email: yup.string().email(yupMessages.email).required(yupMessages.required),
            password: yup.string().required(yupMessages.required),
        })
    }, [])

    const {
        handleSubmit,
        formState: { errors },
        register,
    } = useFormWithSchema(loginSchema)

    const handleFormSubmit = useCallback<SubmitHandler<yup.Asserts<typeof loginSchema>>>(
        async (data) => {
            signin(data.email, data.password)
        },
        [signin]
    )

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className='space-y-6'>
                <div>
                    <InputGroup
                        error={errors.email?.message as string}
                        label='E-mail'
                        name='email'
                        placeholder='Digite seu e-mail'
                        register={register}
                        style='big'
                        type='email'
                    />
                </div>
                <div>
                    <InputGroup
                        error={errors.password?.message as string}
                        label='Senha'
                        name='password'
                        placeholder='Digite sua senha'
                        register={register}
                        style='big'
                        type='password'
                    />
                </div>
            </div>
            <button className='mt-10 flex items-center justify-center w-full py-4 px-6 mb-6 text-center text-lg leading-6 text-white font-extrabold bg-cyan-800 hover:bg-cyan-900 border-3 border-cyan-900 shadow rounded transition duration-200'>
                <FaSignInAlt className='w-6 h-6 mr-2' /> Entrar
            </button>
        </form>
    )
}
