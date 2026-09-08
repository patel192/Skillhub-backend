const { z } = require("zod");

const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ID");

const optionSchema = z.object({
  text: z
    .string({ required_error: "Option text is required" })
    .trim()
    .min(1, "Option text cannot be empty")
    .max(500),
  isCorrect: z.boolean({
    required_error: "isCorrect is required",
  }),
  explanation: z
    .string()
    .trim()
    .max(1000)
    .optional(),
});

const addQuestionSchema = z.object({
  body: z
    .object({
      courseId: objectIdSchema,
      question: z
        .string({ required_error: "Question is required" })
        .trim()
        .min(5, "Question must be at least 5 characters")
        .max(1000),
      options: z
        .array(optionSchema)
        .length(4, "Exactly 4 options are required"),
      points: z
        .number()
        .positive("Points must be greater than 0")
        .default(1),
    })
    .refine(
      (data) => data.options.some((option) => option.isCorrect === true),
      {
        message: "At least one option must be marked as correct",
        path: ["options"],
      }
    ),
});

const quizCourseQuerySchema = z.object({
  params: z.object({
    courseId: objectIdSchema,
  }),
});

module.exports = {
  addQuestionSchema,
  quizCourseQuerySchema,
};