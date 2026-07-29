# 🌿 EcoVision IA – Coleta Seletiva Inteligente

> **Projeto desenvolvido para a Mostra Tecnológica do CETAM**  
> Curso Técnico em Inteligência Artificial

---

## 📋 Sobre o Projeto

O **EcoVision IA** é um sistema web que utiliza **Inteligência Artificial** para identificar resíduos em tempo real através da webcam do usuário. O sistema classifica automaticamente o objeto detectado e exibe informações ambientais relevantes, como:

- 🔍 Nome do objeto
- 🏷️ Material (Plástico, Metal, Vidro, Papel, Orgânico)
- 🗑️ Lixeira correta (com cor correspondente)
- ♻️ Se é reciclável
- ⏳ Tempo de decomposição
- 💡 Curiosidade ambiental

---

## 🚀 Tecnologias Utilizadas

| Tecnologia | Descrição |
|------------|-----------|
| **HTML5** | Estrutura da aplicação |
| **CSS3** | Estilização com Glassmorphism e responsividade |
| **JavaScript (ES6+)** | Lógica da aplicação |
| **TensorFlow.js** | Framework de IA para execução no navegador |
| **COCO-SSD** | Modelo de detecção de objetos pré-treinado |

> ⚡ **Processamento 100% no navegador** — não há backend, banco de dados ou servidor necessário.

---

## 📁 Estrutura do Projeto

```
ecovision-ia/
├── index.html              # Página principal
├── css/
│   └── style.css           # Estilos globais
├── js/
│   ├── data.js             # Base de dados dos resíduos
│   ├── detector.js         # Módulo de detecção (IA + webcam)
│   └── app.js              # Módulo principal (UI, navegação, sons)
├── assets/
│   ├── icons/              # Ícones do sistema
│   ├── sounds/             # Sons de feedback (opcional)
│   └── images/
│       └── logo-cetam.png  # Logo oficial do CETAM
└── README.md               # Este arquivo
```

---

## 🎯 Objetos Suportados

### 🔴 Plástico
- Garrafa PET
- Garrafa de água
- Sacola plástica
- Copo descartável

### 🟡 Metal
- Lata de refrigerante
- Lata de alumínio

### 🟢 Vidro
- Garrafa de vidro
- Pote de vidro

### 🔵 Papel
- Jornal
- Papel
- Papelão
- Caixa de papelão

### 🟤 Orgânico
- Casca de banana
- Maçã
- Restos de comida

### ⚪ Rejeitos
- Objetos não classificados

---

## 🛠️ Como Executar Localmente

1. **Clone ou baixe** este repositório
2. **Adicione o logo do CETAM** em `assets/images/logo-cetam.png`
3. **Abra o arquivo `index.html`** em um navegador moderno
4. **Permita o acesso à câmera** quando solicitado
5. **Aponte a câmera** para um objeto e veja a detecção em tempo real!

---

## 🌐 Deploy

O projeto pode ser publicado em qualquer plataforma de hospedagem estática:

### GitHub Pages
1. Crie um repositório no GitHub
2. Envie todos os arquivos do projeto
3. Vá em **Settings → Pages**
4. Selecione a branch `main` e pasta `/ (root)`
5. Seu site estará em `https://seuusuario.github.io/ecovision-ia`

### Netlify
- Arraste a pasta do projeto para [netlify.com](https://netlify.com)

### Vercel
- Use `vercel --prod` na pasta do projeto

---

## ⚠️ Requisitos

- Navegador moderno (Chrome, Firefox, Edge, Safari)
- Conexão com internet (para carregar TensorFlow.js da CDN)
- Webcam disponível
- HTTPS obrigatório para acesso à câmera

---

## 🎨 Personalização

### Adicionar o Logo do CETAM
Substitua o arquivo `assets/images/logo-cetam.png` pelo logo oficial. O sistema já está preparado para exibi-lo automaticamente nas telas inicial, header e "Sobre o Projeto".

### Adicionar Novos Objetos
Edite o arquivo `js/data.js` e adicione novas entradas seguindo o padrão:

```javascript
"nome-da-classe-coco": {
    nome: "Nome do Objeto",
    material: "Material",
    categoria: "categoria",
    corLixeira: "#cor-hex",
    nomeLixeira: "Nome da Lixeira",
    reciclavel: true/false,
    tempoDecomposicao: "Tempo",
    curiosidade: "Texto da curiosidade"
}
```

### Editar Equipe
Altere os nomes na seção `.equipe-grid` dentro do arquivo `index.html`.

---

## 📜 Licença

Projeto acadêmico desenvolvido para fins educacionais na **Mostra Tecnológica do CETAM**.

---

<p align="center">
  <strong>EcoVision IA – Coleta Seletiva Inteligente</strong><br>
  <em>Tecnologia a serviço do meio ambiente 🌍</em>
</p>
