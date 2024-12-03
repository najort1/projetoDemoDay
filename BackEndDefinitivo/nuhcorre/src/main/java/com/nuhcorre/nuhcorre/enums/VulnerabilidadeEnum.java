package com.nuhcorre.nuhcorre.enums;

public enum VulnerabilidadeEnum {

    AUTISMO("Pessoas com Transtorno do Espectro Autista (TEA), que enfrentam desafios na comunicação e interação social."),
    TDAH("Pessoas com Transtorno de Déficit de Atenção e Hiperatividade, que podem ter dificuldades de concentração e impulsividade."),
    MAE_SOLTEIRA("Mulheres que criam seus filhos sozinhas, enfrentando desafios econômicos e sociais."),
    IDOSO("Pessoas acima de 60 anos, que podem estar em situação de fragilidade ou isolamento."),
    DEFICIENTE_FISICO("Pessoas com limitações motoras ou físicas que impactam sua mobilidade."),
    DEFICIENTE_AUDITIVO("Pessoas com perda total ou parcial da audição."),
    DEFICIENTE_VISUAL("Pessoas com perda total ou parcial da visão."),
    DEFICIENTE_MENTAL("Pessoas com transtornos mentais que impactam sua saúde emocional e psicológica."),
    DEFICIENTE_INTELECTUAL("Pessoas com limitações no funcionamento intelectual e na adaptação às atividades diárias."),
    DEFICIENTE_MULTIPLAS_DEFICIENCIAS("Pessoas que possuem mais de uma deficiência, combinando limitações físicas, sensoriais ou intelectuais."),
    DEFICIENTE_TRANSTORNO_DE_DESENVOLVIMENTO("Pessoas com transtornos que afetam o desenvolvimento global."),
    DEFICIENTE_SINDROME_DE_DOWN("Pessoas com síndrome de Down, caracterizada por alterações genéticas que afetam o desenvolvimento físico e intelectual."),
    PESSOA_TRANS("Pessoas transgênero, que enfrentam discriminação e exclusão social."),
    PESSOA_NEGRA("Pessoas negras, que frequentemente enfrentam racismo estrutural e desigualdades históricas."),
    PESSOA_INDIGENA("Povos indígenas, que lidam com desafios como exclusão social, acesso limitado a recursos e preservação cultural."),
    REFUGIADO("Pessoas forçadas a deixar seu país de origem devido a conflitos ou perseguições."),
    MULHER("Mulheres em geral, que enfrentam desigualdade de gênero, violência doméstica e outras formas de opressão."),
    PESSOA_EM_SITUACAO_DE_RUA("Indivíduos em situação de rua, que carecem de moradia e enfrentam vulnerabilidade extrema."),
    IMIGRANTE("Pessoas migrantes, que podem enfrentar dificuldades de adaptação, idioma e discriminação."),
    LGBTQIA_PLUS("Pessoas LGBTQIA+, que enfrentam desafios relacionados à aceitação, discriminação e preconceito.");

    private final String descricao;

    VulnerabilidadeEnum(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
