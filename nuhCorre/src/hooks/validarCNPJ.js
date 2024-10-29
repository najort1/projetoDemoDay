function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj === '' || cnpj.length !== 14) return false;

    // Elimina CNPJs inválidos conhecidos
    const invalidCNPJs = [
        "00000000000000", "11111111111111", "22222222222222",
        "33333333333333", "44444444444444", "55555555555555",
        "66666666666666", "77777777777777", "88888888888888",
        "99999999999999"
    ];
    if (invalidCNPJs.includes(cnpj)) return false;

    // Valida DVs
    if (!validarDigitoVerificador(cnpj, 12) || !validarDigitoVerificador(cnpj, 13)) {
        return false;
    }

    return true;
}

function validarDigitoVerificador(cnpj, tamanho) {
    const numeros = cnpj.substring(0, tamanho);
    const digito = cnpj.charAt(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }

    const resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    return resultado == digito;
}
export default validarCNPJ;