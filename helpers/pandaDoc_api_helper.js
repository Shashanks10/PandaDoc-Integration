/* eslint-disable import/extensions */
/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
/* eslint-disable comma-dangle */
/* eslint-disable arrow-parens */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
const axios = require('axios')

/**
 * Function to fetch list of all documents from PandaDoc using the PandaDoc API.
 * @returns {Object} - Promise that resolves to an object with a statusCode and body.
 * The body is a JSON object with a message and data property.
 * The data property contains the list of documents fetched from PandaDoc.
 * If there is an error in fetching the documents, the statusCode is 500,
 * and the body contains an error property.
 */
module.exports.listofDocumentsFromPandaDoc = async () => {
    const { API_KEY } = process.env // Extract API_KEY from environment
    const config = {
        method: 'get',
        url: 'https://api.pandadoc.com/public/v1/documents',
        headers: {
            Authorization: `API-Key ${API_KEY}`,
            'Content-Type': 'application/json',
        },
    }

    try {
        const response = await axios.request(config)
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Documents fetched successfully',
                data: response.data,
            }),
        }
    } catch (error) {
        console.error('Error while fetching documents:', error)
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Error while fetching documents',
                error: error.message,
            }),
        }
    }
}

/**
 * Function to fetch a list of all templates from PandaDoc using the PandaDoc API.
 * @returns {Object} - Promise that resolves to an object with a statusCode and body.
 * The body is a JSON object with a message and data property.
 * The data property contains the list of templates fetched from PandaDoc.
 * If there is an error in fetching the templates, the statusCode is 500,
 * and the body contains an error property.
 */
module.exports.listofTemplateesFromPandaDoc = async () => {
    const { API_KEY } = process.env // Extract API_KEY from environment
    const config = {
        method: 'get',
        url: 'https://api.pandadoc.com/public/v1/templates',
        headers: {
            Authorization: `API-Key ${API_KEY}`,
            'Content-Type': 'application/json',
        },
    }

    try {
        const response = await axios.request(config)
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Templates fetched successfully',
                data: response.data,
            }),
        }
    } catch (error) {
        console.error('Error while fetching templates:', error)
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Error while fetching templates',
                error: error.message,
            }),
        }
    }
}

/**
 * Function to fetch a list of documents from PandaDoc using the PandaDoc API.
 * @param {Object} event - The event object that triggered the handler.
 * @returns {Promise<Object>} - Promise that resolves to an object with a statusCode and body.
 * The body is a JSON object with a message and data property.
 * The data property contains the list of documents fetched from PandaDoc.
 * If there is an error in fetching the documents, the statusCode is 500,
 * and the body contains an error property.
 */
module.exports.createDocumentsFromPandaDoc = async (event) => {
    const { API_KEY } = process.env // Extract API_KEY from environment

    const requestData = JSON.parse(event.body)?.data || {} // Extract `data` key from request body

    const config = {
        method: 'post',
        url: 'https://api.pandadoc.com/public/v1/documents',
        headers: {
            Authorization: `API-Key ${API_KEY}`,
            'Content-Type': 'application/json',
        },
        data: requestData, // Pass the extracted `data` as request body
    }

    try {
        const response = await axios.request(config)
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Documents fetched successfully',
                data: response.data,
            }),
        }
    } catch (error) {
        console.error('Error while fetching documents:', error)
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Error while fetching documents',
                error: error.message,
            }),
        }
    }
}

/**
 * Function to fetch the status of a document from PandaDoc using the PandaDoc API.
 * @param {Object} event - The event object that triggered the handler.
 * @returns {Promise<Object>} - Promise that resolves to an object with a statusCode and body.
 * The body is a JSON object with a message and data property.
 * The data property contains the status of the document fetched from PandaDoc.
 * If there is an error in fetching the document status, the statusCode is 500,
 * and the body contains an error property.
 */
module.exports.getDocumentStatusFromPandaDoc = async (event) => {
    const { API_KEY } = process.env // Extract API key from environment variables
    // Extract document ID from path parameters
    const documentId = event?.pathParameters?.documentId // Get document ID from path parameters
    // Check if API key is provided
    if (!API_KEY) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'PandaDoc API key is missing' }),
        }
    }
    // Check if document ID is provided
    if (!documentId) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Missing documentId parameter' }),
        }
    }
    // config for fetching document status
    const config = {
        method: 'get',
        url: `https://api.pandadoc.com/public/v1/documents/${documentId}`,
        headers: {
            Authorization: `API-Key ${API_KEY}`,
            'Content-Type': 'application/json',
        },
    }

    try {
        const response = await axios.request(config)
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Document status fetched successfully',
                data: response.data,
            }),
        }
    } catch (error) {
        console.error('Error while fetching document status:', error)
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Error while fetching document status',
                error: error.message,
            }),
        }
    }
}

module.exports.sendDocumentViaPandaDoc = async (event) => {
    const { API_KEY } = process.env // Extract API_KEY from environment

    const { document_id } = JSON.parse(event.body) || {} // Extract `document_id` from request body
    if (!document_id) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Missing document_id' }),
        }
    }

    const config = {
        method: 'post',
        url: `https://api.pandadoc.com/public/v1/documents/${document_id}/send`,
        headers: {
            Authorization: `API-Key ${API_KEY}`,
            'Content-Type': 'application/json',
        },
        data: {
            message: 'Hello! This document was sent from the PandaDoc API.',
            silent: true
        }
    }

    try {
        const response = await axios.request(config)
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Document sent successfully',
                data: response.data,
            }),
        }
    } catch (error) {
        console.error('Error while sending document:', error)
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Error while sending document',
                error: error.message,
            }),
        }
    }
}
