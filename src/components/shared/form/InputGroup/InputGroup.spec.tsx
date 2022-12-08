import { render, renderHook } from '@testing-library/react'

import InputGroup from '.'
import { useForm } from 'react-hook-form'

describe('InputGroup component', () => {
    it('should render label and input correctly', () => {
        const { result } = renderHook(() => useForm())

        const { container } = render(
            <InputGroup
                error=''
                label='Name'
                name='name'
                placeholder='Name'
                register={result.current.register}
                style='small'
            />
        )

        const tagLabel = container.querySelector('label')
        expect(tagLabel).toHaveTextContent('Name')
        const tagInput = container.querySelector('input')
        expect(tagInput).toHaveAttribute('placeholder', 'Name')
        expect(tagInput).toHaveAttribute('name', 'name')
    })

    it('should not render tag when error is empty', () => {
        const { result } = renderHook(() => useForm())

        const { container } = render(
            <InputGroup
                error=''
                label='Name'
                name='name'
                placeholder='Name'
                register={result.current.register}
                style='small'
            />
        )

        const tagP = container.querySelector('p')
        expect(tagP).not.toBeInTheDocument()
    })

    it('should render correctly when style property is small', () => {
        const { result } = renderHook(() => useForm())

        const { container } = render(
            <InputGroup
                error=''
                label='Name'
                name='name'
                placeholder='Name'
                register={result.current.register}
                style='small'
            />
        )

        const tagLabel = container.querySelector('label')
        expect(tagLabel).toHaveClass('font-medium')
        const tagInput = container.querySelector('input')
        expect(tagInput).not.toHaveClass('text-lg')
    })

    it('should render correctly when style property is big', () => {
        const { result } = renderHook(() => useForm())

        const { container } = render(
            <InputGroup
                error=''
                label='Name'
                name='name'
                placeholder='Name'
                register={result.current.register}
                style='big'
            />
        )

        const tagLabel = container.querySelector('label')
        expect(tagLabel).toHaveClass('font-extrabold')
        const tagInput = container.querySelector('input')
        expect(tagInput).toHaveClass('text-lg')
    })

    it('should render correctly when error is not empty', () => {
        const { result } = renderHook(() => useForm())

        const { container } = render(
            <InputGroup
                error='Incorrect name'
                label='Name'
                name='name'
                placeholder='Name'
                register={result.current.register}
                style='big'
            />
        )

        const tagP = container.querySelector('p')
        expect(tagP).toHaveTextContent('Incorrect name')
    })
})
