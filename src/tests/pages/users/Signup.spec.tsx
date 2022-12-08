import { render, screen } from '@testing-library/react'

import Signup from '../../../../pages/users/signup'

describe('Signup page', () => {
    it('should render correctly', () => {
        render(<Signup />)

        expect(screen.getByText('Cadastro')).toBeInTheDocument()
    })
})
