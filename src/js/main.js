const SB_URL = "https://mcahoawxselcrbfjhivd.supabase.co";
const SB_KEY = "sb_publishable_ihiNA8eqGLo0ouIeHMXEpQ_fjgQbhSP";

// Navegação entre seções
function navegar(id) {
    document.querySelectorAll('.section-page').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    
    document.getElementById(id).classList.add('active');
    event.currentTarget.classList.add('active');

    if(id === 'maquinas') carregarMaquinas();
}

// Buscar Máquinas do Supabase
async function carregarMaquinas() {
    const res = await fetch(`${URL_SB}/rest/v1/maquinario?select=*`, {
        headers: { "apikey": KEY_SB, "Authorization": `Bearer ${KEY_SB}` }
    });
    const dados = await res.json();
    const tbody = document.getElementById('table-body-maquinas');
    tbody.innerHTML = dados.map(m => `
        <tr>
            <td>${m.nome_maquina}</td>
            <td>${m.tipo}</td>
            <td>${m.horimetro_atual} h</td>
            <td>${m.proxima_manutencao || 'N/A'}</td>
        </tr>
    `).join('');
    document.getElementById('dash-maquinas').innerText = dados.length;
}

// Salvar Nova Máquina
async function salvarMaquina() {
    const dados = {
        nome_maquina: document.getElementById('m_nome').value,
        tipo: document.getElementById('m_tipo').value,
        horimetro_atual: document.getElementById('m_horimetro').value
    };

    const res = await fetch(`${URL_SB}/rest/v1/maquinario`, {
        method: "POST",
        headers: { 
            "apikey": KEY_SB, 
            "Authorization": `Bearer ${KEY_SB}`,
            "Content-Type": "application/json",
            "Prefer": "return=minimal"
        },
        body: JSON.stringify(dados)
    });

    if(res.ok) {
        alert("Máquina salva com sucesso!");
        bootstrap.Modal.getInstance(document.getElementById('modalMaquina')).hide();
        carregarMaquinas();
    }
}

// Carregar Dashboard ao iniciar
window.onload = () => carregarMaquinas();
