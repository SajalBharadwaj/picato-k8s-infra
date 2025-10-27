import { NextResponse } from 'next/server';
import { createOrder, clearCart, getUserById } from '../../../../lib/firestore';
import { sendOrderConfirmation } from '../../../../lib/emailService';
import { generateOrderId } from '../../../../utils/formatters';
import { Timestamp } from 'firebase/firestore';

export async function POST(request) {
  try {
    const { userId, cartItems, totalAmount, paymentMethod, paymentId } = await request.json();

    // Validation
    if (!userId || !cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return NextResponse.json(
        { error: 'Invalid order data' },
        { status: 400 }
      );
    }

    if (!totalAmount || totalAmount <= 0) {
      return NextResponse.json(
        { error: 'Invalid total amount' },
        { status: 400 }
      );
    }

    if (!paymentMethod || !paymentId) {
      return NextResponse.json(
        { error: 'Payment information is required' },
        { status: 400 }
      );
    }

    // Get user details
    const user = await getUserById(userId);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Generate order ID
    const orderId = generateOrderId();

    // Get current hour for histogram analysis
    const now = new Date();
    const orderTime = now.getHours();

    // Create order document
    const orderData = {
      orderId,
      userId,
      userEmail: user.email,
      userName: user.name,
      items: cartItems,
      totalAmount,
      paymentMethod,
      paymentStatus: 'completed',
      paymentId,
      orderStatus: 'confirmed',
      orderDate: Timestamp.now(),
      orderTime,
    };

    await createOrder(orderData);

    // Clear user's cart
    await clearCart(userId);

    // Send confirmation email
    try {
      await sendOrderConfirmation(user.email, {
        orderId,
        items: cartItems,
        totalAmount,
        orderDate: new Date().toISOString(),
      });
    } catch (emailError) {
      console.error('[sendOrderConfirmation]', emailError);
      // Don't fail the order if email fails
    }

    return NextResponse.json({
      success: true,
      orderId,
    });
  } catch (error) {
    console.error('[Create Order]', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
