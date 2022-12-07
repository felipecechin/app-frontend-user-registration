import { render, screen } from '@testing-library/react'

import DrawerFormUpdateUser from '.'

const profileMock = {
    email: 'ficechin@hotmail.com',
    name: 'Felipe',
    individualNumber: '93518921070',
    workerNumber: '9889432',
    address: {
        street: 'Avenida Dores',
        number: 4,
        city: 'Santa Maria',
        state: 'RS',
        country: 'BRA',
        zip: '9705000',
    },
}

describe('DrawerFormUpdateUser component', () => {
    it('should render correctly', () => {
        const onCloseMock = jest.fn()
        render(
            <DrawerFormUpdateUser
                onClose={onCloseMock}
                open={true}
                profile={profileMock}
            />
        )

        expect(screen.getByText('Atualize seus dados')).toBeInTheDocument()
    })
})
