import * as yup from 'yup'

import { showSwalLoading, showSwalSuccess } from '@/utils/reactSwal'
import { useCallback, useMemo, useState } from 'react'

import ControlledReactSelect from '@/components/shared/form/ControlledReactSelect'
import { FaSignInAlt } from 'react-icons/fa'
import InputGroup from '@/components/shared/form/InputGroup'
import InputMaskGroup from '@/components/shared/form/InputMaskGroup'
import Link from 'next/link'
import { SubmitHandler } from 'react-hook-form'
import cities from '@/utils/cities'
import countries from '@/utils/countries'
import fetcher from '@/utils/fetcher'
import getOnlyNumbers from '@/utils/getOnlyNumbers'
import lodashFilter from 'lodash/filter'
import lodashOmitBy from 'lodash/omitBy'
import showFetchError from '@/utils/showFetchError'
import states from '@/utils/states'
import { useFormWithSchema } from '@/hooks/useFormWithSchema'
import { useRouter } from 'next/router'
import validateCpf from '@/utils/validateCpf'
import { yupMessages } from '@/utils/yupMessages'

export default function SignupForm(): JSX.Element {
    const router = useRouter()
    const [showStateAndCityFieldsByCountry, setShowStateAndCityFieldsByCountry] = useState('BRA')
    const [citiesByState, setCitiesByState] = useState<
        {
            label: string
            value: string
            estadoid: string
        }[]
    >([])

    const registerSchema = useMemo(() => {
        return yup.object({
            name: yup.string().required(yupMessages.required),
            email: yup.string().required(yupMessages.required).email(yupMessages.email),
            password: yup.string().required(yupMessages.required),
            confirmPassword: yup
                .string()
                .required(yupMessages.required)
                .oneOf([yup.ref('password')], 'As senhas devem ser iguais'),
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
            workerNumber: yup
                .string()
                .required(yupMessages.required)
                .test('digits-only', 'Informe apenas números', (value) => /^\d+$/.test(value as string)),
            address: yup.object({
                zip: yup
                    .string()
                    .required(yupMessages.required)
                    .test('digits-only', 'Informe apenas números', (value) => /^\d+$/.test(value as string)),
                city: yup.string().required(yupMessages.required),
                complement: yup.string().nullable(true),
                number: yup
                    .number()
                    .typeError(yupMessages.typeNumber)
                    .positive(yupMessages.typeNumber)
                    .required(yupMessages.required),
                state: yup.string().required(yupMessages.required),
                street: yup.string().required(yupMessages.required),
                country: yup.string().required(yupMessages.required),
            }),
        })
    }, [])

    const {
        handleSubmit,
        formState: { errors },
        register,
        control,
        setValue,
        clearErrors,
    } = useFormWithSchema(registerSchema, {
        defaultValues: {
            address: {
                country: 'BRA',
            },
        },
    })

    const onChangeCountry = useCallback(
        (value: string) => {
            setShowStateAndCityFieldsByCountry(value)
            setValue('address.state', '')
            setValue('address.city', '')
            setCitiesByState([])
        },
        [setValue]
    )

    const onChangeState = useCallback(
        (value: string) => {
            if (!value) {
                setCitiesByState([])
                setValue('address.city', '')
                return
            }
            const filterCities = lodashFilter(cities, (c) => c.estadoid === value)
            setCitiesByState(filterCities)
            setValue('address.city', filterCities[0].value)
            clearErrors('address.city')
        },
        [clearErrors, setValue]
    )

    const getFieldsByCountry = useMemo(() => {
        if (showStateAndCityFieldsByCountry === 'BRA') {
            return (
                <>
                    <div>
                        <ControlledReactSelect
                            control={control}
                            error={errors.address?.state?.message as string}
                            label='Estado'
                            name='address.state'
                            onCustomChange={onChangeState}
                            options={states}
                            placeholder='Selecione um Estado'
                        />
                    </div>
                    <div>
                        <ControlledReactSelect
                            control={control}
                            error={errors.address?.city?.message as string}
                            label='Cidade'
                            name='address.city'
                            options={citiesByState}
                            placeholder='Selecione uma cidade'
                            placeholderWhenEmptyOptions='Selecione um Estado primeiro'
                        />
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div>
                        <InputGroup
                            error={errors.address?.state?.message as string}
                            label={'Estado'}
                            name={'address.state'}
                            register={register}
                            style='small'
                        />
                    </div>
                    <div>
                        <InputGroup
                            error={errors.address?.city?.message as string}
                            label={'Cidade'}
                            name={'address.city'}
                            register={register}
                            style='small'
                        />
                    </div>
                </>
            )
        }
    }, [showStateAndCityFieldsByCountry, citiesByState, control, errors, onChangeState, register])

    const handleFormSubmit = useCallback<SubmitHandler<yup.Asserts<typeof registerSchema>>>(
        async (data) => {
            const address = lodashOmitBy(data.address, (v) => v === '' || v === null)
            showSwalLoading()
            const sendData = {
                ...data,
                address,
            }
            try {
                await fetcher({
                    url: '/user',
                    method: 'POST',
                    data: sendData,
                })

                showSwalSuccess('Cadastro efetuado com sucesso. Entre em sua conta.')
                router.push('/users/signin')
            } catch (e) {
                showFetchError(e)
            }
        },
        [router]
    )

    return (
        <form
            className='flex flex-col space-y-6'
            onSubmit={handleSubmit(handleFormSubmit)}
        >
            <div className='grid grid-cols-1 sm:grid-cols-12 space-y-6 sm:space-y-0 sm:gap-y-4'>
                <div className='sm:col-span-4 sm:border-r sm:border-gray-300'>
                    <p className='font-bold text-lg text-cyan-800'>Dados pessoais</p>
                </div>
                <div className='pt-1 sm:pt-0 space-y-4 md:space-y-0 sm:col-span-8 grid grid-cols-1 md:grid-cols-2 sm:px-4 md:gap-4'>
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
                <div className='sm:col-span-4 border-t sm:border-t-0 sm:border-r sm:border-gray-300'>
                    <p className='font-bold text-lg mt-4 sm:mt-0 text-cyan-800'>Endereço</p>
                </div>
                <div className='pt-1 sm:pt-0 space-y-4 md:space-y-0 sm:col-span-8 grid grid-cols-1 md:grid-cols-2 sm:px-4 md:gap-4'>
                    <div>
                        <InputGroup
                            error={errors.address?.zip?.message as string}
                            label='CEP'
                            name='address.zip'
                            register={register}
                            style='small'
                        />
                    </div>
                    <div data-testid='div-select-country'>
                        <ControlledReactSelect
                            control={control}
                            error={errors.address?.country?.message as string}
                            label='País'
                            name='address.country'
                            onCustomChange={onChangeCountry}
                            options={countries}
                            placeholder='Selecione um país'
                        />
                    </div>
                    {getFieldsByCountry}
                    <div>
                        <InputGroup
                            error={errors.address?.street?.message as string}
                            label='Rua'
                            name='address.street'
                            register={register}
                            style='small'
                        />
                    </div>
                    <div>
                        <InputGroup
                            error={errors.address?.number?.message as string}
                            label='Número'
                            name='address.number'
                            register={register}
                            style='small'
                            type='number'
                        />
                    </div>
                    <div>
                        <InputGroup
                            error={errors.address?.complement?.message as string}
                            label='Complemento'
                            name='address.complement'
                            register={register}
                            style='small'
                        />
                    </div>
                </div>
                <div className='sm:col-span-4 border-t sm:border-t-0 sm:border-r sm:border-gray-300'>
                    <p className='font-bold text-lg mt-4 sm:mt-0 text-cyan-800'>Dados de acesso</p>
                </div>
                <div className='pt-1 sm:pt-0 space-y-4 md:space-y-0 sm:col-span-8 grid grid-cols-1 md:grid-cols-2 sm:px-4 md:gap-4'>
                    <div>
                        <InputGroup
                            error={errors.email?.message as string}
                            label='E-mail'
                            name='email'
                            register={register}
                            style='small'
                        />
                    </div>
                    <div>
                        <InputGroup
                            error={errors.password?.message as string}
                            label='Senha'
                            name='password'
                            register={register}
                            style='small'
                            type='password'
                        />
                    </div>
                    <div>
                        <InputGroup
                            error={errors.confirmPassword?.message as string}
                            label='Confirmação de senha'
                            name='confirmPassword'
                            register={register}
                            style='small'
                            type='password'
                        />
                    </div>
                </div>
            </div>
            <div className='flex flex-col-reverse sm:flex-row justify-between sm:pr-4'>
                <span className='flex justify-center'>
                    <Link
                        className='inline-block mt-4 text-center text-sm text-cyan-800 font-semibold'
                        href={'/users/signin'}
                    >
                        Já possui conta? Faça login
                    </Link>
                </span>
                <button className='flex items-center justify-center w-full sm:w-auto sm:max-w-sm py-2 px-4 text-center text-lg text-white font-extrabold bg-cyan-800 hover:bg-cyan-900 border-3 border-cyan-900 shadow rounded transition duration-200'>
                    <FaSignInAlt className='w-4 h-4 mr-2' /> Enviar
                </button>
            </div>
        </form>
    )
}
