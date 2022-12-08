import { render, screen } from '@testing-library/react'

import Signin from '../../../../pages/users/signin'

describe('Signin page', () => {
    it('should render correctly', () => {
        render(<Signin />)

        expect(screen.getByText('Olá, visitante!')).toBeInTheDocument()

        const tagLinkToSignup = screen.getByText('Não tem uma conta? Cadastre-se aqui')
        expect(tagLinkToSignup).toHaveAttribute('href', '/users/signup')
    })
})
