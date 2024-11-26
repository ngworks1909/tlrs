import { z } from "zod"

export const validateAssign = z.object({
    orderId: z.string(),
    adminId: z.string()
})