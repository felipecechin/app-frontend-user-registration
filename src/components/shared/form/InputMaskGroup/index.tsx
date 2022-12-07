import { Control, Controller, FieldValues, Path, PathValue } from 'react-hook-form'

import MessageError from '@/components/shared/MessageError'
import React from 'react'
import dynamic from 'next/dynamic'

// eslint-disable-next-line @typescript-eslint/naming-convention
const InputMask = dynamic(() => import('react-input-mask'), { ssr: false })

interface IInputMaskGroupProps<T extends FieldValues> {
    label: string
    error: string
    control: Control<T>
    name: Path<T>
    mask: string
}

/**
 *
 * @name InputMaskGroup
 * @description InputMaskGroup component with an input mask
 * @returns JSX.Element
 * @since 2022-03-28
 * @author Felipe Cechin
 */
function InputMaskGroup<T extends FieldValues>({
    control,
    name,
    label,
    error,
    mask,
}: IInputMaskGroupProps<T>): JSX.Element {
    return (
        <>
            <label
                className={'block mb-1 font-medium'}
                htmlFor={name}
            >
                {label}
            </label>
            <Controller
                control={control}
                defaultValue={'' as PathValue<T, Path<T>>}
                name={name}
                render={({ field: { onChange, onBlur, value } }) => (
                    <InputMask
                        className={
                            'w-full placeholder-cyan-700 bg-white shadow border-2 border-cyan-700 rounded focus:outline-none focus:ring focus:ring-cyan-300 p-2'
                        }
                        mask={mask}
                        maskPlaceholder={null}
                        onBlur={onBlur}
                        onChange={onChange}
                        type={'text'}
                        value={value}
                    />
                )}
            />
            {error && <MessageError message={error} />}
        </>
    )
}

export default InputMaskGroup
