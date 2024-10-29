function validarCPF(cpf) {

    if(cpf.includes('@')) return false;
    
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf === '') return false;

    // Elimina CPFs inválidos conhecidos
    const invalidCPFs = [
        "00000000000", "11111111111", "22222222222",
        "33333333333", "44444444444", "55555555555",
        "66666666666", "77777777777", "88888888888",
        "99999999999"
    ];
    if (cpf.length !== 11 || invalidCPFs.includes(cpf)) return false;

    // Valida os dígitos verificadores
    if (!validarDigitoVerificador(cpf, 9, 10) || !validarDigitoVerificador(cpf, 10, 11)) {
        return false;
    }

    return true;
}

function validarDigitoVerificador(cpf, tamanho, pesoInicial) {
    let soma = 0;
    for (let i = 0; i < tamanho; i++) {
        soma += parseInt(cpf.charAt(i)) * (pesoInicial - i);
    }
    let resultado = 11 - (soma % 11);
    if (resultado === 10 || resultado === 11) resultado = 0;
    return resultado === parseInt(cpf.charAt(tamanho));
}

export default validarCPF;