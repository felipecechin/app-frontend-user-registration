import * as yup from 'yup'

import { useCallback, useMemo } from 'react'

import ControlledReactSelect from '@/components/shared/form/ControlledReactSelect'
import { FaSignInAlt } from 'react-icons/fa'
import InputGroup from '@/components/shared/form/InputGroup'
import InputMaskGroup from '@/components/shared/form/InputMaskGroup'
import { SubmitHandler } from 'react-hook-form'
import getOnlyNumbers from '@/utils/getOnlyNumbers'
import { useFormWithSchema } from '@/hooks/useFormWithSchema'
import validateCpf from '@/utils/validateCpf'
import { yupMessages } from '@/utils/yupMessages'

export default function SignupForm(): JSX.Element {
    const registerSchema = useMemo(() => {
        return yup.object({
            name: yup.string().required(yupMessages.required),
            individualNumber: yup
                .string()
                .required(yupMessages.required)
                .transform((value) => {
                    return getOnlyNumbers(value)
                })
                .test({
                    name: 'is-valid-document',
                    message: 'Por favor, informe um CPF válido',
                    test: (value) => {
                        return validateCpf(value as string)
                    },
                }),
            workerNumber: yup.string().required(yupMessages.required),
        })
    }, [])

    const {
        handleSubmit,
        formState: { errors },
        register,
        control,
    } = useFormWithSchema(registerSchema)

    const handleFormSubmit = useCallback<
        SubmitHandler<yup.Asserts<typeof registerSchema>>
    >(async (data) => {
        console.log(data)
    }, [])

    return (
        <form
            className='flex flex-col space-y-6'
            onSubmit={handleSubmit(handleFormSubmit)}
        >
            <div className='grid grid-cols-1 sm:grid-cols-12 space-y-6 divide-y-2 sm:space-y-0 sm:divide-y-0 sm:gap-y-4'>
                <div className='sm:col-span-4 sm:border-r sm:border-gray-300'>
                    <p className='font-bold text-lg'>Dados pessoais</p>
                </div>
                <div className='pt-4 sm:pt-0 space-y-4 md:space-y-0 sm:col-span-8 grid grid-cols-1 md:grid-cols-2 sm:px-4 md:gap-4'>
                    <div>
                        <InputGroup
                            error={errors.name?.message as string}
                            label='Nome'
                            name='name'
                            register={register}
                            style='small'
                        />
                    </div>
                    <div>
                        <InputMaskGroup
                            control={control}
                            error={errors.individualNumber?.message as string}
                            label='CPF'
                            mask={'999.999.999-99'}
                            name='individualNumber'
                        />
                    </div>
                    <div>
                        <InputGroup
                            error={errors.workerNumber?.message as string}
                            label='PIS'
                            name='workerNumber'
                            register={register}
                            style='small'
                        />
                    </div>
                </div>
                <div className='sm:col-span-4 sm:border-r sm:border-gray-300'>
                    <p className='font-bold text-lg mt-4 sm:mt-0'>
                        Dados pessoais
                    </p>
                </div>
                <div className='pt-4 sm:pt-0 space-y-4 md:space-y-0 sm:col-span-8 grid grid-cols-1 md:grid-cols-2 sm:px-4 md:gap-4'>
                    <div>
                        <ControlledReactSelect />
                    </div>
                </div>
            </div>
            <div className='flex justify-end sm:px-4'>
                <button className='flex items-center justify-center max-w-sm py-2 px-4 text-center text-lg text-white font-extrabold bg-cyan-800 hover:bg-cyan-900 border-3 border-cyan-900 shadow rounded transition duration-200'>
                    <FaSignInAlt className='w-4 h-4 mr-2' /> Enviar
                </button>
            </div>
        </form>
    )
}
