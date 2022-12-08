import { render, screen } from '@testing-library/react'

import Home from '../../../pages'

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

describe('Home page', () => {
    it('should render correctly', () => {
        render(<Home profile={profileMock} />)

        expect(screen.getByText('Olá, ' + profileMock.name + '!')).toBeInTheDocument()
        expect(screen.getByText('Editar dados')).toBeInTheDocument()
    })
})
