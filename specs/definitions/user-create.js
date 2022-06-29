module.exports = [

    {
        name: "userCreate",
        properties: {
            userName: {
                type: "string"
            },
            email: {
                type: "string"
            },
            password: {
                type: "string"
            },
            address: {
                type: "string"
            },
            dob: {
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
        },
      
    }

];