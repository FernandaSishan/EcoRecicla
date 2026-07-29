/**
 * ============================================================
 * EcoVision IA – Coleta Seletiva Inteligente
 * js/detector.js
 * 
 * Módulo de Detecção: carrega o modelo COCO-SSD (TensorFlow.js)
 * e executa o loop de detecção de objetos em tempo real.
 * ============================================================
 */

// Variáveis globais do módulo
let modelo = null;
let webcam = null;
let canvas = null;
let ctx = null;
let isDetecting = false;
let animationId = null;
let detectionCount = 0;

/**
 * Inicializa o modelo de IA (COCO-SSD) e a webcam do usuário.
 * Exibe overlay de loading durante o processo.
 */
async function inicializarDetector() {
    const loading = document.getElementById('loading-overlay');
    loading.classList.remove('hidden');

    try {
        // 1. Carrega o modelo COCO-SSD lite (versão otimizada para navegador)
        atualizarLoading('Carregando modelo de IA...');
        modelo = await cocoSsd.load({ base: 'lite_mobilenet_v2' });

        // 2. Inicia a webcam
        atualizarLoading('Iniciando câmera...');
        webcam = document.getElementById('webcam');
        canvas = document.getElementById('canvas-overlay');
        ctx = canvas.getContext('2d');

        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'environment',
                width: { ideal: 640 },
                height: { ideal: 480 }
            }
        });
        webcam.srcObject = stream;

        // Aguarda o vídeo estar pronto
        await new Promise((resolve) => {
            webcam.onloadedmetadata = () => {
                webcam.play();
                resolve();
            };
        });

        // Ajusta dimensões do canvas para coincidir com o vídeo
        canvas.width = webcam.videoWidth;
        canvas.height = webcam.videoHeight;

        // Esconde loading
        loading.classList.add('hidden');

        // Atualiza status visual
        document.getElementById('status-dot').classList.add('active');
        document.getElementById('status-text').textContent = 'Câmera ativa • Detectando...';

        // Inicia o loop de detecção
        isDetecting = true;
        detectarLoop();

    } catch (err) {
        console.error('Erro na inicialização do detector:', err);
        atualizarLoading('Erro: ' + err.message);
        setTimeout(() => loading.classList.add('hidden'), 4000);
    }
}

/**
 * Atualiza o texto do loading overlay.
 */
function atualizarLoading(texto) {
    document.getElementById('loading-text').textContent = texto;
}

/**
 * Loop principal de detecção.
 * Executa a cada frame via requestAnimationFrame.
 */
async function detectarLoop() {
    if (!isDetecting) return;

    // Limpa o canvas do frame anterior
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    try {
        // Executa a detecção no frame atual da webcam
        const predictions = await modelo.detect(webcam);

        if (predictions.length > 0) {
            // Seleciona a detecção com maior confiança
            const best = predictions.reduce((a, b) => a.score > b.score ? a : b);

            if (best.score > 0.5) {
                const classe = best.class.toLowerCase();
                const mapeado = mapeamentoCoco[classe] || null;
                const dados = mapeado ? dadosResiduos[mapeado] : dadosResiduos["default"];

                // Desenha caixa e rótulo no canvas
                desenharCaixaDeteccao(best, dados);

                // Atualiza o painel lateral com as informações
                atualizarPainel(dados, best.score);

                // Emite som de sucesso a cada ~1 segundo (30 frames)
                detectionCount++;
                if (detectionCount % 30 === 0) {
                    playSuccessSound();
                }
            } else {
                // Confiança baixa demais — reseta painel
                resetPainel();
            }
        } else {
            // Nenhum objeto detectado
            resetPainel();
            if (detectionCount % 60 === 0) {
                playIdleSound();
            }
            detectionCount++;
        }
    } catch (e) {
        console.error('Erro durante a detecção:', e);
    }

    // Agenda próximo frame
    animationId = requestAnimationFrame(detectarLoop);
}

/**
 * Desenha a caixa delimitadora e o rótulo no canvas overlay.
 * @param {Object} prediction - Objeto de predição do COCO-SSD
 * @param {Object} dados - Dados do resíduo mapeado
 */
function desenharCaixaDeteccao(prediction, dados) {
    const [x, y, width, height] = prediction.bbox;
    const cor = dados.corLixeira;

    // Caixa delimitadora colorida
    ctx.strokeStyle = cor;
    ctx.lineWidth = 3;
    ctx.strokeRect(x, y, width, height);

    // Fundo do rótulo
    ctx.fillStyle = cor;
    ctx.fillRect(x, y - 28, width, 28);

    // Texto do rótulo
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px Inter, sans-serif';
    ctx.fillText(
        `${dados.nome} (${(prediction.score * 100).toFixed(0)}%)`,
        x + 5,
        y - 8
    );
}

/**
 * Para a detecção e libera recursos da webcam.
 */
function pararDetector() {
    isDetecting = false;
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
    if (webcam && webcam.srcObject) {
        webcam.srcObject.getTracks().forEach(track => track.stop());
    }
}

// Limpa recursos ao fechar ou recarregar a página
window.addEventListener('beforeunload', pararDetector);
