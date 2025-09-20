import * as z from "zod";

export const loginSchema = z.object({
  email: z.email().nonempty('This field is required'),
  password: z.string().nonempty("This field is required").min(6, "Password must be at least 6 characters"),
})


export type loginSchemaForm = z.infer<typeof loginSchema>;