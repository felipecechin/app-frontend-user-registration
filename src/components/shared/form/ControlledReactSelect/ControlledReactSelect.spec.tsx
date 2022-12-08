/* eslint-disable @typescript-eslint/no-explicit-any */
import * as ReactHookForm from 'react-hook-form'

import { render, renderHook } from '@testing-library/react'

import ControlledReactSelect from '.'

const optionsMock = [
    {
        label: 'Option 1',
        value: 'option1',
    },
    {
        label: 'Option 2',
        value: 'option2',
    },
]

describe('ControlledReactSelect component', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should render label and input correctly', async () => {
        const { result } = renderHook(() => ReactHookForm.useForm())

        const { container } = render(
            <ControlledReactSelect
                control={result.current.control}
                error=''
                label='Select label'
                name='Select'
                options={optionsMock}
                placeholder='Select an option'
            />
        )

        const tagLabel = container.querySelector('label')
        expect(tagLabel).toHaveTextContent('Select label')

        const tagInput = container.querySelector('input')
        expect(tagInput).toBeInTheDocument()

        const tagDivWithPlaceholder = container.querySelector('#react-select-react-selectSelect-placeholder')
        expect(tagDivWithPlaceholder).toHaveTextContent('Select an option')
    })

    it('should render the selected option label', async () => {
        const onChangeMocked = jest.fn()
        jest.spyOn(ReactHookForm, 'useController').mockReturnValueOnce({
            field: {
                onChange: onChangeMocked,
                value: 'option1',
            },
        } as any)

        const { result } = renderHook(() => ReactHookForm.useForm())

        const { container } = render(
            <ControlledReactSelect
                control={result.current.control}
                error=''
                label='Select label'
                name='Select'
                options={optionsMock}
                placeholder='Select an option'
            />
        )

        const divShowingOptionLabel = container.querySelector('.css-1dimb5e-singleValue')
        expect(divShowingOptionLabel).toHaveTextContent('Option 1')
    })

    it('should not render tag when error is empty', async () => {
        const { result } = renderHook(() => ReactHookForm.useForm())

        const { container } = render(
            <ControlledReactSelect
                control={result.current.control}
                error=''
                label='Select label'
                name='Select'
                options={optionsMock}
                placeholder='Select an option'
            />
        )

        const tagP = container.querySelector('p')
        expect(tagP).not.toBeInTheDocument()
    })

    it('should render tag when error is not empty', async () => {
        const { result } = renderHook(() => ReactHookForm.useForm())

        const { container } = render(
            <ControlledReactSelect
                control={result.current.control}
                error='Please, select an option'
                label='Select label'
                name='Select'
                options={optionsMock}
                placeholder='Select an option'
            />
        )

        const tagP = container.querySelector('p')
        expect(tagP).toBeInTheDocument()
    })
})
