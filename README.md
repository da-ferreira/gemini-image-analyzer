# Serviço de IA para obter a medição de água ou gás através da foto de um medidor.

## Provedores de IA suportados

- **Gemini** (padrão) - Google Generative AI
- **OpenAI** - GPT-4o com visão

## Como rodar

- Duplique o arquivo `.env.example` e renomeie-o para `.env`
- Configure o provedor de IA desejado no `.env`:
  - Para usar o **Gemini** (padrão): insira sua chave em `GEMINI_API_KEY` e defina `AI_PROVIDER=gemini`
  - Para usar o **OpenAI**: insira sua chave em `OPENAI_API_KEY` e defina `AI_PROVIDER=openai`
- Execute `docker compose up -d` para rodar a aplicação no docker.
- 🤓 A api está rodando na porta 80 no localhost 
