import { fireEvent, render, screen } from '@testing-library/react'

import Drawer from '.'

describe('Drawer component', () => {
    it('should render correctly', () => {
        const onCloseMock = jest.fn()
        render(
            <Drawer
                onClose={onCloseMock}
                open={true}
                title='Test'
            >
                <div>Opened drawer</div>
            </Drawer>
        )
        expect(screen.getByText('Opened drawer')).toBeInTheDocument()
        expect(screen.getByText('Test')).toBeInTheDocument()
    })

    it('should not render when the drawer is closed', () => {
        const onCloseMock = jest.fn()
        render(
            <Drawer
                onClose={onCloseMock}
                open={false}
                title='Test'
            >
                <div>Opened drawer</div>
            </Drawer>
        )
        expect(screen.queryByText('Opened drawer')).not.toBeInTheDocument()
    })

    it('should call onClose function when user click to close drawer', () => {
        const onCloseMock = jest.fn()
        render(
            <Drawer
                onClose={onCloseMock}
                open={true}
                title='Test'
            >
                <div>Opened drawer</div>
            </Drawer>
        )

        fireEvent.click(screen.getByTestId('close-drawer'))
        expect(onCloseMock).toHaveBeenCalled()
    })
})
