/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
const { checkPrivilege, fetchUserAttribute, returnResponse } = require('../lib/helper')
const { createDocumentsFromPandaDoc, getDocumentStatusFromPandaDoc } = require('../helpers/pandaDoc_api_helpers')
const { fetchQuery } = require('../lib/postgres_helper')

const ADMIN_PREFIXES = ['ADSU', 'ADCP', 'ADSM', 'ADAC', 'ADBZ', 'ADDD', 'DEAL', 'DIST']

const fetchUserType = (userId) => (ADMIN_PREFIXES.some((prefix) => userId.startsWith(prefix)) ? 'admin' : 'sales_rep')
let data

/**********************************************  ✨ Handler Function for Create Document ⭐  *************************************************/
        /**
         * This function is designed to create a new document in PandaDoc using a predefined template.
         * It makes a POST request to the PandaDoc API endpoint /public/v1/documents.
         * The request body includes details such as the template UUID, recipient information, and tokens (placeholders for dynamic content).
         * The API key is included in the request headers for authentication.
         * After creating the document, the function fetches the document status to ensure it was created successfully.
         * This function is useful for automating document creation workflows.
         * For this Create Document API we have to pass a payload to fill the fillable parts of the documentation.
         * @param {Object} event - The event object that triggered the handler.
         * @returns {Promise<Object>} The HTTP response with a success status and templates data, or an error message in case of failure.
         */
module.exports.handler = async (event) => {
    try {
        const templateDetails = {
            template_name: 'Test Template from PandaDoc API by Shashank Biradar', // name for the template
            template_uuid: 'nLGCSkzLHLiadjQpNGfNtD', // selete the required template from the pandadoc dashboard or listing of templates handler
            email: 'shashank.biradar@7edge.com', // recipient email
        }

        console.log('Templates details:-----', templateDetails)

        try {
            // here iam passing temporary data manually. But actually this data will be fetched from the Database and has to be passed here
            const PayloadForPandaDoc = {
                name: templateDetails.template_name,
                template_uuid: templateDetails.template_uuid,
                recipients: [
                    {
                        email: templateDetails.email,
                        first_name: 'Josh',
                        last_name: 'Ron',
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
            // Calling the PandaDoc API
            try {
                const response = await createDocumentsFromPandaDoc({ body: JSON.stringify({ data: PayloadForPandaDoc }) })
                // parsing the response recived from the pandadoc api
                data = JSON.parse(response.body)
                const documentId = data.data.id
                const docsStatus = data.data.status
                const PandocApiResponse = data.data
                // if the document is created successfully then only it will call the get-Document-Status
                try {
                    if (docsStatus === 'document.uploaded') {
                        // calling the get-Document-Status From PandaDoc
                        const statusResponse = await getDocumentStatusFromPandaDoc({ pathParameters: { documentId } })
                        const statusData = JSON.parse(statusResponse.body)
                        console.log('status from PandaDoc get-Document-Status: ', statusData)
                        const getDocumentStatus = statusData.data.status
                        return returnResponse(200, {
                            success_status: true,
                            message: 'Document created and Uploaded successfully',
                            document_id: documentId,
                            document_creation_status: docsStatus,
                            document_get_status: getDocumentStatus,
                        })
                    }
                } catch (error) {
                    return returnResponse(500, { success_status: false, message: 'Error calling get-Document-Status', error: error.message })
                }
            } catch (error) {
                console.error('Error while   PandaDoc document:', error)
                return returnResponse(500, { success_status: false, message: 'Error creating document', error: error.message })
            }
        } catch (error) {
            return returnResponse(500, { success_status: false, message: 'Internal Server Error' })
        }
    } catch (error) {
        return returnResponse(500, { success_status: false, message: 'Internal Server Error' })
    }
}
