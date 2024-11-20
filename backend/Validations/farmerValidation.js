const { z } = require('zod');

const farmerSchema = z.object({
    farmerName: z.string().min(1, "Farmer name is required"),
    email: z.string().email("Invalid email format"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    address: z.string().min(1, "Address is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(['farmer', 'admin']).default('farmer')
});

module.exports = farmerSchema;
