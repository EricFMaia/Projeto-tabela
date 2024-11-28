
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
    50, 58, 66, 72, 87,
    50, 59, 66, 73, 88,
    50, 59, 66, 75, 90,
    51, 59, 67, 79, 91,
    51, 61, 67, 82, 92,
    52, 63, 67, 83, 94,
    52, 64, 68, 84, 94,
    55, 64, 71, 84, 95,
    56, 65, 72, 85, 97,
    58, 65, 72, 85, 97
];

//transformando a trabela em formato crescente
const dataMatrix = rawDataMatrix.sort()

// tamanho da tabela
let N = rawDataMatrix.length

// formula de Sturges para obter o K(classe)
let sturgesfomule = 1 + 3.3 * Math.log10(N)

//Arredondando o valor do calculo da formula de Sturges 
let k = 5 //Math.round(sturgesfomule)

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
    let Frequency = []
    for(i=0 ;i < intervals.length; i++){
        let acc = 0
        table.forEach((element) => {  
            if(element > intervals[i][0] && element < intervals[i][1]){
                acc++
            }
        });  
        Frequency.push(acc)       
    }
      
    return Frequency
} 

const fi = createFrequency(interval, dataMatrix) 

function createAccumulatedFrequency(frequency){
    const FiArray = []
    frequency.reduce(function(acc, current){
        FiArray.push(acc);
        acc += current; 
        return acc 
    });
    return FiArray
}

const Fi = createAccumulatedFrequency(fi)

/*
console.log(interval+" --intervals--")
console.log(fi+" --fi--")
console.log(Fi+" --Fi--")
*/