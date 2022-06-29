module.exports = [
    {
        url: "/add",
        post: {
            summary: "add safety plan",
            description: "add safety plan",
            parameters: [{
                in: "body",
                name: "body",
                description: "model of safetyplan",
                required: true,
                schema: {
                    $ref: "#/definitions/safetyPlanCreate"
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