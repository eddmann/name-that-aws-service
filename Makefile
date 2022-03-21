IMAGE = node:17.7.2-alpine3.15
DOCKER = docker run --rm -v $(PWD):/app -w /app

EXPORTED_SERVICES_FILE_PATH = services.json

.PHONY: generate-todays-quiz
generate-todays-quiz:
	@DATE=$$(date +%Y%m%d); \
	[ -f public/quiz/$$DATE.json ] && echo "Quiz $$DATE already generated" && exit 1; \
	$(DOCKER) $(IMAGE) node generate-quiz.js $(EXPORTED_SERVICES_FILE_PATH) $$DATE > public/quiz/$$DATE.json; \
	ln -sf $$DATE.json public/quiz/latest.json; \
	echo "Quiz $$DATE generated";

.PHONY: dev-server
dev-server:
	$(DOCKER) -p 8080:8080 $(IMAGE) sh -c "npm install --global http-server && http-server"

.PHONY: shell
shell:
	@$(DOCKER) -it $(IMAGE) sh
