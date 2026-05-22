const url = 'http://localhost:3000/';
const estadias = [];
let estadiaAtual = null;
const automoveis = [];
let automovelAtual = null;

//----------------------------------------------------------//

carregarTudo();

async function carregarTudo(){
    try{

        const respostaEst = await fetch(url + 'estadia/listar');
        const dadosEst = await respostaEst.json();

        const respostaAut = await fetch(url + 'automovel/listar');
        const dadosAut = await respostaAut.json();

        estadias.length = 0;
        estadias.push(...dadosEst);

        automoveis.length = 0;
        automoveis.push(...dadosAut);

        listarCards();

    }catch(e){
        console.error(e);
        alert('Problemas com a conexão da API');
    }
}

//----------------------------------------------------------//


function listarCards(){
    const containeraut = document.querySelector('.lista-aut');
    containeraut.innerHTML = '';

    const containerest = document.querySelector('.lista-est');
    containerest.innerHTML = '';

    estadias.forEach(estadia => {

        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h2>Placa: ${estadia.placa}</h2>
            <p><b>Entrada:</b> ${estadia.entrada}</p>
            <p><b>Saída:</b> ${estadia.saida ? estadia.saida : 'Em andamento'}</p>
            <p>Total: ${estadia.valorTotal ? 'R$ ' + estadia.valorTotal : '-'}</p>
        `;
        card.onclick = () => abrirEstadia(estadia);
        containerest.appendChild(card);
    });

    automoveis.forEach(automovel => {

        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h2>Proprietário: ${automovel.proprietario}</h2>
            <p>Placa: ${automovel.placa}</p>
        `;
        card.onclick = () => abrirAutomovel(automovel);
        containeraut.appendChild(card);
    });
}


//----------------------------------------------------------//

const detalhes_est = document.querySelector('.detalhes-est')
const detalhes_aut = document.querySelector('.detalhes-aut')
function abrirEstadia(estadia){
    detalhes_est.style.display = "flex";
    estadiaAtual = estadia;
    placaEdit.value = estadia.placa;
    valorHoraEdit.value = estadia.valorHora;
}

function abrirAutomovel(automovel){
    detalhes_aut.style.display = "flex";
    automovelAtual = automovel;
    proprietarioEdit.value = automovel.proprietario;
    placaEdit2.value = automovel.placa;
    modeloEdit.value = automovel.modelo;
    tipoEdit.value = automovel.tipo;
    marcaEdit.value = automovel.marca;
    corEdit.value = automovel.cor;
    anoEdit.value = automovel.ano;
    telefoneEdit.value = automovel.telefone;
}

function fecharEstadia(){
    detalhes_est.style.display = "none"
}
function fecharAutomovel(){
    detalhes_aut.style.display = "none"
}

//----------------------------------------------------------//

function salvarEdicaoEstadia(){

    const entrada = new Date(estadiaAtual.entrada);
    const saida = new Date();

    const horas = (saida - entrada) / (1000 * 60 * 60);

    const valorTotal = horas * Number(estadiaAtual.valorHora);

    const estadiaEditada = {
        placa: estadiaAtual.placa,
        entrada: estadiaAtual.entrada,
        valorHora: estadiaAtual.valorHora,
        saida: saida.toISOString(),
        valorTotal: Number(valorTotal.toFixed(2))
    };

    console.log("ENVIANDO:", estadiaEditada);

    fetch(url + 'estadia/atualizar/' + estadiaAtual.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(estadiaEditada)
    })
    .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
    })
    .then(() => {
        alert("Estadia finalizada com sucesso.");
        detalhes_est.style.display = 'none';
        carregarTudo();
    })
    .catch(err => {
        console.error(err);
        alert("Erro ao salvar estadia");
    });
}

function salvarEdicaoAutomovel(){
    const automovelEditado = {
        proprietario: proprietarioEdit.value,
        placa: placaEdit.value,
        tipo: tipoEdit.value,
        modelo: modeloEdit.value,
        marca: marcaEdit.value,
        cor: corEdit.value,
        ano: anoEdit.value ? Number(anoEdit.value) : null,
        telefone: telefoneEdit.value
    };

    fetch(url + 'automovel/atualizar/' + automovelAtual.placa, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(automovelEditado)
    })
    .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
    })
    .then(() => {
        alert("Automóvel atualizado com sucesso.");
        carregarTudo();
    })
    .catch(() => alert("Erro ao editar automóvel"));
}


//----------------------------------------------------------//


function excluirEstadiaAtual(){
    if(!confirm("Deseja excluir essa estadia?")) return;

    fetch(url + 'estadia/excluir/' + estadiaAtual.id, {
        method: 'DELETE',
    })
    .then(() => {
        alert("Estadia excluída com sucesso.");
        carregarTudo();
    })
    .catch(() => alert("Erro ao excluir estadia."));
}

function excluirAutomovelAtual(){
    if(!confirm("Deseja excluir esse automóvel?")) return;

    fetch(url + 'automovel/excluir/' + automovelAtual.placa, {
        method: 'DELETE',
    })
    .then(() => {
        alert("Automóvel excluído com sucesso.");
        carregarTudo();
    })
    .catch(() => alert("Erro ao excluir automóvel."));
}