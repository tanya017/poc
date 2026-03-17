// import { z } from "zod";

// const passwordSchema = z
//   .string()
//   .min(8, { message: "Password must be at least 8 characters long" })
//   .regex(/[A-Z]/, {
//     message: "Password must contain at least one uppercase letter",
//   })
//   .regex(/[a-z]/, {
//     message: "Password must contain at least one lowercase letter",
//   })
//   .regex(/\d/, { message: "Password must contain at least one digit" })
//   .regex(/[^A-Za-z0-9]/, {
//     message: "Password must contain at least one special character",
//   });

// // Define the main form schema, including a confirm password field and cross-field validation
// export const formSchema = z
//   .object({
//     email: z.string().email({ message: "Please enter a valid email" }),
//     password: passwordSchema,
//     confirmPassword: z.string(),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match", // Error message for the mismatch
//     path: ["confirmPassword"], // Attach the error to the confirmPassword field
//   });

// // Infer the TypeScript type from the schema
// export type FormData = z.infer<typeof formSchema>;
import { z } from "zod";

// Change 'email' to 'client ID' to match your register("client ID")
export const formSchema = z.object({
  "client ID": z.string().min(1, { message: "Client ID is required" }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, { message: "Must contain one uppercase letter" })
    .regex(/[a-z]/, { message: "Must contain one lowercase letter" })
    .regex(/\d/, { message: "Must contain one digit" })
    .regex(/[^A-Za-z0-9]/, { message: "Must contain one special character" }),
});

export type FormData = z.infer<typeof formSchema>;