import { render, screen } from '@testing-library/react'

import MessageError from '.'

describe('MessageError component', () => {
    it('should render correctly', () => {
        render(<MessageError message='message error test' />)

        expect(screen.getByText('message error test')).toBeInTheDocument()
    })

    it('should render p tag and text should have red color', () => {
        const { container } = render(<MessageError message='message error test' />)

        const tagP = container.querySelector('p')
        expect(tagP).toHaveClass('text-red-600')
    })
})
