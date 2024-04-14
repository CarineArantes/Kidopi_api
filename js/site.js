// Busca qual foi o último país procurado
async function getLog() {
    try {
        const response = await fetch("service/api.php");

        if (!response.ok) {
            throw new Error('Erro ao obter os logs: ' + response.status);
        }

        const data = await response.json();

        // Limpa o conteúdo atual da div
        document.getElementById('log').innerHTML = '';

        // Itera sobre os resultados e adiciona-os à div
        data.forEach(log => {
            var p = document.createElement('p');
            p.textContent = 'Última consulta: ' + log.date + ' - ' + log.country;
            document.getElementById('log').appendChild(p);
        });
    } catch (error) {
        console.error('Erro ao obter os logs:', error);
    }
}

// Insere no banco a data/hora da busca, nome do país
async function insertLog(country) {
    var url = "service/api.php";
    var params = new URLSearchParams();
    params.append('country', country);
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        });

        if (!response.ok) {
            throw new Error('Erro ao obter os dados: ' + response.statusText);
        }

        return await response.text();
    } catch (error) {
        console.error('Erro ao obter os dados:', error);
        throw error;
    }
}

// Busca na api o país selecionado
async function searchCountry(country) {
    try {
        const { status, data } = await axios.get(`https://dev.kidopilabs.com.br/exercicio/covid.php?pais=${country}`)
        if (status != 200) throw new Error("Falha ao buscar dados do país!");
        await insertLog(country);
        return data
    }
    catch (error) {
        throw new Error("Falha ao buscar dados do país!");
    }
}

function maskNumber(numero) {
    const numeroString = String(numero);
    const [parteInteira, parteDecimal] = numeroString.split('.');
    const parteInteiraFormatada = parteInteira.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return parteDecimal ? `${parteInteiraFormatada}.${parteDecimal}` : parteInteiraFormatada;
}

// Cria o modal com base nos resultados da busca na api
function createModal(countryData) {

    let totalCases = 0;
    let totalDeaths = 0;

    // Limpar qualquer conteúdo existente
    const detailsCasesDeaths = document.getElementById('detailsCasesDeaths');
    detailsCasesDeaths.textContent = '';

    // Cria um novo fragmento de documento
    const fragment = document.createDocumentFragment();

    // Itera sobre os dados do país e criar elementos para cada item
    Object.keys(countryData).forEach(key => {
        const obj = countryData[key];

        // Cria elementos DOM
        const divWrapper = document.createElement('div');
        divWrapper.classList.add('d-flex', 'w-100');

        const divLeft = document.createElement('div');
        divLeft.classList.add('w-50');
        const spanLeft = document.createElement('span');
        spanLeft.textContent = obj.ProvinciaEstado;
        divLeft.appendChild(spanLeft);

        const divRight = document.createElement('div');
        divRight.classList.add('d-flex', 'w-50', 'justify-content-between');
        const spanConfirmed = document.createElement('span');
        spanConfirmed.textContent = maskNumber(obj.Confirmados);
        const spanDeaths = document.createElement('span');
        spanDeaths.textContent = maskNumber(obj.Mortos);

        divRight.appendChild(spanConfirmed);
        divRight.appendChild(spanDeaths);
        // Anexa elementos
        divWrapper.appendChild(divLeft);
        divWrapper.appendChild(divRight);

        fragment.appendChild(divWrapper);

        totalCases += obj.Confirmados;
        totalDeaths += obj.Mortos;

        const pTotalCases = document.getElementById('totalConfirmedCases');
        pTotalCases.textContent = maskNumber(totalCases);
        const pTotalDeaths = document.getElementById('totalConfirmedDeaths');
        pTotalDeaths.textContent = maskNumber(totalDeaths);



    });
    // Anexa o fragmento ao elemento desejado
    detailsCasesDeaths.appendChild(fragment);

}

// Função para abrir o modal
function openModal(title) {
    const myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
    const modalTitle = document.getElementById('staticBackdropLabel');
    modalTitle.textContent = title;
    myModal.show();
}

// Chama handleClick ao selecionar um país
async function handleClick(country) {
    try {
        const countryData = await searchCountry(country);
        createModal(countryData);
        getLog();
        openModal(country);
    }
    catch (error) {
        console.error(error.message);
    }
}

// Chama getLog ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
    getLog();
});
