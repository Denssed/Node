const success = (req, res, message, status) => {
    console.log(message)
    res.status(status || 200).send({
        // error: '',
        body: message
    })
}

const error = (req, res, message, status, details) => {
    console.error('[response error]', details)
    res.status(status || 500).send({
        error: message,
        // body: ''
    })
}

export { success, error };