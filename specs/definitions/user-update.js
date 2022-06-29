module.exports = [{
    name: "updateUser",
    properties: {
        userName: {
            type: "string"
        },
        address: {
            type: "string"
        },
        status: {
            type: "string"
        },
        phone: {
            type: "string"
        },
        country: {
            type: "string"
        },
        status: {
            enum: ['active', 'inactive']
        },
        role: {
            enum: ['user', 'admin']
        },
    }
}];