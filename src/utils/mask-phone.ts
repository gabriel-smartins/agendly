export function maskPhone(value: string) {
    const cleanValue = value.replace(/\D/g, '')

    if (cleanValue.length > 11) {
        return value.slice(0, 15)
    }

    const maskedValue = cleanValue
        .replace(/^(\d{2})(\d)/g, '($1) $2')
        .replace(/(\d{4,5})(\d{4})$/, '$1-$2')

    return maskedValue
}

export function extractPhoneNumbre(phone: string) {
    const phoneValue = phone.replace(/[\(\)\s-]/g, '')

    return phoneValue
}
