
let numClasses = document.getElementById('idNumClass')
let conter = document.getElementById('conter')
let btnButton = document.getElementById('btnButton')
let tableGrid = document.getElementById('tableGrid')

// Número de classes ajustável pelo usuário
let rawNumclass = 0

// Função principal para inicializar a tabela de frequência
function initializeTable() {
    let table = document.getElementById('idDataTable').value

    // Convertendo os valores da tabela em uma lista numérica
    let rawDataMatrix = table.split(/[\s,]+/).map(Number);

    // removendo o zero que aparece na tabela quando o usuario coloca um espaço antes e depois na tabela
    removeSideZeros(rawDataMatrix)
    
    if (asNanInTable(rawDataMatrix) || rawDataMatrix == 0) {
        window.alert('Digite uma tabela válida para a execução do programa. Ela deve conter apenas números, exceto o zero (0).')
        
    } else {
        
        // Removendo qualquer tabela existente antes de criar uma nova
        removeTable(tableGrid)
        
        //transformando a trabela em formato crescente
        const dataMatrix = rawDataMatrix.sort()
        
        // tamanho da tabela
        let N = rawDataMatrix.length
        
        // formula de Sturges para obter o K(classe)
        let sturgesfomule = Math.round( 1 + 3.3 * Math.log10(N))
        
        // Obtendo os valores mínimo e máximo da amostra
        const min = Math.min(...dataMatrix)
        const max = Math.max(...dataMatrix)
        
        // Determinando o número de classes baseado na escolha do usuário ou fórmula de Sturges
        let k = rawNumclass > 0 ? rawNumclass : sturgesfomule;
        
        // obtendo a amplitude total subistraindo o valor maximo pelo menor valor
        let At = max - min

        // tamanho da classe dividindo amplitude total pelo numero de classes
        let rawAi = At / k

        // arredondando o valor para cima não importa o valor quebrado
        let Ai = Math.ceil(rawAi)

        // Criando os intervalos de classe
        const interval = createInterval(min, k, Ai)

        // Calculando frequências absolutas (fi)
        const fi = createFrequency(interval, dataMatrix)

        // Calculando frequências relativas (fr)
        const fr = createRelativeFrequency(fi)

        // Somando as frequências (fr) e (fi)
        let sumfr = fr.reduce((acc, current) => {
            return acc + current;
        });
        let sumfi = fi.reduce((acc, current) => {
            return acc + current;
        });

        // Calculando frequências acumuladas (Fi e Fr)
        const Fi = calculateFrequencies(fi)
        const Fr = calculateFrequencies(fr)

        // Criando a tabela de saída
        let contentTable = [interval, fi, Fi, fr, Fr]

        // função que imprime tabela no html
        createtable(k, tableGrid, contentTable, sumfr, sumfi)
    }
}

// Listener para os botões de incremento/decremento das classes
conter.addEventListener('click', (event) => {
    if (event.target.id === "idBtnDec" && rawNumclass > 0)
        rawNumclass--
    if (event.target.id === "idBtnInc")
        rawNumclass++

    numClasses.innerHTML = rawNumclass

});

// Adicionando evento ao botão de criação da tabela
btnButton.addEventListener('click', initializeTable);

// verifica se tem um valor nulo no array da tabela que o usuario digita
function asNanInTable(table) {
    let nanItem = false
    table.forEach((item) => {
        if (isNaN(item) || item === 0) {
            nanItem = true;
        }
    })
    return nanItem
}

// Função para criar intervalos de classe
function createInterval(min, k, Ai) {

    const interList = []
    let interValue = min

    for (i = 0; i < k; i++) {
        interList.push(`${interValue}-${interValue += Ai}`);
    }

    return interList
}

// Função para calcular a frequência absoluta (fi)
function createFrequency(list, table) {
    let intervals = list.map(item => item.split("-").map(Number));
    let rawfi = [];

    for (let i = 0; i < intervals.length; i++) {
        let acc = 0;
        table.forEach((element) => {

            if (i === intervals.length - 1) {

                if (element >= intervals[i][0] && element <= intervals[i][1]) {
                    acc++;
                }
            } else {

                if (element >= intervals[i][0] && element < intervals[i][1]) {
                    acc++;
                }
            }
        });
        rawfi.push(acc);
    }
    return rawfi;
}

// Função para calcular frequências acumuladas
function calculateFrequencies(frequency) {
    let resultArray = []
    frequency.reduce(function (acc, current) {
        acc += current;
        resultArray.push(acc);
        return acc
    }, 0);
    return resultArray
}

// Função para calcular frequência relativa (%)
function createRelativeFrequency(fi) {
    let sum = fi.reduce((acc, current) => {
        return acc + current;
    });
    resultArray = []
    for (let num of fi) {
        let value = num / sum * 100
        resultArray.push(value);
    }
    return resultArray
}

// Função para criar a tabela no HTML
function createtable(k, tableGrid, contentTable, sumfr, sumfi) {
    for (c = 0; c < k + 1; c++) {
        for (i = 0; i < 5; i++) {
            const newCell = document.createElement('div');

            newCell.className = 'cell';
            newCell.id = 'cell';

            newCell.style.backgroundColor = i % 2 === 0 ? 'rgb(228, 243, 255)' : 'rgb(255, 255, 255);';

            switch (true) {
                case (c === k && i === 3):
                    newCell.textContent = `${Math.round(sumfr)}%`;
                    newCell.style.backgroundColor = 'rgb(97, 158, 255)';
                    break;

                case (c === k && i === 1):
                    newCell.textContent = Math.round(sumfi);
                    newCell.style.backgroundColor = 'rgb(97, 158, 255)';
                    break;

                case (contentTable[i][c] == undefined):
                    newCell.textContent = '...';
                    newCell.style.backgroundColor = 'rgb(97, 158, 255)';
                    break;

                case (i === 3 || i === 4):
                    newCell.textContent = `${Math.round(contentTable[i][c])}%`;
                    break;

                default:
                    newCell.textContent = contentTable[i][c];
                    break;
            }

            tableGrid.appendChild(newCell);
        }
    }
}

function removeSideZeros(table){
    if(table[0] === 0) table.shift()
    if(table[table.length - 1] === 0) table.pop()
}
// Função para remover células da tabela antes de atualizar
function removeTable(tableGrid) {
    const cells = tableGrid.querySelectorAll("[id='cell']");
    cells.forEach(cell => cell.remove());
}

