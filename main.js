
let numClasses = document.getElementById('idNumClass')
let conter = document.getElementById('conter')
let btnButton = document.getElementById('btnButton')
let tableGrid = document.getElementById('tableGrid')

let rawNumclass = 0

function initializeTable() {
    let table = document.getElementById('idDataTable').value

    let rawDataMatrix = table.split(/[\s,]+/).map(Number);

    if (asNanInTable(rawDataMatrix) || rawDataMatrix == 0) {
        window.alert('Digite uma tabela válida para a execução do programa.')
        
    } else {

        removeTable(tableGrid)
        
        //transformando a trabela em formato crescente
        const dataMatrix = rawDataMatrix.sort()

        // tamanho da tabela
        let N = rawDataMatrix.length

        // formula de Sturges para obter o K(classe)
        let sturgesfomule = 1 + 3.3 * Math.log10(N)

        //obtendo o valor minimo da tabela
        const min = Math.min(...dataMatrix)

        //obtendo o valor maximo da tabela
        const max = Math.max(...dataMatrix)

        let k = getClass(rawNumclass, sturgesfomule)

        // obtendo a amplitude total subistraindo o valor maximo pelo menor valor
        let At = max - min

        // tamanho da classe dividindo amplitude total pelo numero de classes
        let rawAi = At / k

        // arredondando o valor para cima não importa o valor quebrado
        let Ai = Math.ceil(rawAi)

        const interval = createInterval(min, k, Ai)

        const fi = createFrequency(interval, dataMatrix)

        const fr = createRelativeFrequency(fi)

        let sumFi = fr.reduce((acc, current) => {
            return acc + current;
        });

        let sumfi = fi.reduce((acc, current) => {
            return acc + current;
        });



        const Fi = calculateFrequencies(fi)

        const Fr = calculateFrequencies(fr)
        let contentTable = [interval, fi, Fi, fr, Fr]

        createtable(k, tableGrid, contentTable, sumFi, sumfi)


        console.log(k+" --CLASSES--")
        console.log(interval+" --intervals--")
        console.log(fi+" --fi--")
        console.log(Fi+" --Fi--")
        console.log(fr+" --fr--")
        console.log(Fr+" --Fr--")
        console.log(sumFi+" --sumFi--")
        console.log(sumfi+" --sumfi--")
        console.log(contentTable)
        console.log(rawDataMatrix)

    }


}


conter.addEventListener('click', (event) => {
    if (event.target.id === "idBtnDec" && rawNumclass > 0)
        rawNumclass--
    else if (event.target.id === "idBtnInc")
        rawNumclass++
    numClasses.innerHTML = rawNumclass

});

function clickCreateButton() {
    btnButton.addEventListener('click', () => {
        
        initializeTable()
        
    });
}
clickCreateButton()

function asNanInTable(table) {
    let nanItem = false
    table.forEach((item) => {
        if (isNaN(item)) {
            nanItem = true;
        }
    })
    return nanItem
}

function getClass(rawNumclass, sturgesfomule) {

    if (rawNumclass == 0) {

        num = Math.round(sturgesfomule)
    } else {
        num = rawNumclass

    }
    return num
}

function createInterval(min, k, Ai) {

    const interList = []
    let interValue = min

    for (i = 0; i < k; i++) {
        interList.push(`${interValue}-${interValue += Ai}`);
    }

    return interList
}



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

function calculateFrequencies(frequency) {
    let resultArray = []
    frequency.reduce(function (acc, current) {
        acc += current;
        resultArray.push(acc);
        return acc
    }, 0);
    return resultArray
}

function createRelativeFrequency(fi) {
    let sum = fi.reduce((acc, current) => {
        return acc + current;
    });
    resultArray = []
    for (let num of fi) {
        let value = (num / sum) * 100
        resultArray.push(Math.round(value));

    }
    return resultArray
}


function createtable(k, tableGrid, contentTable, sumFi, sumfi) {
    for (c = 0; c < k + 1; c++) {
        for (i = 0; i < 5; i++) {
            const newCell = document.createElement('div');

            newCell.className = 'cell';
            newCell.id = 'cell';
            newCell.style.backgroundColor = i % 2 === 0 ? 'rgb(228, 243, 255)' : 'rgb(255, 255, 255);';


            switch (true) {
                case (c === k && i === 3):
                    newCell.textContent = `${sumFi}%`;
                    newCell.style.backgroundColor = 'rgb(97, 158, 255)';
                    break;
                case (c === k && i === 1):
                    newCell.textContent = sumfi;
                    newCell.style.backgroundColor = 'rgb(97, 158, 255)';
                    break;
                    
                case (contentTable[i][c] == undefined):
                    newCell.textContent = '...';
                    newCell.style.backgroundColor = 'rgb(97, 158, 255)';
                    break;

                case (i === 3 || i === 4):
                    newCell.textContent = `${contentTable[i][c]}%`;
                    break;


                default:
                    newCell.textContent = contentTable[i][c];
                    break;
            }

            tableGrid.appendChild(newCell);
        }
    }
}
function removeTable(tableGrid) {
    const cells = tableGrid.querySelectorAll("[id='cell']");
    cells.forEach(cell => cell.remove());
}

