/* eslint-disable @typescript-eslint/no-explicit-any */
import { reactSwal, sweetAlertOptions } from './sweetAlert'

import FetchError from './FetchError'

const apiErrorMessages: Record<string, string> = {
    'Email already in use': 'E-mail informado já está sendo usado. Por favor, informe outro.',
    'Individual number already in use': 'CPF informado já está sendo usado. Por favor, informe outro.',
    'Worker number already in use': 'PIS informado já está sendo usado. Por favor, informe outro.',
}

function showFetchError(error: any): void {
    let message: string
    if (error instanceof FetchError && error.data.message) {
        const messageKey = error.data.message as string
        message = apiErrorMessages[messageKey] || 'Ocorreu um erro desconhecido'
    } else {
        message = 'Ocorreu um erro desconhecido'
    }
    reactSwal.fire({
        title: 'Oops!',
        icon: 'error',
        text: message,
        confirmButtonColor: sweetAlertOptions.confirmButtonColor,
    })
}

export default showFetchError
