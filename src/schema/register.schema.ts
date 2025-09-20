import * as z from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .nonempty("This field is required")
    .min(3, "Name must be at least 3 characters")
    .max(10, "Name must be at most 10 characters"),
  email: z.email().nonempty('This field is required'),
  password: z.string().nonempty("This field is required").min(6, "Password must be at least 6 characters"),
  rePassword: z.string().nonempty('This field is required') ,
  phone: z.string().nonempty('This field is required')
  .regex(/^01[0125][0-9]{8}$/, 'Invalid phone number'),
}).refine((object) => object.password === object.rePassword, {
  path: ['rePassword'],
  error: 'Passwords do not match !!',
})


export type RegisterSchemaType = z.infer<typeof registerSchema>;