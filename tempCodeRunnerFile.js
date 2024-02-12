data = {
    "campanhas": [
      {
        "nome": "Campanha de Verão",
        "valor_gasto": 500.25,
        "conversao": 6
      },
      {
        "nome": "Campanha de Inverno",
        "valor_gasto": 750.80,
        "conversao": 45
      },
      {
        "nome": "Campanha de Primavera",
        "valor_gasto": 300.50,
        "conversao": 15
      },
      {
        "nome": "Campanha de Outono",
        "valor_gasto": 400.30,
        "conversao": 19
      }
    ]
  }

const conversoes = dados => dados.conversao
const somaTotal = (a, b) => a + b


function calcularMedia(){
    const totalConversoes = data.campanhas.map(conversoes).reduce(somaTotal);
    
    // media = totalConversoes / data.campanhas.length;

    console.log(data.campanhas.length);
}



calcularMedia();