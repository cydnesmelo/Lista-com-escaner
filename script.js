let listaProdutos = [];
let valorTotal = 0;

// Função para atualizar a lista na tela
function atualizarLista() {
    const tbody = document.getElementById('listaProdutos');
    tbody.innerHTML = '';
    listaProdutos.forEach((produto, index) => {
        const tr = document.createElement('tr');

        const tdProduto = document.createElement('td');
        tdProduto.textContent = produto.nome;
        tr.appendChild(tdProduto);

        const tdQuantidade = document.createElement('td');
        tdQuantidade.textContent = produto.quantidade;
        tr.appendChild(tdQuantidade);

        const tdValorUnitario = document.createElement('td');
        tdValorUnitario.textContent = `R$ ${produto.valorUnitario.toFixed(2)}`;
        tr.appendChild(tdValorUnitario);

        const tdValorTotal = document.createElement('td');
        tdValorTotal.textContent = `R$ ${produto.valorTotal.toFixed(2)}`;
        tr.appendChild(tdValorTotal);

        const tdAcoes = document.createElement('td');
        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.onclick = () => editarProduto(index);
        tdAcoes.appendChild(btnEditar);

        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.onclick = () => excluirProduto(index);
        tdAcoes.appendChild(btnExcluir);

        tr.appendChild(tdAcoes);

        tbody.appendChild(tr);
    });

    document.getElementById('valorTotal').textContent = valorTotal.toFixed(2);
}

// Função para adicionar um produto à lista
function adicionarProduto() {
    const produto = document.getElementById('produto').value;
    const quantidade = parseFloat(document.getElementById('quantidade').value);
    const valorUnitario = parseFloat(document.getElementById('valorUnitario').value);

    if (produto && !isNaN(quantidade) && !isNaN(valorUnitario)) {
        const valorTotalProduto = quantidade * valorUnitario;
        listaProdutos.push({
            nome: produto,
            quantidade: quantidade,
            valorUnitario: valorUnitario,
            valorTotal: valorTotalProduto
        });
        valorTotal += valorTotalProduto;
        atualizarLista();
        limparFormulario();
    }
}

// Função para editar um produto
function editarProduto(index) {
    const produto = listaProdutos[index];
    document.getElementById('produto').value = produto.nome;
    document.getElementById('quantidade').value = produto.quantidade;
    document.getElementById('valorUnitario').value = produto.valorUnitario;

    excluirProduto(index);
}

// Função para excluir um produto
function excluirProduto(index) {
    valorTotal -= listaProdutos[index].valorTotal;
    listaProdutos.splice(index, 1);
    atualizarLista();
}

// Função para limpar o formulário
function limparFormulario() {
    document.getElementById('produto').value = '';
    document.getElementById('quantidade').value = '';
    document.getElementById('valorUnitario').value = '';
}

// Função para iniciar a leitura de código de barras
function iniciarLeituraCodigoBarras() {
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('#scanBarcode')
        },
        decoder: {
            readers: ["ean_reader"]
        }
    }, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        Quagga.start();
    });

    Quagga.onDetected(function (data) {
        let code = data.codeResult.code;
        buscarProdutoPorCodigoBarras(code);
        Quagga.stop();
    });
}

// Função para buscar o produto pelo código de barras (simulada)
function buscarProdutoPorCodigoBarras(codigo) {
    // Simulação de busca (poderia ser uma requisição a um servidor)
    const produtosMock = {
        '1234567890123': 'Arroz',
        '9876543210987': 'Feijão'
    };

    if (produtosMock[codigo]) {
        document.getElementById('produto').value = produtosMock[codigo];
    } else {
        alert('Produto não encontrado');
    }
}

// Função para exportar a lista para Excel
function exportarParaExcel() {
    const ws = XLSX.utils.json_to_sheet(listaProdutos);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Lista de Mercado");
    XLSX.writeFile(wb, "lista_mercado.xlsx");
}

// Eventos
document.getElementById('adicionar').addEventListener('click', adicionarProduto);
document.getElementById
