const SB_URL = "https://mcahoawxselcrbfjhivd.supabase.co";
const SB_KEY = "sb_publishable_ihiNA8eqGLo0ouIeHMXEpQ_fjgQbhSP";

// Função para buscar dados do Supabase (Substitui o Apps Script)
async function buscarDados(tabela) {
    const response = await fetch(`${SB_URL}/rest/v1/${tabela}?select=*`, {
        headers: {
            "apikey": SB_KEY,
            "Authorization": `Bearer ${SB_KEY}`
        }
    });
    const dados = await response.json();
    return dados;
}

// Função para renderizar no Dashboard
async function inicializarDashboard() {
    const operacoes = await buscarDados('operacoes_campo');
    const tbody = document.getElementById('tabela-operacoes');
    
    if (operacoes.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center">Nenhuma operação registrada.</td></tr>';
        return;
    }

    tbody.innerHTML = operacoes.map(item => `
        <tr>
            <td>${new Date(item.data_operacao).toLocaleDateString()}</td>
            <td>Talhão ${item.talhao_id.slice(0,5)}...</td>
            <td>Operação</td>
            <td>${item.quantidade_insumo_usada} un.</td>
            <td><span class="badge bg-success">Ativo</span></td>
        </tr>
    `).join('');
}

window.onload = inicializarDashboard;
