import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

import MessageError from '@/components/shared/MessageError'
import classNames from '@/utils/classNames'

interface IInputGroupProps<T extends FieldValues> {
    label: string
    error: string
    type?: string
    register: UseFormRegister<T>
    name: Path<T>
    placeholder?: string
    style: 'small' | 'big'
}

function InputGroup<T extends FieldValues>({
    label,
    error,
    name,
    type = 'text',
    register,
    placeholder,
    style = 'small',
}: IInputGroupProps<T>): JSX.Element {
    return (
        <>
            <label
                className={classNames(
                    'block mb-1',
                    style === 'big' ? 'font-extrabold' : 'font-medium'
                )}
            >
                {label}
            </label>
            <input
                className={classNames(
                    'w-full placeholder-cyan-700 bg-white shadow border-2 border-cyan-700 rounded focus:outline-none focus:ring focus:ring-cyan-300',
                    style === 'big' ? 'p-4 text-lg font-extrabold' : 'p-2'
                )}
                placeholder={placeholder}
                {...register(name)}
                type={type}
            />
            {error && <MessageError message={error} />}
        </>
    )
}

export default InputGroup
