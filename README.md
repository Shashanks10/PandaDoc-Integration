PandaDoc Serverless Integration

This project provides a serverless integration with the PandaDoc API, allowing you to create, list, and send documents and templates using AWS Lambda functions. The project is built using the Serverless Framework and is designed to be deployed on AWS.

Table of Contents

Features
Prerequisites
Installation
Deployment
API Endpoints
Environment Variables
Contributing
License

Features

Create Documents: Create documents in PandaDoc using predefined templates.
List Documents: Fetch a list of all documents from PandaDoc.
List Templates: Fetch a list of all templates from PandaDoc.
Send Documents: Send documents to recipients via email using PandaDoc.

Prerequisites

Before you begin, ensure you have the following:
AWS Account: You need an AWS account to deploy the serverless functions.
Node.js: Ensure you have Node.js installed (version 18.x recommended).
Serverless Framework: Install the Serverless Framework globally using npm:

bash
npm install -g serverless

PandaDoc API Key: Obtain an API key from PandaDoc and set it as an environment variable.

Installation

Clone the repository:
git clone https://github.com/your-repo/pandadoc-serverless.git
cd pandadoc-serverless

Install dependencies:
npm install

Set up environment variables:
Create a .env file in the root directory and add your PandaDoc API key:
PANDADOC_API_KEY=your_pandadoc_api_key

Deployment
To deploy the project to AWS, run the following command:
serverless deploy --stage dev

This will deploy the serverless functions to your AWS account under the specified stage (e.g., dev).

API Endpoints

The following API endpoints are available after deployment:
GET /view-pandadoc-list-templates: Fetches a list of all templates from PandaDoc.
GET /view-pandadoc-list-docs: Fetches a list of all documents from PandaDoc.
POST /create-pandadoc-doc: Creates a new document in PandaDoc using a predefined template.
GET /send-docs-to-email: Sends a document to a recipient via email.

Example Requests

List Templates:
curl -X GET https://your-api-endpoint/dev/view-pandadoc-list-templates

Create Document:
curl -X POST https://your-api-endpoint/dev/create-pandadoc-doc -d '{
  "template_name": "Test Template",
  "template_uuid": "your_template_uuid",
  "email": "recipient@example.com"
}'

Send Document:
curl -X GET https://your-api-endpoint/dev/send-docs-to-email -d '{
  "document_id": "your_document_id"
}'

Environment Variables
The following environment variables are required for the project to function correctly:

PANDADOC_API_KEY: Your PandaDoc API key.
REGION: AWS region where the services are deployed.
DEBUG: Debug mode (optional).
SENDER_EMAIL_ADDRESS: Email address used for sending emails.

Contributing
Contributions are welcome! Please follow these steps to contribute:
Fork the repository.
Create a new branch (git checkout -b feature/YourFeatureName).
Commit your changes (git commit -m 'Add some feature').
Push to the branch (git push origin feature/YourFeatureName).
Open a pull request.

License
This project is licensed under the MIT License. See the LICENSE file for details.

This README provides an overview of the PandaDoc Serverless Integration project. For more detailed information, refer to the code and comments within the project files.
