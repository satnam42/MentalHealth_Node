module.exports = [
    {
        url: "/create",
        post: {
            summary: "create",
            description: "create",
            parameters: [{
                in: "body",
                name: "body",
                description: "Model of score creation",
                required: true,
                schema: {
                    $ref: "#/definitions/scoreCreate"
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
            summary: "score",
            description: "get score",
            // parameters: [{
            //     in: "body",
            //     name: "body",
            //     description: "get score and subcategories",
            //     required: true,
            //     schema: {
            //         $ref: "#/definitions/scoreCreate"
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
    {
        url: "/pdfByUserId/{id}",
        get: {
            summary: "sub category list",
            description: "sub category list by Category Id ,just pass category id",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "user id",
                    required: true,
                    type: "string"
                },

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


];