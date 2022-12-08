export interface IUserProfile {
    name: string
    email: string
    individualNumber: string
    workerNumber: string
    address: {
        country: string
        state: string
        city: string
        zip: string
        street: string
        number: number
        complement?: string | null
    }
}
