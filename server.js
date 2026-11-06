// Servidor opcional (Node + MySQL). O site publicado no GitHub Pages usa o login do navegador.
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname)); // serve as páginas do portfólio

// Defina as variáveis de ambiente em produção; os valores abaixo são só para uso local.
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '12345',
    database: process.env.DB_NAME || 'meu_sistema',
    waitForConnections: true,
    connectionLimit: 10
});

pool.query('SELECT 1')
    .then(() => console.log('✅ Banco conectado com sucesso!'))
    .catch(erro => console.log('❌ Erro ao conectar ao banco:', erro.message));

app.post('/login', async (req, res) => {
    const { email, senha } = req.body || {};
    if (!email || !senha) {
        return res.status(400).json({ sucesso: false, mensagem: 'Informe e-mail e senha.' });
    }
    try {
        const [usuarios] = await pool.execute('SELECT * FROM usuarios WHERE email = ?', [email.trim().toLowerCase()]);
        if (usuarios.length === 0) {
            return res.status(401).json({ sucesso: false, mensagem: 'Usuário não encontrado!' });
        }
        const guardada = usuarios[0].senha;
        // aceita senha com hash bcrypt (recomendado) ou texto puro (formato antigo do SQL)
        const ok = guardada.startsWith('$2') ? await bcrypt.compare(senha, guardada) : senha === guardada;
        if (!ok) return res.status(401).json({ sucesso: false, mensagem: 'Senha incorreta!' });
        return res.json({ sucesso: true, mensagem: 'Login realizado com sucesso!' });
    } catch (erro) {
        console.log('❌ Erro:', erro);
        return res.status(500).json({ sucesso: false, mensagem: 'Erro ao conectar com o servidor.' });
    }
});

const PORTA = process.env.PORT || 3000;
app.listen(PORTA, () => console.log(`🚀 Servidor Node rodando na porta ${PORTA}`));
