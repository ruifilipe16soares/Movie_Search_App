# Instalar as dependências do backend e frontend
install:
	@echo "Instalando dependências do backend..."
	cd backend && npm install
	@echo "Instalando dependências do frontend..."
	cd frontend && npm install

# Iniciar backend e frontend em paralelo
start:
	@echo "Iniciando backend e frontend..."
	# Iniciar o backend e frontend ao mesmo tempo
	(cd backend && npm start &) && \
	(cd frontend && npm start &) && \
	sleep 5 && \
	xdg-open http://localhost:3000 || open http://localhost:3000 || start http://localhost:3000

# Comando completo para instalar dependências e iniciar a aplicação
run: install start

#o user depois só precisa de fazer make run
#make run
