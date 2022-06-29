module.exports = [

    {
        name: "symptoms",
        properties: {
            user_id: {
                type: "string"
            },
            // parent_id: {
            //     type: "string"
            // },
            // value: {
            //     type: "number"
            // },
            symptoms: {
                type: 'array',
                items: {
                    type: 'array',
                    properties: {
                        subcatId: { type: "string" },
                        score: { type: "string" }
                    }
                }
            }
        },
      
    }

];