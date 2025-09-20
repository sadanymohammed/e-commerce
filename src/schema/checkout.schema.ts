import * as z from "zod";

export const checkoutSchema = z.object({
  details: z.string().nonempty('This field is required'),
  phone : z.string().nonempty('This field is required').regex(/^01[0125][0-9]{8}$/, 'Invalid phone number'),
  city: z.string().nonempty('This field is required'),
})


export type checkoutSchemaType = z.infer<typeof checkoutSchema>;