module.exports = [

    {
        name: "activities",
        properties: {
            userId: {
                type: "string"
            },
            actions: {
                type: 'array',
                items: {
                    properties: {
                        name: {
                            type: "string"
                        },

                        ans: {
                            type: "string"
                        },
                    }
                }
            }
        },

    }

];