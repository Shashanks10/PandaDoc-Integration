/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable camelcase */
const { sendDocumentViaPandaDoc } = require('../helpers/pandaDoc_api_helpers')
const { returnResponse } = require('../lib/helper')

module.exports.handler = async (event) => {
    try {
        // get document id from database 
        const document_id = 'jixikGAfGHoSU7zbwnrZoc'

        if (!document_id) {
            return returnResponse(400, { success_status: false, message: 'Missing document_id' })
        }

        // Call the sendDocumentViaPandaDoc function with the document_id
        const sendResponse = await sendDocumentViaPandaDoc({ body: JSON.stringify({ document_id }) })
        const sendData = JSON.parse(sendResponse.body)

        return returnResponse(200, {
            success_status: true,
            message: 'Document sent successfully',
            data: sendData,
        })
    } catch (error) {
        console.error('Error while sending document:', error)
        return returnResponse(500, { success_status: false, message: 'Error sending document', error: error.message })
    }
}
