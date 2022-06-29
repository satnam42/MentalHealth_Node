module.exports = [
    {
        url: "/create",
        post: {
            summary: "create",
            description: "create",
            parameters: [{
                in: "body",
                name: "body",
                description: "Model of user creation",
                required: true,
                schema: {
                    $ref: "#/definitions/categoryCreate"
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

    {
        url: "/list",
        get: {
            summary: "category",
            description: "get category",
            // parameters: [{
            //     in: "body",
            //     name: "body",
            //     description: "get category and subcategories",
            //     required: true,
            //     schema: {
            //         $ref: "#/definitions/categoryCreate"
            //     }
            // }],
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