
let numClasses = document.getElementById('idNumClass')
let conter = document.getElementById('conter')

function clickConter() {
    let num = 0
    conter.addEventListener('click', (event) => {
        if (event.target.id === "idBtnDec" && num > 0)
            num--
        else if (event.target.id === "idBtnInc")
            num++
        numClasses.innerHTML = num
    })
}
clickConter()

let rawDataMatrix = [
    67, 67, 67, 68, 68,
    68, 68, 72, 73, 74,
    74, 74, 75, 77, 77,
    78, 78, 80, 85, 85
];

//transformando a trabela em formato crescente
const dataMatrix = rawDataMatrix.sort()

// tamanho da tabela
let N = rawDataMatrix.length

// formula de Sturges para obter o K(classe)
let sturgesfomule = 1 + 3.3 * Math.log10(N)

//Arredondando o valor do calculo da formula de Sturges 
let k = Math.round(sturgesfomule)

//obtendo o valor minimo da tabela
const min = Math.min(...dataMatrix)

//obtendo o valor maximo da tabela
const max = Math.max(...dataMatrix)

// obtendo a amplitude total subistraindo o valor maximo pelo menor valor
let At = max - min

// tamanho da classe dividindo amplitude total pelo numero de classes
let rawAi = At / k

// arredondando o valor para cima não importa o valor quebrado
let Ai = Math.ceil(rawAi)

// criador de intervalos
function createInterval(){

    const interList = []
    let interValue = min

    for (i = 0; i < k; i++) {
        interList.push(`${interValue}-${interValue += Ai}`);
    }

    return interList
}

const interval = createInterval()

function createFrequency(list, table) {
    let intervals = list.map(item => item.split("-"));
    let rawfi = [];

    for( i = 0 ; i < intervals.length ; i++){
        let acc = 0
        table.forEach((element) => {
            if(element >= intervals[i][0] && element < intervals[i][1]){
                acc++
            }
        })
        rawfi.push(acc)
    }
    return rawfi
} 
const fi = createFrequency(interval, dataMatrix) 

function calculateFrequencies(frequency){
    let resultArray = []
    frequency.reduce(function(acc, current){
        acc += current; 
        resultArray.push(acc);
        return acc 
    }, 0);
    return resultArray
}

const Fi = calculateFrequencies(fi)

function createRelativeFrequency(fi){
    let sum = fi.reduce((acc, current) => {
        return acc + current;
    });
    resultArray = []
    for (let num of fi) {
       let value = (num/sum) * 100
       resultArray.push(Math.round(value));
       
    }
    return resultArray
}
const fr = createRelativeFrequency(fi)
let sum = fr.reduce((acc, current) => {
    return acc + current;
});

const Fr = calculateFrequencies(fr)
console.log(dataMatrix+" --dataMatrix--")
console.log(interval+" --intervals--")
console.log(fi+" --fi--")
console.log(Fi+" --Fi--")
console.log(fr+" --fr--")
console.log(Fr+" --Fr--")
console.log(sum+" --sum--")

