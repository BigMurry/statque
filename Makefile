test-coveralls:
		@NODE_ENV=test ./node_modules/.bin/istanbul cover ./node_modules/mocha/bin/_mocha __test__ --report lcovonly -- -R spec -t 30000
