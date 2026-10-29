# Clínica Odontológica API – Sistema de Agendamento de Consultas

## Situação-problema
A clínica marca consultas por telefone, WhatsApp e agenda de papel. Isso gera conflitos de horário (dois pacientes com o mesmo dentista na mesma hora), faltas por falta de controle e nenhuma proteção sobre quem consulta os dados dos pacientes, que são dados pessoais sensíveis.

## Solução proposta
API REST em Node.js/Express em que o paciente se cadastra (senha criptografada), faz login (JWT) e gerencia suas consultas por rotas protegidas. O sistema impede horários duplicados para o mesmo dentista, respeita o horário de atendimento, valida e sanitiza toda entrada e persiste os dados em MySQL.

## Requisitos atendidos

| Requisito | Onde está |
|---|---|
| Model Sequelize + MySQL | `models/User.js`, `models/Appointment.js`, `models/index.js` |
| Middleware JWT `verifyToken` | `middlewares/verifyToken.js` (usado em todas as rotas de `/consultas`) |
| express-validator | `validators/` + `middlewares/validate.js` |
| bcrypt | `controllers/authController.js` (`hash` no cadastro, `compare` no login) |

## Tecnologias
Node.js, Express, Sequelize, MySQL, jsonwebtoken, bcrypt, express-validator, dotenv.

## Como rodar

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Crie o banco no MySQL:
   ```sql
   CREATE DATABASE clinica_odonto;
   ```
3. Copie `.env.example` para `.env` e preencha com seus dados (usuário/senha do MySQL e um `JWT_SECRET`).
4. Inicie o servidor:
   ```bash
   npm run dev
   ```
   As tabelas são criadas automaticamente pelo Sequelize.

## Endpoints

| Método | Rota | Proteção | Descrição |
|---|---|---|---|
| POST | `/auth/register` | pública | Cadastra paciente (senha vira hash) |
| POST | `/auth/login` | pública | Retorna token JWT (válido por 1h) |
| POST | `/consultas` | JWT | Agenda consulta para o paciente logado |
| GET | `/consultas` | JWT | Lista só as consultas do paciente logado |
| PATCH | `/consultas/:id/cancelar` | JWT | Cancela uma consulta do próprio paciente |

Envie o token no header: `Authorization: Bearer <token>`

Exemplos prontos de requisição em `requests.http`.

## Regras de negócio
- Atendimento de segunda a sexta, das 8h às 18h.
- A data da consulta deve ser futura.
- O mesmo dentista não pode ter duas consultas agendadas no mesmo horário (erro 409).
- Procedimentos aceitos: avaliação, limpeza, restauração, extração, canal e clareamento.

## Decisões de segurança
- Senhas guardadas com **bcrypt** (10 salt rounds); nunca em texto puro.
- Login retorna a mesma mensagem para e-mail ou senha errados, para não revelar quais e-mails existem.
- O `userId` da consulta vem do **token**, não do corpo da requisição, então um paciente não agenda em nome de outro.
- Ao cancelar, a busca filtra por `id` **e** `userId`: um paciente não consegue cancelar a consulta de outro.
- Campos de texto são sanitizados com `trim()` e `escape()` para reduzir risco de injeção de HTML/script.
- `JWT_SECRET` e credenciais do banco ficam no `.env`, que não vai para o Git.


