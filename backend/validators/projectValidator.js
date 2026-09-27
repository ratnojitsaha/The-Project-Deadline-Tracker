const { z } = require("zod");

const projectUpdateSchema = z.object({
    project_id: z
        .number()
        .int()
        .positive(),

    status: z.enum([
        "In Progress",
        "Completed"
    ]),

    notes: z
        .string()
        .max(1000, "Notes cannot exceed 1000 characters")
        .optional()
        .default("")
});

module.exports = {
    projectUpdateSchema
};