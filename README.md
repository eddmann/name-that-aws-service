# Name that AWS Service

_Article_: https://eddmann.com/posts/can-you-name-that-aws-service/

AWS provides _alot_ of services... and keeping up with them can be tough.
This is a small daily trivia game I built which quizes you on 10 different AWS service icons.

Each day a new quiz is generated (via [GitHub Actions](./.github/workflows/generate.yml)) and the results are stored within your Local Storage (similiar to how Wordle operates).

[![Name that AWS Service](name-that-aws-service.png)](https://eddmann.com/name-that-aws-service/)

## Services

The list of available services has been exported (using `export-services.js`) from the Architecture Icons [assets package](https://aws.amazon.com/architecture/icons/) supplied by AWS.
