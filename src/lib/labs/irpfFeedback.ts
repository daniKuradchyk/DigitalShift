import { z } from "zod";

const categoryOptions = ["calculo", "datos", "ui", "otro"] as const;
const stepOptions = ["A", "B", "C", "D", "E", "unknown"] as const;

export const irpfFeedbackSchema = z
  .object({
    category: z.enum(categoryOptions, { message: "Selecciona una categoria" }),
    step: z.enum(stepOptions).optional(),
    details: z
      .string()
      .trim()
      .min(10, "Describe el error con al menos 10 caracteres")
      .max(800, "El mensaje es demasiado largo"),
    name: z.string().trim().max(120, "El nombre es demasiado largo").optional(),
    email: z.string().trim().optional(),
    consent: z.boolean(),
    page: z.string().trim().max(200).optional(),
    website: z.string().trim().optional(), // honeypot
  })
  .superRefine((value, ctx) => {
    const email = value.email?.trim();
    if (email) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "El email no es valido", path: ["email"] });
      }
      if (!value.consent) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Debes aceptar la politica de privacidad", path: ["consent"] });
      }
    }
  });

export type IrpfFeedbackPayload = z.infer<typeof irpfFeedbackSchema>;
