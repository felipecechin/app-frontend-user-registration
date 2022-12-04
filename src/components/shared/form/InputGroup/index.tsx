import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

import MessageError from '@/components/shared/MessageError'

interface IInputGroupProps<T extends FieldValues> {
    label: string
    error: string
    type?: string
    register: UseFormRegister<T>
    name: Path<T>
    placeholder?: string
}

function InputGroup<T extends FieldValues>({
    label,
    error,
    name,
    type = 'text',
    register,
    placeholder,
}: IInputGroupProps<T>): JSX.Element {
    return (
        <div>
            <label className='block mb-2 font-extrabold'>{label}</label>
            <input
                className='inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-cyan-700 bg-white shadow border-2 border-cyan-700 rounded focus:outline-none focus:ring focus:ring-cyan-300'
                placeholder={placeholder}
                {...register(name)}
                type={type}
            />
            {error && <MessageError message={error} />}
        </div>
    )
}

export default InputGroup
