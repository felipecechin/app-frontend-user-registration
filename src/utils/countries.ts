import lodashSortBy from 'lodash/sortBy'

const countries = [
    {
        value: 'AFG',
        label: 'Afeganistão',
    },
    {
        value: 'ALB',
        label: 'Albânia',
    },
    {
        value: 'DZA',
        label: 'Algéria',
    },
    {
        value: 'ASM',
        label: 'Samoa Americana',
    },
    {
        value: 'AND',
        label: 'Andorra',
    },
    {
        value: 'AGO',
        label: 'Angola',
    },
    {
        value: 'AIA',
        label: 'Anguilla',
    },
    {
        value: 'ATA',
        label: 'Antártida',
    },
    {
        value: 'ATG',
        label: 'Antigua e Barbuda',
    },
    {
        value: 'ARG',
        label: 'Argentina',
    },
    {
        value: 'ARM',
        label: 'Armênia',
    },
    {
        value: 'ABW',
        label: 'Aruba',
    },
    {
        value: 'AUS',
        label: 'Austrália',
    },
    {
        value: 'AUT',
        label: 'Áustria',
    },
    {
        value: 'AZE',
        label: 'Azerbaijão',
    },
    {
        value: 'BHS',
        label: 'Bahamas',
    },
    {
        value: 'BHR',
        label: 'Bahrein',
    },
    {
        value: 'BGD',
        label: 'Bangladesh',
    },
    {
        value: 'BRB',
        label: 'Barbados',
    },
    {
        value: 'BLR',
        label: 'Bielorrússia',
    },
    {
        value: 'BEL',
        label: 'Bélgica',
    },
    {
        value: 'BLZ',
        label: 'Belize',
    },
    {
        value: 'BEN',
        label: 'Benin',
    },
    {
        value: 'BMU',
        label: 'Bermuda',
    },
    {
        value: 'BTN',
        label: 'Butão',
    },
    {
        value: 'BOL',
        label: 'Bolívia',
    },
    {
        value: 'BIH',
        label: 'Bósnia e Herzegovina',
    },
    {
        value: 'BWA',
        label: 'Botswana',
    },
    {
        value: 'BVT',
        label: 'Ilha Bouvet',
    },
    {
        value: 'BRA',
        label: 'Brasil',
    },
    {
        value: 'IOT',
        label: 'Território Britânico do Oceano Índico',
    },
    {
        value: 'BRN',
        label: 'Brunei',
    },
    {
        value: 'BGR',
        label: 'Bulgária',
    },
    {
        value: 'BFA',
        label: 'Burkina Faso',
    },
    {
        value: 'BDI',
        label: 'Burundi',
    },
    {
        value: 'KHM',
        label: 'Camboja',
    },
    {
        value: 'CMR',
        label: 'Camarões',
    },
    {
        value: 'CAN',
        label: 'Canadá',
    },
    {
        value: 'CPV',
        label: 'Cabo Verde',
    },
    {
        value: 'CYM',
        label: 'Ilhas Cayman',
    },
    {
        value: 'CAF',
        label: 'República Centro-Africana',
    },
    {
        value: 'TCD',
        label: 'Chade',
    },
    {
        value: 'CHL',
        label: 'Chile',
    },
    {
        value: 'CHN',
        label: 'China',
    },
    {
        value: 'CXR',
        label: 'Ilha Christmas',
    },
    {
        value: 'CCK',
        label: 'Ilhas Cocos (Keeling)',
    },
    {
        value: 'COL',
        label: 'Colômbia',
    },
    {
        value: 'COM',
        label: 'Comores',
    },
    {
        value: 'COG',
        label: 'Congo',
    },
    {
        value: 'COD',
        label: 'Congo (DR)',
    },
    {
        value: 'COK',
        label: 'Ilhas Cook',
    },
    {
        value: 'CRI',
        label: 'Costa Rica',
    },
    {
        value: 'CIV',
        label: 'Costa do Marfim',
    },
    {
        value: 'HRV',
        label: 'Croácia',
    },
    {
        value: 'CUB',
        label: 'Cuba',
    },
    {
        value: 'CYP',
        label: 'Chipre',
    },
    {
        value: 'CZE',
        label: 'República Tcheca',
    },
    {
        value: 'DNK',
        label: 'Dinamarca',
    },
    {
        value: 'DJI',
        label: 'Djibuti',
    },
    {
        value: 'DMA',
        label: 'Dominica',
    },
    {
        value: 'DOM',
        label: 'República Dominicana',
    },
    {
        value: 'ECU',
        label: 'Equador',
    },
    {
        value: 'EGY',
        label: 'Egito',
    },
    {
        value: 'SLV',
        label: 'El Salvador',
    },
    {
        value: 'GNQ',
        label: 'Guiné Equatorial',
    },
    {
        value: 'ERI',
        label: 'Eritreia',
    },
    {
        value: 'EST',
        label: 'Estônia',
    },
    {
        value: 'ETH',
        label: 'Etiópia',
    },
    {
        value: 'FLK',
        label: 'Ilhas Malvinas',
    },
    {
        value: 'FRO',
        label: 'Ilhas Faroe',
    },
    {
        value: 'FJI',
        label: 'Fiji',
    },
    {
        value: 'FIN',
        label: 'Finlândia',
    },
    {
        value: 'FRA',
        label: 'França',
    },
    {
        value: 'GUF',
        label: 'Guiana Francesa',
    },
    {
        value: 'PYF',
        label: 'Polinésia Francesa',
    },
    {
        value: 'ATF',
        label: 'Terras Austrais e Antárticas Francesas',
    },
    {
        value: 'GAB',
        label: 'Gabão',
    },
    {
        value: 'GMB',
        label: 'Gâmbia',
    },
    {
        value: 'GEO',
        label: 'Geórgia',
    },
    {
        value: 'DEU',
        label: 'Alemanha',
    },
    {
        value: 'GHA',
        label: 'Gana',
    },
    {
        value: 'GIB',
        label: 'Gibraltar',
    },
    {
        value: 'GRC',
        label: 'Grécia',
    },
    {
        value: 'GRL',
        label: 'Groelândia',
    },
    {
        value: 'GRD',
        label: 'Granada',
    },
    {
        value: 'GLP',
        label: 'Guadalupe',
    },
    {
        value: 'GUM',
        label: 'Guão',
    },
    {
        value: 'GTM',
        label: 'Guatemala',
    },
    {
        value: 'GIN',
        label: 'Guiné',
    },
    {
        value: 'GNB',
        label: 'Guiné-Bissau',
    },
    {
        value: 'GUY',
        label: 'Guiana',
    },
    {
        value: 'HTI',
        label: 'Haiti',
    },
    {
        value: 'HMD',
        label: 'Ilhas Heard e McDonald',
    },
    {
        value: 'VAT',
        label: 'Vaticano',
    },
    {
        value: 'HND',
        label: 'Honduras',
    },
    {
        value: 'HKG',
        label: 'Hong Kong',
    },
    {
        value: 'HUN',
        label: 'Hungria',
    },
    {
        value: 'ISL',
        label: 'Islândia',
    },
    {
        value: 'IND',
        label: 'Índia',
    },
    {
        value: 'IDN',
        label: 'Indonésia',
    },
    {
        value: 'IRN',
        label: 'Iran',
    },
    {
        value: 'IRQ',
        label: 'Iraque',
    },
    {
        value: 'IRL',
        label: 'Irlanda',
    },
    {
        value: 'ISR',
        label: 'Israel',
    },
    {
        value: 'ITA',
        label: 'Italia',
    },
    {
        value: 'JAM',
        label: 'Jamaica',
    },
    {
        value: 'JPN',
        label: 'Japão',
    },
    {
        value: 'JOR',
        label: 'Jornânia',
    },
    {
        value: 'KAZ',
        label: 'Cazaquistão',
    },
    {
        value: 'KEN',
        label: 'Quênia',
    },
    {
        value: 'KIR',
        label: 'Kiribati',
    },
    {
        value: 'PRK',
        label: 'Coreia do Norte',
    },
    {
        value: 'KOR',
        label: 'Coreia do Sul',
    },
    {
        value: 'KWT',
        label: 'Kuwait',
    },
    {
        value: 'KGZ',
        label: 'Quirguistão',
    },
    {
        value: 'LAO',
        label: 'Laos',
    },
    {
        value: 'LVA',
        label: 'Letônia',
    },
    {
        value: 'LBN',
        label: 'Líbano',
    },
    {
        value: 'LSO',
        label: 'Lesoto',
    },
    {
        value: 'LBR',
        label: 'Libéria',
    },
    {
        value: 'LBY',
        label: 'Líbia',
    },
    {
        value: 'LIE',
        label: 'Liechtenstein',
    },
    {
        value: 'LTU',
        label: 'Lituânia',
    },
    {
        value: 'LUX',
        label: 'Luxemburgo',
    },
    {
        value: 'MAC',
        label: 'Macao',
    },
    {
        value: 'MKD',
        label: 'Macedônia',
    },
    {
        value: 'MDG',
        label: 'Madagascar',
    },
    {
        value: 'MWI',
        label: 'Malawi',
    },
    {
        value: 'MYS',
        label: 'Malásia',
    },
    {
        value: 'MDV',
        label: 'Maldivas',
    },
    {
        value: 'MLI',
        label: 'Mali',
    },
    {
        value: 'MLT',
        label: 'Malta',
    },
    {
        value: 'MHL',
        label: 'Ilhas Marshall',
    },
    {
        value: 'MTQ',
        label: 'Martinica',
    },
    {
        value: 'MRT',
        label: 'Mauritânia',
    },
    {
        value: 'MUS',
        label: 'Maurício',
    },
    {
        value: 'MYT',
        label: 'Mayotte',
    },
    {
        value: 'MEX',
        label: 'México',
    },
    {
        value: 'FSM',
        label: 'Micronésia',
    },
    {
        value: 'MDA',
        label: 'Moldova',
    },
    {
        value: 'MCO',
        label: 'Mônaco',
    },
    {
        value: 'MNG',
        label: 'Mongólia',
    },
    {
        value: 'MSR',
        label: 'Montserrat',
    },
    {
        value: 'MAR',
        label: 'Marrocos',
    },
    {
        value: 'MOZ',
        label: 'Moçambique',
    },
    {
        value: 'MMR',
        label: 'Birmânia',
    },
    {
        value: 'NAM',
        label: 'Namíbia',
    },
    {
        value: 'NRU',
        label: 'Nauru',
    },
    {
        value: 'NPL',
        label: 'Nepal',
    },
    {
        value: 'NLD',
        label: 'Holanda',
    },
    {
        value: 'ANT',
        label: 'Antilhas Holandesas',
    },
    {
        value: 'NCL',
        label: 'Nova Caledônia',
    },
    {
        value: 'NZL',
        label: 'Nova Zelândia',
    },
    {
        value: 'NIC',
        label: 'Nicarágua',
    },
    {
        value: 'NER',
        label: 'Niger',
    },
    {
        value: 'NGA',
        label: 'Nigéria',
    },
    {
        value: 'NIU',
        label: 'Niue',
    },
    {
        value: 'NFK',
        label: 'Ilha Norfolk',
    },
    {
        value: 'MNP',
        label: 'Ilhas Marianas do Norte',
    },
    {
        value: 'NOR',
        label: 'Noruega',
    },
    {
        value: 'OMN',
        label: 'Omã',
    },
    {
        value: 'PAK',
        label: 'Paquistão',
    },
    {
        value: 'PLW',
        label: 'Palau',
    },
    {
        value: 'PSE',
        label: 'Palestina',
    },
    {
        value: 'PAN',
        label: 'Panamá',
    },
    {
        value: 'PNG',
        label: 'Papua-Nova Guiné',
    },
    {
        value: 'PRY',
        label: 'Paraguai',
    },
    {
        value: 'PER',
        label: 'Peru',
    },
    {
        value: 'PHL',
        label: 'Filipinas',
    },
    {
        value: 'PCN',
        label: 'Ilhas Picárnia',
    },
    {
        value: 'POL',
        label: 'Polônia',
    },
    {
        value: 'PRT',
        label: 'Portugal',
    },
    {
        value: 'PRI',
        label: 'Porto Rico',
    },
    {
        value: 'QAT',
        label: 'Catar',
    },
    {
        value: 'REU',
        label: 'Reunião',
    },
    {
        value: 'ROM',
        label: 'Romênia',
    },
    {
        value: 'RUS',
        label: 'Rússia',
    },
    {
        value: 'RWA',
        label: 'Ruanda',
    },
    {
        value: 'SHN',
        label: 'Santa Helena',
    },
    {
        value: 'KNA',
        label: 'São Cristóvão',
    },
    {
        value: 'LCA',
        label: 'Santa Lúcia',
    },
    {
        value: 'SPM',
        label: 'São Pedro e Miquelon',
    },
    {
        value: 'VCT',
        label: 'São Vicente e Granadinas',
    },
    {
        value: 'WSM',
        label: 'Samoa',
    },
    {
        value: 'SMR',
        label: 'São Marino',
    },
    {
        value: 'STP',
        label: 'Sao Tomé e Príncipe',
    },
    {
        value: 'SAU',
        label: 'Arábia Saudita',
    },
    {
        value: 'SEN',
        label: 'Senegal',
    },
    {
        value: 'SRB',
        label: 'Sérvia e Montenegro',
    },
    {
        value: 'SYC',
        label: 'Seicheles',
    },
    {
        value: 'SLE',
        label: 'República da Serra Leoa',
    },
    {
        value: 'SGP',
        label: 'Singapura',
    },
    {
        value: 'SVK',
        label: 'Eslováquia',
    },
    {
        value: 'SVN',
        label: 'Eslovênia',
    },
    {
        value: 'SLB',
        label: 'Ilhas Salomão',
    },
    {
        value: 'SOM',
        label: 'Somália',
    },
    {
        value: 'ZAF',
        label: 'África do Sul',
    },
    {
        value: 'SGS',
        label: 'Ilhas Geórgia do Sul e Sandwich do Sul',
    },
    {
        value: 'ESP',
        label: 'Espanha',
    },
    {
        value: 'LKA',
        label: 'Sri Lanka',
    },
    {
        value: 'SDN',
        label: 'Sudão',
    },
    {
        value: 'SUR',
        label: 'Suriname',
    },
    {
        value: 'SJM',
        label: 'Esvalbarde',
    },
    {
        value: 'SWZ',
        label: 'Suazilândia',
    },
    {
        value: 'SWE',
        label: 'Suécia',
    },
    {
        value: 'CHE',
        label: 'Suiça',
    },
    {
        value: 'SYR',
        label: 'Síria',
    },
    {
        value: 'TWN',
        label: 'Taiwan',
    },
    {
        value: 'TJK',
        label: 'Tajiquistão',
    },
    {
        value: 'TZA',
        label: 'Tanzânia',
    },
    {
        value: 'THA',
        label: 'Tailândia',
    },
    {
        value: 'TLS',
        label: 'Timor-Leste',
    },
    {
        value: 'TGO',
        label: 'Togo',
    },
    {
        value: 'TKL',
        label: 'Toquelau',
    },
    {
        value: 'TON',
        label: 'Tonga',
    },
    {
        value: 'TTO',
        label: 'Trinidad e Tobago',
    },
    {
        value: 'TUN',
        label: 'Tunísia',
    },
    {
        value: 'TUR',
        label: 'Turquia',
    },
    {
        value: 'TKM',
        label: 'Turcomenistão',
    },
    {
        value: 'TCA',
        label: 'Ilhas Turks e Caicos',
    },
    {
        value: 'TUV',
        label: 'Tuvalu',
    },
    {
        value: 'UGA',
        label: 'Uganda',
    },
    {
        value: 'UKR',
        label: 'Ucrânia',
    },
    {
        value: 'ARE',
        label: 'Emirados Árabes',
    },
    {
        value: 'GBR',
        label: 'Reino Unido',
    },
    {
        value: 'USA',
        label: 'Estados Unidos',
    },
    {
        value: 'UMI',
        label: 'Ilhas Menores Distantes dos Estados Unidos',
    },
    {
        value: 'URY',
        label: 'Uruguai',
    },
    {
        value: 'UZB',
        label: 'Uzbequistão',
    },
    {
        value: 'VUT',
        label: 'Vanuatu',
    },
    {
        value: 'VEN',
        label: 'Venezuela',
    },
    {
        value: 'VNM',
        label: 'Vietnam',
    },
    {
        value: 'VGB',
        label: 'Ilhas Virgens Inglesas',
    },
    {
        value: 'VIR',
        label: 'Ilhas Virgens',
    },
    {
        value: 'WLF',
        label: 'Wallis e Futuna',
    },
    {
        value: 'ESH',
        label: 'Saara Ocidental',
    },
    {
        value: 'YEM',
        label: 'Iêmen',
    },
    {
        value: 'ZMB',
        label: 'Zâmbia',
    },
    {
        value: 'ZWE',
        label: 'Zimbábue',
    },
]

export default lodashSortBy(countries, ['label'])
