class Functions {

    static requestError(res, error) {
        return res.status(error.status || 500).send({
            status: "error",
            message: error.message || error.message.toString(),
            stack: error.stack,
        })
    };

    static ifEmail(email) {
        try {
            if (!email && email === "") {
                return false;
            }
            const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return emailRegex.test(email);
        } catch (e){
            return false;
        }
    };

}

module.exports = Functions;
