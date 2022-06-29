module.exports = [
    {
        url: "/add",
        post: {
            summary: "add",
            description: "add feed",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Model of feed creation Note please send image in formData",
                    required: true,
                    schema: {
                        $ref: "#/definitions/feedCreate"
                    }
                },
                // {
                //     in: "header",
                //     name: "x-access-token",
                //     description: "token to access api",
                //     required: true,
                //     type: "string"
                // }
            ],
            responses: {
                default: {
                    description: "Unexpected error",
                    schema: {
                        $ref: "#/definitions/Error"
                    }
                }
            }
        }
    },

    {
        url: "/list",
        get: {
            summary: "list",
            description: "feed list",
            parameters: [
                // {
                //     in: "header",
                //     name: "x-access-token",
                //     description: "token to access api",
                //     required: true,
                //     type: "string"
                // }
            ],
            responses: {
                default: {
                    description: "Unexpected error",
                    schema: {
                        $ref: "#/definitions/Error"
                    }
                }
            }
        }
    },
]