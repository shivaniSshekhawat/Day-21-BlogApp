import { Request, Response } from 'express';
import Stripe from 'stripe';
import User from '../models/User';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2025-01-27.acacia' as any,
});

export const createCheckoutSession = async (req: any, res: Response) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Premium Subscription',
                            description: 'Get access to exclusive premium blogs',
                        },
                        unit_amount: 1000, // $10.00
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://localhost:5173/cancel`,
            metadata: {
                userId: req.user.id,
            },
        });

        res.json({ url: session.url });
    } catch (error: any) {
        console.error('Stripe error:', error);
        res.status(500).json({ message: error.message });
    }
};

export const handleWebhook = async (req: Request, res: Response) => {
    // In a real app, you'd verify the stripe signature
    // For this demo, we'll just process the event if it's sent
    const event = req.body;

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const userId = session.metadata.userId;

        await User.findByIdAndUpdate(userId, { isPremium: true });
        console.log(`User ${userId} upgraded to Premium`);
    }

    res.json({ received: true });
};
