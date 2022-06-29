module.exports = [
    {
        name: "scoreCreate",
        properties: {
            userId: {
                type: "string"
            },
            categoryId: {
                type: "string"
            },
            details: {
                type: 'array',
                items: {
                    properties: {
                        subCategory: {
                            type: "string"
                        },

                        no: {
                            type: "string"
                        },
                    }
                }
            },
            date: {
                type: "date"
            },
        },
    }

];