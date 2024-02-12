addEventListener('load', function (){
    aparecerDados();
});

dados = {}

//contas
const multiplicador = 1.5
const conversoes = dados => dados.conversao;
const somaTotal = (a, b) => a + b;
const somarAoQuadrado = dado => dado * dado


function calcularMedia(){

    const totalConversoes = dados.campanhas.map(conversoes).reduce(somaTotal);
    mostrarConta(`Total ${select.value}`, totalConversoes)


    const media = totalConversoes / dados.campanhas.length;
    mostrarConta(`Media ${select.value}`, media)

    diferencaMedia(media);
}

function diferencaMedia(media){
    const conversaoMedia = dados.campanhas.map(tudo => tudo.conversao - media).map(somarAoQuadrado).reduce(somaTotal);
    const mediaQuadrado = conversaoMedia / dados.campanhas.length;
    const desvioPadrao = Math.sqrt(mediaQuadrado);

    mostrarConta("Diferença da Média", mediaQuadrado)
    mostrarConta("Desvio padrão", desvioPadrao)

    limitePadrao(desvioPadrao, media);
}

function limitePadrao(desvio, media){
    const superior = media + multiplicador * desvio;
    const inferior = media - multiplicador * desvio;
    mostrarConta("Superior", superior)
    mostrarConta("Inferior", inferior)
    testarCampanhas(superior, inferior)
}

function testarCampanhas(superior, inferior){
    
    dados.campanhas.map(todas => {

       if(todas.conversao > superior){
            mostrarResultado("acima", `<br>${todas.nome}, ${select.value}: ${todas.conversao}`)
            return
       }
       if(todas.conversao < inferior){
        mostrarResultado("abaixo", `<br>${todas.nome}, ${select.value}: ${todas.conversao}`)
            return
       }

    });
}




//visual
const addInput = document.getElementById("add-input")
const resultado = document.getElementById("resultado")
const logs = document.getElementById("log")
const select = document.getElementById("select")

dadosDeCampanhas = {};

function novoDado(){
    let elementos = document.querySelectorAll('.listaElementos')

    let id = `campo-${elementos.length++}` 

    li = document.createElement("li")
    li.classList.add('listaElementos');
    li.id = id
    li.innerHTML = `<input type="text" id="${elementos.length++}" placeholder="Campanha" value=""> <input type="number" placeholder="Conversão" value=""> <input type="number" placeholder="CPA" value=""> <button onclick={deletar("campo-${elementos.length++}")}>Deletar</button>`

    addInput.appendChild(li)
}


function aparecerDados(){

    const dadoSalvo = localStorage.getItem('dadosCampanhas') || undefined


    if(dadoSalvo != undefined){

        dadosDeCampanhas = JSON.parse(dadoSalvo)
        
        dadosDeCampanhas.campanhas.forEach(todas => {

            li = document.createElement("li")
            li.classList.add('listaElementos');
            li.id = `campo-${todas.dado}`
            li.innerHTML = `<input type="text" placeholder="Campanha" value="${todas.nome}"> <input type="number" placeholder="Conversão" value="${todas.conversao}"> <input type="number" placeholder="CPA" value="${todas.CPA}"> <button onclick={deletar('campo-${todas.dado}')}>Deletar</button>`
        
            addInput.appendChild(li)
        })

    }
}

function salvarDados(tipo){
    dadosDeCampanhas.campanhas = []
    dados.campanhas = []

    let elementos = document.querySelectorAll('.listaElementos')
    elementos.forEach(elemento => {
        let inputs = elemento.querySelectorAll('input');

        dadosDeCampanhas.campanhas.push({
            "dado": inputs[0].id,
            "nome": inputs[0].value,
            "conversao": Number(inputs[1].value),
            "CPA": Number(inputs[2].value),
        })

        if(tipo === "cpa"){
            dados.campanhas.push({
                "nome": inputs[0].value,
                "conversao": Number(inputs[2].value),
            })

        }else{
            dados.campanhas.push({
                "nome": inputs[0].value,
                "conversao": Number(inputs[1].value),
            })
        }
    })


    
    let json = JSON.stringify(dadosDeCampanhas)

    localStorage.setItem("dadosCampanhas", json)
}



function calcular(){
    mostrarConta("<br><br><b>Iniciando...</b>", "")
    salvarDados(select.value);
    calcularMedia();
}


function mostrarConta(etapa, dado){
    li = document.createElement('li');
    li.innerHTML = `${etapa}: <br>${dado}`

    logs.appendChild(li)
}

function mostrarResultado(qual, dados){
    const ul = document.getElementById(`${qual}`)
    li = document.createElement('li')
    li.innerHTML = `${dados}`

    ul.appendChild(li)
}



function deletar(id){
    const dell = document.getElementById(`${id}`);

    dell.remove();
    salvarDados();
    
}