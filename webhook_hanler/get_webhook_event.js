module.exports.handler = async (event) => {
    console.log('Received event:', JSON.stringify(event, null, 2))

    try {
        // Parse the incoming webhook payload
        const payload = JSON.parse(event.body)

        // Check if the event is "recipient_completed"
        if (payload[0].event === 'recipient_completed') {
            const documentData = payload[0].data

            // Extract relevant information
            const documentId = documentData.id
            const documentName = documentData.name
            const recipient = documentData.recipients[0]
            const recipientName = `${recipient.first_name} ${recipient.last_name}`
            const recipientEmail = recipient.email
            const documentStatus = documentData.status

            // Log the extracted data
            console.log('Document ID:', documentId)
            console.log('Document Name:', documentName)
            console.log('Recipient Name:', recipientName)
            console.log('Recipient Email:', recipientEmail)
            console.log('Document Status:', documentStatus)

            // Add your business logic here
            // Example: Save the data to a database, send a confirmation email, etc.

            // Respond with a success message
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Webhook processed successfully' }),
            }
        }
        // If the event is not "recipient_completed", ignore it
        console.log('Ignoring event:', payload[0].event)
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Event ignored' }),
        }
    } catch (error) {
        console.error('Error processing webhook:', error)
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal server error' }),
        }
    }
}
