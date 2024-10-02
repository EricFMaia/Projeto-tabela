
let rawDataMatrix = [12, 12, 15, 15, 16, 18, 20, 22,
    25, 27, 27, 29, 32, 32, 34, 38,
    40, 42, 42, 45, 48, 50, 50, 52];

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




