import * as yup from 'yup'

import { useCallback, useMemo } from 'react'

import InputGroup from '@/components/shared/form/InputGroup'
import { SubmitHandler } from 'react-hook-form'
import { useFormWithSchema } from '@/hooks/useFormWithSchema'
import { yupMessages } from '@/utils/yupMessages'

export default function SignupForm(): JSX.Element {
    const registerSchema = useMemo(() => {
        return yup.object({
            name: yup
                .string()
                .email(yupMessages.email)
                .required(yupMessages.required),
            individualNumber: yup.string().required(yupMessages.required),
            workerNumber: yup.string().required(yupMessages.required),
        })
    }, [])

    const {
        handleSubmit,
        formState: { errors },
        register,
    } = useFormWithSchema(registerSchema)

    const handleFormSubmit = useCallback<
        SubmitHandler<yup.Asserts<typeof registerSchema>>
    >(async (data) => {
        console.log(data)
    }, [])

    return (
        <form className='grid grid-cols-1 sm:grid-cols-12 space-y-6 divide-y-2 sm:space-y-0 sm:divide-y-0 sm:divide-x-2'>
            <div className='sm:col-span-4'>
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
                    <InputGroup
                        error={errors.individualNumber?.message as string}
                        label='CPF'
                        name='individualNumber'
                        register={register}
                        style='small'
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
        </form>
    )
}
