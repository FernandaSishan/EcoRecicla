/**
 * ============================================================
 * EcoVision IA – Coleta Seletiva Inteligente
 * js/app.js
 * 
 * Módulo Principal (App): controla navegação, interface do
 * usuário, sons e integração entre os módulos data.js e
 * detector.js.
 * ============================================================
 */

// Contexto de áudio para sons de feedback
let audioCtx = null;

// ============================================================
// INICIALIZAÇÃO
// ============================================================

/**
 * Cria partículas animadas na tela inicial.
 */
function criarParticulas() {
    const container = document.getElementById('particles');
    if (!container) return;

    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDelay = Math.random() * 15 + 's';
        p.style.animationDuration = (10 + Math.random() * 10) + 's';
        container.appendChild(p);
    }
}

// Executa ao carregar a página
criarParticulas();

// ============================================================
// NAVEGAÇÃO ENTRE TELAS
// ============================================================

/**
 * Alterna entre a tela de detecção e a tela "Sobre o Projeto".
 * @param {string} tela - 'principal' ou 'sobre'
 */
function mostrarTela(tela) {
    // Atualiza links ativos no menu
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    if (event && event.target) {
        event.target.classList.add('active');
    }

    // Esconde ambas as telas
    document.getElementById('tela-principal').classList.remove('active');
    document.getElementById('tela-sobre').classList.remove('active');

    // Mostra a tela selecionada
    if (tela === 'principal') {
        document.getElementById('tela-principal').classList.add('active');
    } else {
        document.getElementById('tela-sobre').classList.add('active');
    }
}

// ============================================================
// INICIAR SISTEMA
// ============================================================

/**
 * Transiciona da tela inicial para o sistema principal
 * e inicia o detector de objetos.
 */
async function iniciarSistema() {
    // Inicializa o contexto de áudio (necessário após interação do usuário)
    initAudio();

    // Animação de saída da tela inicial
    document.getElementById('tela-inicial').classList.add('hidden');

    // Mostra header, main e footer
    document.getElementById('main-header').style.display = 'flex';
    document.getElementById('main-content').style.display = 'block';
    document.getElementById('main-footer').style.display = 'block';

    // Inicializa o detector (modelo IA + webcam)
    await inicializarDetector();
}

// ============================================================
// SISTEMA DE SONS
// ============================================================

/**
 * Inicializa o AudioContext (obrigatório após gesto do usuário).
 */
function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

/**
 * Emite som de sucesso (arpejo ascendente) quando um objeto
 * é detectado com confiança.
 */
function playSuccessSound() {
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    // Arpejo: Dó (523Hz) → Mi (659Hz) → Sol (784Hz)
    osc.frequency.setValueAtTime(523, audioCtx.currentTime);
    osc.frequency.setValueAtTime(659, audioCtx.currentTime + 0.1);
    osc.frequency.setValueAtTime(784, audioCtx.currentTime + 0.2);

    // Envelope de volume
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);

    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 0.4);
}

/**
 * Emite som discreto de "idle" quando nenhum objeto é detectado.
 */
function playIdleSound() {
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.frequency.setValueAtTime(200, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 0.1);
}

// ============================================================
// ATUALIZAÇÃO DO PAINEL LATERAL
// ============================================================

/**
 * Atualiza o painel lateral com as informações do objeto detectado.
 * @param {Object} dados - Objeto com dados do resíduo (de data.js)
 * @param {number} score - Score de confiança (0 a 1)
 */
function atualizarPainel(dados, score) {
    // Nome do objeto
    document.getElementById('objeto-detectado').textContent = dados.nome;

    // Barra de confiança
    document.getElementById('confidence-fill').style.width = (score * 100) + '%';
    document.getElementById('confidence-text').textContent = (score * 100).toFixed(0) + '% confiança';

    // Material
    document.getElementById('material-tipo').textContent = dados.material;

    // Lixeira correta (cor + nome)
    const lixeiraCor = document.querySelector('#lixeira-indicator .lixeira-cor');
    lixeiraCor.style.background = dados.corLixeira;
    lixeiraCor.style.color = dados.corLixeira;
    document.getElementById('lixeira-nome').textContent = dados.nomeLixeira;

    // Badge reciclável
    const badge = document.getElementById('reciclavel-badge');
    if (dados.reciclavel) {
        badge.className = 'reciclavel-badge reciclavel-sim';
        badge.innerHTML = '✅ Sim, recicle!';
    } else {
        badge.className = 'reciclavel-badge reciclavel-nao';
        badge.innerHTML = '❌ Não reciclável';
    }

    // Tempo de decomposição
    document.getElementById('tempo-decomposicao').textContent = dados.tempoDecomposicao;

    // Curiosidade ambiental
    document.getElementById('curiosidade-texto').textContent = dados.curiosidade;
}

/**
 * Reseta o painel lateral para o estado inicial (sem detecção).
 */
function resetPainel() {
    document.getElementById('objeto-detectado').textContent = 'Aguardando...';
    document.getElementById('confidence-fill').style.width = '0%';
    document.getElementById('confidence-text').textContent = '0% confiança';
    document.getElementById('material-tipo').textContent = '—';

    const lixeiraCor = document.querySelector('#lixeira-indicator .lixeira-cor');
    lixeiraCor.style.background = 'rgba(255, 255, 255, 0.2)';
    document.getElementById('lixeira-nome').textContent = '—';

    document.getElementById('reciclavel-badge').className = 'reciclavel-badge reciclavel-nao';
    document.getElementById('reciclavel-badge').innerHTML = '❓ Aguardando detecção';

    document.getElementById('tempo-decomposicao').textContent = '—';
    document.getElementById('curiosidade-texto').textContent =
        'Aponte a câmera para um objeto para descobrir informações sobre seu impacto ambiental.';
}
