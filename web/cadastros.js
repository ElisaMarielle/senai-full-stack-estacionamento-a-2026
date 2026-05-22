const url = 'http://localhost:3000/';


//----------------------------------------------------------//

const formEst = document.querySelector('#form-est');
if(formEst){
    formEst.addEventListener('submit', function(e){
    e.preventDefault();
    const novaEst = {
        placa: placa.value,
        valorHora: valorHora.value ? Number(valorHora.value) : null
    };
    

    fetch(url + 'estadia/cadastrar', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(novaEst)
    })
    .then(() => {
        alert("Estadia adicionada com sucesso.");
    })
    .catch(() => alert("Erro ao salvar estadia"));
    })
}


const formAut = document.querySelector('#form-aut');
if(formAut){
    formAut.addEventListener('submit', function(e){
    e.preventDefault();
    const novoAut = {
        proprietario: proprietario.value,
        placa: placa2.value,
        tipo: tipo.value,
        modelo: modelo.value,
        marca: marca.value,
        cor: cor.value,
        ano: ano.value ? Number(ano.value) : null,
        telefone: telefone.value,
    };
    

    fetch(url + 'automovel/cadastrar', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(novoAut)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Erro na API');
        }
    })
    .then(() => {
        alert("Automóvel adicionado com sucesso.");
    })
    .catch(() => alert("Erro ao salvar automóvel"));
    })
}
