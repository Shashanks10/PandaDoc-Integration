/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
const { checkPrivilege, fetchUserAttribute, returnResponse } = require('../lib/helper')
const { listofDocumentsFromPandaDoc } = require('../helpers/pandaDoc_api_helpers')

/**
 * Handler function to list documents from PandaDoc.
 * This function is triggered by an event, logs the event details,
 * and attempts to fetch a list of documents from the PandaDoc API.
 * If successful, it returns a response with the documents data and a
 * success status. In case of an error, it returns an internal server
 * 500 status code for the error response.
 * @param {Object} event - The event object that triggered the handler.
 * @returns {Promise<Object>} The HTTP response with a success status
 * and documents data, or an error message in case of failure.
 */
module.exports.handler = async (event) => {
    try {
        console.log(event)

        // Calling the List-documents-API from PandaDoc
        try {
            const result = await listofDocumentsFromPandaDoc()
            const infos = JSON.parse(result.body).data
            return returnResponse(200, {
                success_status: true,
                message: 'List of Documents fetched successfully',
                data: infos,
            })
        } catch (error) {
            return returnResponse(500, { success_status: false, message: '' })
        }
    } catch (error) {
        return returnResponse(500, { success_status: false, message: 'Internal Server Error' })
    }
}
