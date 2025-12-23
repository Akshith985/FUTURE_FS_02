import { NextResponse } from 'next/server';
import pool from '@/lib/neon'; // Import the helper we created

export async function POST(request: Request) {
  const client = await pool.connect(); // Get a client from the pool

  try {
    const { cartItems } = await request.json();

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // 1. Calculate Total
    const totalAmount = cartItems.reduce((acc: number, item: any) => {
      return acc + (item.price * item.quantity);
    }, 0);

    // Start a transaction (so if part 2 fails, part 1 is cancelled)
    await client.query('BEGIN');

    // 2. Insert Order and get the new ID
    const orderResult = await client.query(
      'INSERT INTO orders (total_amount, status) VALUES ($1, $2) RETURNING id',
      [totalAmount, 'pending']
    );
    const orderId = orderResult.rows[0].id;

    // 3. Insert Order Items
    for (const item of cartItems) {
      await client.query(
        'INSERT INTO order_items (order_id, product_name, price, quantity) VALUES ($1, $2, $3, $4)',
        [orderId, item.name, item.price, item.quantity]
      );
    }

    // Commit the transaction
    await client.query('COMMIT');

    return NextResponse.json({ 
      success: true, 
      orderId: orderId, 
      message: "Order placed successfully in Neon!" 
    });

  } catch (error: any) {
    await client.query('ROLLBACK'); // Undo changes if error
    console.error('Neon Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    client.release(); // Close connection
  }
}