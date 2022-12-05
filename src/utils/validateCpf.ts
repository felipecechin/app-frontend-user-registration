import getOnlyNumbers from './getOnlyNumbers'

export default function validateCpf(cpf: string): boolean {
    let sum = 0
    let rest: number
    let i: number
    let digit: number
    const onlyNumbers = getOnlyNumbers(cpf)
    const cpfArray = onlyNumbers.split('')
    if (cpfArray.length !== 11) {
        return false
    }
    for (i = 0; i < 9; i++) {
        sum += parseInt(cpfArray[i]) * (10 - i)
    }
    rest = sum % 11
    if (rest < 2) {
        digit = 0
    } else {
        digit = 11 - rest
    }
    if (digit !== parseInt(cpfArray[9])) {
        return false
    }
    sum = 0
    for (i = 0; i < 10; i++) {
        sum += parseInt(cpfArray[i]) * (11 - i)
    }
    rest = sum % 11
    if (rest < 2) {
        digit = 0
    } else {
        digit = 11 - rest
    }
    if (digit !== parseInt(cpfArray[10])) {
        return false
    }

    return true
}
