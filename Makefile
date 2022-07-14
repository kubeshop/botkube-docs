# Show this help.
help:
	@awk '/^#/{c=substr($$0,3);next}c&&/^[[:alpha:]][[:alnum:]_-]+:/{print substr($$1,1,index($$1,":")),c}1{c=0}' $(MAKEFILE_LIST) | column -s: -t

# Update Helm chart readme
sync-chart-readme:
	@pushd ./tools; \
	go run sync-chart-md.go; \
	popd;
