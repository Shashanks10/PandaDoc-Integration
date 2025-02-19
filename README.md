PANDADOC SERVERLESS INTEGRATION

PandaDoc is a cloud-based document automation platform designed to streamline the creation, sending, and management of business documents such as proposals, contracts, quotes, and agreements. It is widely used by businesses to improve document workflows, enhance collaboration, and accelerate the signing process.

**Table of Contents**

1. Features
2. Prerequisites
3. Installation
4. Deployment
5. API Endpoints and Working flow

**Features**

1. List Templates: Fetch a list of all templates from PandaDoc.
2. Create Documents: Create documents in PandaDoc using predefined templates.
3. List Documents: Fetch a list of all documents from PandaDoc.
4. Send Documents: Send documents to recipients via email using PandaDoc.

**Prerequisites**

Before you begin, ensure you have the following:
1. AWS Account: You need an AWS account to deploy the serverless functions.
2. Node.js: Ensure you have Node.js installed (version 18.x recommended).
3. Serverless Framework: Install the Serverless Framework globally using npm:

**Installation**

* You need to have a valid and active PandaDoc account with a verified email address.
* Register your application at the [Developer Dashboard](https://app.pandadoc.com/a/#/settings/api-dashboard/configuration). Please note, the application creation is only available with the production API access enabled, while you can test the public API with the Sandbox API key.
![Screenshot from 2025-02-17 23-42-42|690x421](upload://t28QZH0JXzcSYVh8C90xvAU3I3O.jpeg)
* Create a .env file in the root directory and add your PandaDoc API key:
```
PANDADOC_API_KEY=your_pandadoc_api_key
```

**Deployment**

To deploy the project to AWS, install the serverless and run the following command:
```
serverless deploy --stage dev
```

**PandaDoc APIs:**

Before creating a document using the **Create Document Function** , you must first **create a template** in PandaDoc. Templates serve as the foundation for documents, allowing you to define the structure, placeholders (tokens), and formatting that will be used for multiple documents. Here's how it works:

**How to Create a Template in PandaDoc**

Step 1: Log in to your PandaDoc account.
Step 2: Navigate to the Templates section in the dashboard.
Step 3: Click on New Template to create a new template.
Step 4: Design the template by adding:
* Text Fields: For static content (e.g., headings, paragraphs).
* Tokens: For dynamic content (e.g., {{customer_name}}, {{email}}).
* Fields: For recipient input (e.g., signature fields, date fields).

Step 5: Save the template and note its Template UUID, which will be used to create documents programmatically.

After the creation of **Template**. it looks like this:

![Screenshot from 2025-02-19 09-55-56|690x303](upload://bMttk3ukleiZAqhYWKaZuJLQ44P.png)


**1. List Templates Function**

**Purpose**
To fetch a list of all available templates from PandaDoc.

**Working**:
* This function is designed to retrieve a list of templates stored in PandaDoc. Templates are pre-designed document formats that can be used to create new documents.
* The function makes a GET request to the PandaDoc API endpoint /public/v1/templates.
* The API key is included in the request headers for authentication.
* The response from PandaDoc contains metadata about each template, such as the template name, UUID, and other details.
* This function is useful for users who want to select a template before creating a new document.

**Use Case:**
* A user wants to see all available templates in PandaDoc to choose the appropriate one for creating a new document.

**2. Create Document Function**

**Purpose:** 
To create a new document in PandaDoc using a predefined template.

**Working**:
* This function allows users to create a new document by specifying a template and providing dynamic content (tokens) for placeholders in the template.
* It makes a POST request to the PandaDoc API endpoint /public/v1/documents.
* The request body includes details such as the template UUID, recipient information, and tokens (placeholders for dynamic content).
* The API key is included in the request headers for authentication.
* After creating the document, the function fetches the document status to ensure it was created successfully.
* This function is useful for automating document creation workflows.
* For this Create Document API we have to pass a payload to fill the fillable parts of the documentation.

```
const templateDetails = {
            template_name: 'Test Template from PandaDoc API by Shashank Biradar', // name for the template
            template_uuid: 'nLGCSkzLHLiadjQpNGfNtD', // selete the required template from the pandadoc dashboard or listing of templates handler
            email: 'shashank.biradar@7edge.com', // recipient email
        }
const PayloadForPandaDoc = {
                name: templateDetails.template_name,
                template_uuid: templateDetails.template_uuid,
                recipients: [
                    {
                        email: templateDetails.email,
                        first_name: 'Shashank',
                        last_name: 'S',
                        role: 'Client',
                    },
                ],
                tokens: [
                    {
                        name: 'token.customer_name',
                        value: 'Shashank Biradar',
                    },
                    {
                        name: 'token.mail',
                        value: 'shashank@gmail.com',
                    },
                    {
                        name: 'token.contact_name',
                        value: 'shashank biradar',
                    },
                    {
                        name: 'token.phone_no',
                        value: '+1234567890',
                    },
                    {
                        name: 'token.cell',
                        value: '+0987654321',
                    },
                    {
                        name: 'token.contact_email',
                        value: 'shashank@gmail.com',
                    },
                    {
                        name: 'token.data_delivery_email',
                        value: 'shashank@gmail.com',
                    },
                    {
                        name: 'token.city',
                        value: 'New York',
                    },
                    {
                        name: 'token.state',
                        value: 'NY',
                    },
                    {
                        name: 'token.zip_code',
                        value: '007',
                    },
                    {
                        name: 'token.address',
                        value: '911 Main Street',
                    },
                    {
                        name: 'token.pricing_tiers',
                        value: 'Pricing Tiers',
                    },
                    {
                        name: 'token.setup_fee',
                        value: '40',
                    },
                    {
                        name: 'token.price',
                        value: '96',
                    },
                    {
                        name: 'token.overage_cap',
                        value: '80',
                    },
                    {
                        name: 'token.state',
                        value: 'NY',
                    },
                    {
                        name: 'token.counties',
                        value: 'california',
                    },
                    {
                        name: 'token.zip_code',
                        value: '911',
                    },
                    {
                        name: 'token.period',
                        value: '1 Monthly',
                    },
                    {
                        name: 'token.expiration_period',
                        value: '1 Year',
                    },
                    {
                        name: 'token.post_exp_period',
                        value: '2 Year',
                    },
                    {
                        name: 'token.email_send_delay',
                        value: '1 day',
                    },
                    {
                        name: 'token.subject_line',
                        value: 'xxxxxxxxxxx',
                    },
                    {
                        name: 'token.reply_to_address',
                        value: 'new york',
                    },
                ],
                metadata: {
                    document_type: 'agreement',
                },
                tags: [
                    'convert_max_pro',
                    'order_form',
                    'purchase_agreement',
                ],
            }
```

**Use Case:**

* A user wants to create a new document (e.g., a contract or agreement) using a predefined template and send it to a recipient.

**3. List Documents Function**

**Purpose**:
To fetch a list of all documents created in PandaDoc.

**Working**:
* This function retrieves a list of documents that have been created in PandaDoc.
* It makes a GET request to the PandaDoc API endpoint /public/v1/documents.
* The API key is included in the request headers for authentication.
* The response contains metadata about each document, such as the document ID, status, and creation date.
* This function is useful for users who want to view or manage their existing documents.

**Use Case:**

* A user wants to see all documents they have created in PandaDoc to track their status or resend them.

**4. Get Document Status Function**

**Purpose**: 
To fetch the status of a specific document in PandaDoc.

**Working**:

* This function retrieves the status of a document, such as whether it has been uploaded, sent, or signed.
* It makes a GET request to the PandaDoc API endpoint /public/v1/documents/{document_id}.
* The document_id is passed in the URL.
* The API key is included in the request headers for authentication.
* This function is primarily used internally to check the status of a document after it has been created or sent.

**Use Case:**

* A user wants to check the status of a document (e.g., whether it has been signed by the recipient).

**5.Send Document Function**

**Purpose**: 
To send a document to a recipient via email using PandaDoc.

**Working**:

* This function sends an existing document to a recipient via email.
* It makes a POST request to the PandaDoc API endpoint /public/v1/documents/{document_id}/send.
* The document_id is passed in the URL, and the request body includes the email message and other options (e.g., silent mode).
* The API key is included in the request headers for authentication.
* This function is useful for automating the process of sending documents to clients or stakeholders.

**Use Case:**

* A user wants to send a document (e.g., an invoice or contract) to a client via email.

**Document Status in PandaDoc**

After a document is sent using the **Send Document Function** , the status of the document can be tracked directly on the **PandaDoc website** .

**How to Check Document Status on PandaDoc Website**

Step 1: Log in to your PandaDoc account.
Step 2: Navigate to the Documents section in the dashboard.
Step 3: Locate the document you sent using the document_id.
Step 4: View the document's status, which will indicate whether it has been sent, viewed, or completed.

![Screenshot from 2025-02-17 23-26-54|690x95](upload://yHKC1tEyE44RNPTXofHq1evNEI5.png)

In PandaDoc, when a document is in the **"document.sent"** status, it means that the document has been successfully sent to the recipient(s) mail box. The recipient should receive an email notification with a link to view and sign the document. 

![Screenshot from 2025-02-19 09-50-45|690x342](upload://zvFL2Hw0s9avbioTlTDf982wo34.png)

So now the recipient has to Open the Document, In that Doc there will be Option to sign the Document. Document looks like this:

![Screenshot from 2025-02-19 10-08-03|690x312](upload://mioSCov7e1VC9ra79i4eCM9ALQr.png)

There will be option of Signing the Doc or approval:

![Screenshot from 2025-02-19 10-10-41|690x312](upload://t1Q0DVkRIshAnnXXjhjDDiqmdA0.png)

Signing the Doc:

![Screenshot from 2025-02-19 10-12-07|690x472](upload://pyqQoKVsWya80fGXgGjeA10NxSK.png)
 
After the signing the Document. The recipient has to click the finalize it by clicking the FINISH button. Now the document is Completed.

![Screenshot from 2025-02-19 10-15-41|690x90](upload://yE3HvU6HJijg6vrVgh4sur6CWgG.png)

**WEBHOOKS**

A webhook is a way for applications to communicate automatically. Instead of continuously polling for updates, a webhook pushes real-time data when an event occurs.

For example, in PandaDoc, webhooks can notify your system when:

* A document is created
* A document is sent for signature
* A document is completed
* A document fails

**How PandaDoc Webhooks Work**

* You configure a Webhook URL in PandaDoc Settings → Webhooks.
* When an event occurs (e.g., a document is signed), PandaDoc sends an HTTP request to your webhook URL.
* Your API processes the request and responds with a 200 OK status.

Example Webhook Payload from PandaDoc:
```
{
  "event": "document.completed",
  "data": {
    "id": "12345",
    "name": "Contract Agreement",
    "status": "completed",
    "created_at": "2025-02-18T12:00:00Z",
    "completed_at": "2025-02-18T12:30:00Z"
  }
}

```
Here whenever the document status is changed, to record that changes i have written a simple **AWS Lambda function**  (POST method) to process webhook requests.

**Configure the Webhook in PandaDoc**

Go to PandaDoc -> setting -> Integration -> Webhooks .
Enter your API Gateway Invoke URL (POST method).
Save & enable the webhook.

![Screenshot from 2025-02-19 10-46-55|314x500](upload://jIKW2xxPdOKv4pMzkbr1138z0wi.png)
 
So whenever the document status is changed. the webhook **pushes** real-time data to our API when an event occurs. We can check the real time logs in the webhooks history.

![Screenshot from 2025-02-19 10-58-38|690x224](upload://3sPfVnq3izLkEEF9odaZComBeKR.png)


**References:**
* [Start with PandaDoc APIs](https://developers.pandadoc.com/docs/getting-started)
* [PandaDoc Feature Overview](https://developers.pandadoc.com/reference/features)
