import { z } from "zod";

export const loginSchema = z.object({
  "client ID": z.string().min(1, "User ID is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-zA-Z]/, "Password must contain letters")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter"),
}).refine((data) => !data.password.includes(data["client ID"]), {
  message: "Password cannot contain your User ID",
  path: ["password"], // This links the error specifically to the password field
});

export type LoginFormValues = z.infer<typeof loginSchema>;