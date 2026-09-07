// - Value in cents  = value in real * 100
// - Value in real = value in cents / 100

/**
 * Converte um valor monetário em reais (BRL) para centavos.
 * @param {string} amount - O valor monetário em reais (BRL) a ser convertido.
 * @returns {number} O valor convertido em centavos.
 */

export function convertRealToCents(amount: string) {
    if (!amount) return 0

    const numericPrice = parseFloat(amount.replace(/\./g, '').replace(',', '.'))

    const priceInCents = Math.round(numericPrice * 100)

    return priceInCents
}

export function convertCentsToReal(amount: number | string) {
    if (!amount) return '0,00'

    const numericPrice = Number(amount)
    const priceInReal = numericPrice / 100

    return priceInReal
        .toFixed(2)
        .replace('.', ',')
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
