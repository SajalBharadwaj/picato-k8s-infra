import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendAdminCredentials(toEmail, password) {
  try {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: toEmail,
      subject: 'Welcome to PICATO Admin',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">Welcome to PICATO Admin</h2>
          <p>Hello,</p>
          <p>You have been granted admin access to the PICATO food ordering system.</p>

          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Your Login Credentials:</h3>
            <p><strong>Email:</strong> ${toEmail}</p>
            <p><strong>Password:</strong> ${password}</p>
          </div>

          <p>You can login at: <a href="${appUrl}/admin-login">${appUrl}/admin-login</a></p>

          <p style="color: #dc2626; font-weight: bold;">Please keep these credentials secure and consider changing your password after first login.</p>

          <p>Best regards,<br>PICATO Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('[sendAdminCredentials] Email sent to:', toEmail);
  } catch (error) {
    console.error('[sendAdminCredentials]', error);
    throw error;
  }
}

export async function sendOrderConfirmation(toEmail, orderDetails) {
  try {
    const { orderId, items, totalAmount, orderDate } = orderDetails;

    const itemsHtml = items.map(item => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${item.name} (${item.size})</td>
        <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: right;">$${item.price.toFixed(2)}</td>
      </tr>
    `).join('');

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: toEmail,
      subject: `Order Confirmation - ${orderId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">Order Confirmation</h2>
          <p>Thank you for your order!</p>

          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Order ID:</strong> ${orderId}</p>
            <p><strong>Date:</strong> ${new Date(orderDate).toLocaleString()}</p>
          </div>

          <h3>Order Details:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background-color: #f9fafb;">
                <th style="padding: 8px; text-align: left; border-bottom: 2px solid #e5e7eb;">Item</th>
                <th style="padding: 8px; text-align: center; border-bottom: 2px solid #e5e7eb;">Qty</th>
                <th style="padding: 8px; text-align: right; border-bottom: 2px solid #e5e7eb;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" style="padding: 12px 8px; text-align: right; font-weight: bold;">Total:</td>
                <td style="padding: 12px 8px; text-align: right; font-weight: bold; color: #dc2626;">$${totalAmount.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>

          <p style="margin-top: 20px;">Your order is being prepared and will be ready soon!</p>

          <p>Best regards,<br>PICATO Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('[sendOrderConfirmation] Email sent to:', toEmail);
  } catch (error) {
    console.error('[sendOrderConfirmation]', error);
    throw error;
  }
}
