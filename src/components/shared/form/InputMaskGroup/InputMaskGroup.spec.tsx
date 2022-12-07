import { fireEvent, render, renderHook } from '@testing-library/react'

import InputMaskGroup from '.'
import { useForm } from 'react-hook-form'

describe('InputMaskGroup component', () => {
    it('should render label and input correctly', async () => {
        const { result } = renderHook(() => useForm())

        const { container } = render(
            <InputMaskGroup
                control={result.current.control}
                error=''
                label='Phone'
                mask='(99) 99999-9999'
                name='Phone'
            />
        )

        const tagLabel = container.querySelector('label')
        expect(tagLabel).toHaveTextContent('Phone')

        const tagInput = container.querySelector('input') as HTMLInputElement
        expect(tagInput).toBeInTheDocument()

        fireEvent.change(tagInput, { target: { value: '12345678907' } })
        expect(tagInput.value).toBe('(12) 34567-8907')
    })

    it('should not render tag when error is empty', () => {
        const { result } = renderHook(() => useForm())

        const { container } = render(
            <InputMaskGroup
                control={result.current.control}
                error=''
                label='Phone'
                mask='(99) 99999-9999'
                name='Phone'
            />
        )

        const tagP = container.querySelector('p')
        expect(tagP).not.toBeInTheDocument()
    })

    it('should render tag when error is not empty', () => {
        const { result } = renderHook(() => useForm())

        const { container } = render(
            <InputMaskGroup
                control={result.current.control}
                error='Incorrect phone'
                label='Phone'
                mask='(99) 99999-9999'
                name='Phone'
            />
        )

        const tagP = container.querySelector('p')
        expect(tagP).toBeInTheDocument()
    })
})
