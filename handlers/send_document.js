/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable camelcase */
const { sendDocumentViaPandaDoc } = require('../helpers/pandaDoc_api_helpers')
const { returnResponse } = require('../lib/helper')

/*************************************************  ✨ Handler function for Sending Document ⭐  ****************************************************/
/**
 * Handler function to send a document from PandaDoc.
 * This function is triggered by an event and attempts to send a document from PandaDoc.
 * If successful, it returns a response with a success status and the data from the PandaDoc API.
 * In case of an error, it returns an internal server 500 status code for the error response.
 * @param {Object} event - The event object that triggered the handler.
 * @returns {Promise<Object>} The HTTP response with a success status and data, or an error message in case of failure.
 */
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
