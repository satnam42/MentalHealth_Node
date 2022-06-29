module.exports = [
    {
        url: "/add",
        post: {
            summary: "add activities",
            description: "add activities",
            parameters: [{
                in: "body",
                name: "body",
                description: "model of activities",
                required: true,
                schema: {
                    $ref: "#/definitions/activities"
                }
            }],
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
];