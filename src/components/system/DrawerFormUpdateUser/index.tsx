import * as yup from 'yup'

import { FaSave, FaTrash } from 'react-icons/fa'
import { reactSwal, sweetAlertOptions } from '@/utils/sweetAlert'
import { useCallback, useEffect, useMemo, useState } from 'react'

import ControlledReactSelect from '@/components/shared/form/ControlledReactSelect'
import Drawer from '@/components/shared/Drawer'
import { IUserProfile } from '@/types/userProfile'
import InputGroup from '@/components/shared/form/InputGroup'
import InputMaskGroup from '@/components/shared/form/InputMaskGroup'
import { SubmitHandler } from 'react-hook-form'
import cities from '@/utils/cities'
import countries from '@/utils/countries'
import fetcher from '@/utils/fetcher'
import getOnlyNumbers from '@/utils/getOnlyNumbers'
import lodashFilter from 'lodash/filter'
import lodashOmitBy from 'lodash/omitBy'
import states from '@/utils/states'
import { useAuth } from '@/contexts/AuthContext'
import { useFormWithSchema } from '@/hooks/useFormWithSchema'
import validateCpf from '@/utils/validateCpf'
import { yupMessages } from '@/utils/yupMessages'

interface IDrawerFormUpdateUserProps {
    open: boolean
    onClose: () => void
    profile: IUserProfile
}

function DrawerFormUpdateUser({ open, onClose, profile }: IDrawerFormUpdateUserProps): JSX.Element {
    const { token, signout } = useAuth()
    const [showStateAndCityFieldsByCountry, setShowStateAndCityFieldsByCountry] = useState('BRA')
    const [citiesByState, setCitiesByState] = useState<
        {
            label: string
            value: string
            estadoid: string
        }[]
    >([])
    const updateSchema = useMemo(() => {
        return yup.object({
            name: yup.string().required(yupMessages.required),
            email: yup.string().required(yupMessages.required).email(yupMessages.email),
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
    } = useFormWithSchema(updateSchema, {
        defaultValues: {
            name: profile.name,
            address: profile.address,
            email: profile.email,
            individualNumber: profile.individualNumber,
            workerNumber: profile.workerNumber,
        },
    })

    useEffect(() => {
        setShowStateAndCityFieldsByCountry(profile.address.country)
        if (profile.address.country === 'BRA') {
            const filterCities = lodashFilter(cities, (c) => c.estadoid === profile.address.state)
            setCitiesByState(filterCities)
        }
    }, [profile])

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

    const handleFormSubmit = useCallback<SubmitHandler<yup.Asserts<typeof updateSchema>>>(
        async (data) => {
            const address = lodashOmitBy(data.address, (v) => v === '' || v === null)
            reactSwal.fire({
                title: 'Por favor, aguarde...',
                allowEscapeKey: false,
                allowOutsideClick: false,
            })
            reactSwal.showLoading(null)
            const sendData = {
                ...data,
                address,
            }
            try {
                await fetcher({
                    url: '/user',
                    method: 'PUT',
                    data: {
                        ...sendData,
                        id: profile.id,
                    },
                    auth: token,
                })

                reactSwal.fire({
                    title: 'Sucesso!',
                    icon: 'success',
                    text: 'Dados atualizados com sucesso',
                    confirmButtonColor: sweetAlertOptions.confirmButtonColor,
                })
                onClose()
            } catch (e) {
                reactSwal.fire({
                    title: 'Oops!',
                    icon: 'error',
                    text: 'Ocorreu algum erro ao efetuar cadastro',
                    confirmButtonColor: sweetAlertOptions.confirmButtonColor,
                })
            }
        },
        [profile, onClose, token]
    )

    const handleDeleteUser = useCallback(async () => {
        reactSwal
            .fire({
                title: 'Tem certeza que deseja remover seus dados?',
                cancelButtonColor: sweetAlertOptions.cancelButtonColor,
                cancelButtonText: 'Cancelar!',
                confirmButtonColor: sweetAlertOptions.confirmButtonColor,
                confirmButtonText: 'Sim, remover!',
                icon: 'question',
                showCancelButton: true,
                text: 'Esta ação não pode ser revertida',
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    reactSwal.fire({
                        title: 'Por favor, aguarde...',
                        allowEscapeKey: false,
                        allowOutsideClick: false,
                    })
                    reactSwal.showLoading(null)
                    try {
                        await fetcher({
                            url: '/user',
                            method: 'DELETE',
                            auth: token,
                        })

                        reactSwal.fire({
                            title: 'Sucesso!',
                            icon: 'success',
                            text: 'Dados deletados. Você será deslogado.',
                            confirmButtonColor: sweetAlertOptions.confirmButtonColor,
                        })
                        signout()
                    } catch (e) {
                        reactSwal.fire({
                            title: 'Oops!',
                            icon: 'error',
                            text: 'Ocorreu algum erro ao efetuar cadastro',
                            confirmButtonColor: sweetAlertOptions.confirmButtonColor,
                        })
                    }
                }
            })
    }, [token, signout])

    return (
        <Drawer
            onClose={onClose}
            open={open}
            title='Atualize seus dados'
        >
            <form
                className='flex h-full flex-col divide-y divide-gray-200 bg-white border-t-2'
                onSubmit={handleSubmit(handleFormSubmit)}
            >
                <div className='flex-1 flex flex-col overflow-y-auto px-4 space-y-6 py-4'>
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
                    <div>
                        <InputGroup
                            error={errors.address?.zip?.message as string}
                            label='CEP'
                            name='address.zip'
                            register={register}
                            style='small'
                        />
                    </div>
                    <div>
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
                <div className='flex flex-shrink-0 flex-col-reverse sm:flex-row justify-between px-4 py-4 items-center'>
                    <button
                        className='mt-4 sm:mt-0 w-full sm:w-auto flex items-center justify-center py-1 px-1 sm:px-2 text-left text-sm sm:text-md text-red-600 font-semibold shadow rounded border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600'
                        onClick={handleDeleteUser}
                        type='button'
                    >
                        <FaTrash className='w-4 h-4 mr-2' /> Remover dados
                    </button>
                    <button
                        className='w-full sm:w-auto flex items-center justify-center py-1 sm:py-2 px-2 sm:px-4 text-center text-lg text-white font-semibold bg-cyan-800 hover:bg-cyan-900 border-3 border-cyan-900 shadow rounded transition duration-200'
                        type='submit'
                    >
                        <FaSave className='w-4 h-4 mr-2' /> Salvar
                    </button>
                </div>
            </form>
        </Drawer>
    )
}

export default DrawerFormUpdateUser
