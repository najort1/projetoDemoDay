/**
 * Valida um número de telefone brasileiro.
 * @param {string} telefone - O número de telefone a ser validado.
 * @returns {boolean} Retorna true se o número de telefone é válido e false caso contrário.
 */
export function validarTelefone(telefone) {
    telefone = telefone.replace(/\D/g, '');
  
    // Verifica se o número tem o comprimento correto
    if (telefone.length < 10 || telefone.length > 11) return false;

    // Verifica se é um celular com o dígito 9 na posição correta
    if (telefone.length === 11 && parseInt(telefone.substring(2, 3)) !== 9) return false;
  
    // Verifica se o número não é composto por dígitos repetidos
    for (let i = 0; i < 10; i++) {
      if (telefone === new Array(11).join(i) || telefone === new Array(12).join(i)) {
        return false;
      }
    }
  
    // Verifica se o DDD do número de telefone é válido
    const codigosDDD = [11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62, 64, 63, 65, 66, 67, 68, 69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88, 89, 91, 92, 93, 94, 95, 96, 97, 98, 99];

    if (codigosDDD.indexOf(parseInt(telefone.substring(0, 2))) === -1) return false;

    // Verifica se é um telefone fixo válido
    if (telefone.length === 10 && [2, 3, 4, 5, 7].indexOf(parseInt(telefone.substring(2, 3))) === -1) return false;
  
    return true;
}
