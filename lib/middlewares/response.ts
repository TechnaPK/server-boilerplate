const responseTemplate = (req, res, next) => {

    res.t = {
        success: false,
        message: "",
        data: null
    }

    next()
    
}

export default responseTemplate