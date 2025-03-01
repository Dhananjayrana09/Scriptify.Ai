import Stripe from "stripe";
import getDbConnection from "./db";

export async function handleSubscriptionDeleted({
  subscriptionId,
  stripe,
}: {
  subscriptionId: string;
  stripe: Stripe;
}) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const sql = await getDbConnection();
    await sql`UPDATE users SET status = 'cancelled' WHERE customer_id = ${subscription.customer}`;
  } catch (error) {
    console.error("Error handling subscription deletion", error);
    throw error;
  }
}

export async function handleCheckoutSessionCompleted({
  session,
  stripe,
}: {
  session: Stripe.Checkout.Session;
  stripe: Stripe;
}) {
  try {
    console.log("Starting handleCheckoutSessionCompleted");
    const customerId = session.customer as string;
    
    if (!customerId) {
      console.error("Missing customer ID in session", session);
      return;
    }
    
    console.log(`Retrieving customer: ${customerId}`);
    const customer = await stripe.customers.retrieve(customerId);
    
    // Check if line_items exists and has data
    if (!session.line_items?.data?.length) {
      console.error("No line items found in session", session);
      return;
    }
    
    const priceId = session.line_items.data[0]?.price?.id;
    if (!priceId) {
      console.error("No price ID found in session line items", session.line_items);
      return;
    }
    
    console.log(`Processing checkout for customer: ${customerId}, price: ${priceId}`);
    
    const sql = await getDbConnection();
    console.log("Database connection established");

    if ("email" in customer && customer.email) {
      console.log(`Creating/updating user: ${customer.email}`);
      await createOrUpdateUser(sql, customer, customerId);
      
      console.log(`Updating subscription for: ${customer.email}`);
      await updateUserSubscription(sql, priceId, customer.email);
      
      console.log(`Inserting payment record for: ${customer.email}`);
      await insertPayment(sql, session, priceId, customer.email);
      
      console.log("Checkout session processing completed successfully");
    } else {
      console.error("Customer email not found", customer);
    }
  } catch (error) {
    console.error("Error in handleCheckoutSessionCompleted:", error);
    throw error;
  }
}

async function insertPayment(
  sql: any,
  session: Stripe.Checkout.Session,
  priceId: string,
  customerEmail: string
) {
  try {
    console.log(`Inserting payment: ${session.id} for ${customerEmail}`);
    const result = await sql`INSERT INTO payments (amount, status, stripe_payment_id, price_id, user_email) VALUES (${session.amount_total}, ${session.status}, ${session.id}, ${priceId}, ${customerEmail}) RETURNING id`;
    console.log(`Payment inserted with ID: ${result[0]?.id}`);
    return result;
  } catch (err) {
    console.error("Error in inserting payment", err);
    throw err;
  }
}

async function createOrUpdateUser(
  sql: any,
  customer: Stripe.Customer,
  customerId: string
) {
  try {
    const user = await sql`SELECT * FROM users WHERE email = ${customer.email}`;
    if (user.length === 0) {
      await sql`INSERT INTO users (email, full_name, customer_id) VALUES (${customer.email}, ${customer.name}, ${customerId})`;
    }
  } catch (err) {
    console.error("Error in inserting user", err);
  }
}

async function updateUserSubscription(
  sql: any,
  priceId: string,
  email: string
) {
  try {
    await sql`UPDATE users SET price_id = ${priceId}, status = 'active' where email = ${email}`;
  } catch (err) {
    console.error("Error in updating user", err);
  }
}