import z from 'zod'

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});

export type SigninInput = z.infer<typeof signinInput>

export const updateInput = z.object({
    url: z.string().min(10),
    name: z.string().min(4).max(20),
    mobile: z.string().regex(/^[6-9]\d{9}$/)
})

export type UpdateInput = z.infer<typeof updateInput>