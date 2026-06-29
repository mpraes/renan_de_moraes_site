#!/usr/bin/env bash

set -euo pipefail

DRY_RUN=false
if [[ "${1:-}" == "--dry-run" ]]; then
  DRY_RUN=true
elif [[ "${1:-}" == "--help" || "${1:-}" == "-h" ]]; then
  echo "Uso: ./deploy.sh [--dry-run]"
  echo "  --dry-run   Simula o deploy sem copiar arquivos"
  exit 0
elif [[ -n "${1:-}" ]]; then
  echo "Argumento inválido: ${1}"
  echo "Use: ./deploy.sh [--dry-run]"
  exit 1
fi

# Load local environment variables (expects SSH_PASSWORD in .env)
if [[ -f ".env" ]]; then
  # shellcheck disable=SC1091
  source ".env"
fi

if [[ -z "${SSH_PASSWORD:-}" ]]; then
  echo "Erro: SSH_PASSWORD não encontrado no .env"
  exit 1
fi

if ! command -v sshpass >/dev/null 2>&1; then
  echo "Erro: sshpass não instalado. Instale e tente novamente."
  echo "Exemplo (Ubuntu/WSL): sudo apt install sshpass"
  exit 1
fi

if ! command -v rsync >/dev/null 2>&1; then
  echo "Erro: rsync não instalado. Instale e tente novamente."
  echo "Exemplo (Ubuntu/WSL): sudo apt install rsync"
  exit 1
fi

LOCAL_DIR="${LOCAL_DIR:-public_html/}"
REMOTE_USER="${REMOTE_USER:-u290984882}"
REMOTE_HOST="${REMOTE_HOST:-195.200.3.211}"
REMOTE_PORT="${REMOTE_PORT:-65002}"
REMOTE_DIR="${REMOTE_DIR:-/home/u290984882/domains/renan-de-moraes.com/public_html/}"

if [[ ! -d "${LOCAL_DIR}" ]]; then
  echo "Erro: diretório local '${LOCAL_DIR}' não existe."
  exit 1
fi

echo "Iniciando deploy..."
echo "- Local:  ${LOCAL_DIR}"
echo "- Remote: ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_DIR}"
echo "- Modo:   $([[ "${DRY_RUN}" == "true" ]] && echo "DRY RUN" || echo "EXECUÇÃO")"

SSH_OPTS=(
  -p "${REMOTE_PORT}"
  -o StrictHostKeyChecking=accept-new
  -o UserKnownHostsFile="${HOME}/.ssh/known_hosts"
)

if ! sshpass -p "${SSH_PASSWORD}" ssh "${SSH_OPTS[@]}" "${REMOTE_USER}@${REMOTE_HOST}" "test -w \"${REMOTE_DIR}\""; then
  echo "Erro: sem permissão de escrita no diretório remoto: ${REMOTE_DIR}"
  echo "Verifique ownership/permissões do domínio no Hostinger."
  exit 1
fi

RSYNC_FLAGS="-avz --delete"
if [[ "${DRY_RUN}" == "true" ]]; then
  RSYNC_FLAGS="-avzn --delete"
fi

sshpass -p "${SSH_PASSWORD}" rsync ${RSYNC_FLAGS} \
  -e "ssh -p ${REMOTE_PORT} -o StrictHostKeyChecking=accept-new -o UserKnownHostsFile=${HOME}/.ssh/known_hosts" \
  "${LOCAL_DIR}" \
  "${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_DIR}"

if [[ "${DRY_RUN}" == "true" ]]; then
  echo "Dry-run concluído. Nenhum arquivo foi enviado."
else
  echo "Deploy concluído com sucesso."
fi
