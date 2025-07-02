import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Campo obrigatório" })
    .email("E-mail inválido")
    .nonempty("O e-mail é obigatório"),
  password: z
    .string({ required_error: "Campo obrigatório" })
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});

export type ILoginSchema = z.infer<typeof loginSchema>;
