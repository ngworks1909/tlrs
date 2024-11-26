import { z } from 'zod';

// Define a schema for measurements
const measurementSchema = z.object({
  type: z.enum(["SHIRT_LENGTH", "CHEST", "SHOULDER", "HANDS", "FRONT_LOOSE", "PANT_LENGTH", "WAIST", "HIP", "THIGHS_LOOSE", "BOTTOM"]), // Only allow these specific types
  value: z.number().positive(),
});

// Define the schema for creating an order
export const validateOrder = z.object({
  serviceId: z.string().min(1),
  optionId: z.string().min(1),
  amountPaid: z.number().min(0),
  measurements: z.array(measurementSchema),
  mobile: z
    .string()
    .regex(/^\d{10}$/),
});

export const validateUpdateOrder = z.object({
  orderId: z.string().length(8),
  amountPaid: z.number().min(0),
  orderStatus: z.enum(["pending", "started", "stitched", "delivered", "cancelled"]),
  measurements: z.array(measurementSchema),
})

// Define the type of the validated data (optional)
