# Todo App — Entrega Dev

## Estrutura

```
api/
  index.js        # servidor Express
  package.json    # dependências

frontend/
  index.html      # app HTML/JS (sem framework)
  nginx.conf      # config nginx
  entrypoint.sh   # injeta API_URL em runtime
```

---

## API

### Stack
- **Runtime**: Node.js
- **Framework**: Express 4
- **Driver DB**: pg (node-postgres)
- **Extras**: cors

### Dependências (package.json)
```json
"express": "^4.18.2"
"pg": "^8.11.3"
"cors": "^2.8.5"
```

### Variáveis de ambiente (obrigatórias)
| Variável      | Descrição                        |
|---------------|----------------------------------|
| DB_HOST       | Host do postgres                 |
| DB_PORT       | Porta do postgres (default 5432) |
| DB_USER       | Usuário do postgres              |
| DB_PASSWORD   | Senha do postgres                |
| DB_NAME       | Nome do banco                    |
| PORT          | Porta da API (default 3000)      |

### Endpoints
| Método | Rota         | Descrição           |
|--------|--------------|---------------------|
| GET    | /todos       | Lista todas tarefas |
| POST   | /todos       | Cria nova tarefa    |
| PATCH  | /todos/:id   | Atualiza done       |
| DELETE | /todos/:id   | Remove tarefa       |

---

## Frontend

### Stack
- HTML/CSS/JS puro
- Servido via **nginx**
- Sem framework, sem build step

### Variáveis de ambiente
| Variável | Descrição                              |
|----------|----------------------------------------|
| API_URL  | URL completa da API (ex: http://api-service:3000) |

O `entrypoint.sh` injeta `API_URL` no HTML antes do nginx subir.

---

## Schema esperado no Postgres

```sql
CREATE TABLE todos (
  id    SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  done  BOOLEAN DEFAULT FALSE
);
```
