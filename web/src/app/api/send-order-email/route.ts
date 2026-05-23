import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface OrderItem {
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

interface OrderEmailPayload {
  customerEmail: string;
  customerName: string;
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  deliveryCity: string;
  deliveryAddress: string;
  paymentMethod: string;
}

const paymentLabels: Record<string, { ka: string; en: string }> = {
  bog_ipay: { ka: 'BOG iPay (ბარათით)', en: 'BOG iPay (Card)' },
  tbc_checkout: { ka: 'TBC Checkout (ბარათით)', en: 'TBC Checkout (Card)' },
  cash_on_delivery: { ka: 'ადგილზე გადახდა', en: 'Cash on Delivery' },
};

function buildEmailHtml(order: OrderEmailPayload): string {
  const payment = paymentLabels[order.paymentMethod] || { ka: order.paymentMethod, en: order.paymentMethod };

  const itemsHtml = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding:12px 16px;border-bottom:1px solid #f3f4f6;color:#374151;font-size:14px;">${item.product_name}</td>
        <td style="padding:12px 16px;border-bottom:1px solid #f3f4f6;color:#374151;font-size:14px;text-align:center;">${item.quantity}</td>
        <td style="padding:12px 16px;border-bottom:1px solid #f3f4f6;color:#374151;font-size:14px;text-align:right;">${item.total_price.toFixed(2)} GEL</td>
      </tr>`
    )
    .join('');

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#f5f7fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7fa;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#3b82f6 0%,#1e40af 100%);padding:40px 32px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:32px;font-weight:800;letter-spacing:-0.5px;">Carstu</h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">მანქანის აქსესუარები</p>
            </td>
          </tr>

          <!-- Success Icon -->
          <tr>
            <td align="center" style="padding:40px 32px 0;">
              <div style="width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,#10b981 0%,#059669 100%);display:inline-block;line-height:80px;text-align:center;box-shadow:0 8px 24px rgba(16,185,129,0.3);">
                <span style="color:#ffffff;font-size:40px;font-weight:bold;vertical-align:middle;">✓</span>
              </div>
            </td>
          </tr>

          <!-- Georgian Thank You -->
          <tr>
            <td style="padding:24px 40px 8px;text-align:center;">
              <h2 style="margin:0 0 8px;color:#111827;font-size:26px;font-weight:700;">მადლობა შეძენისთვის!</h2>
              <p style="margin:0;color:#4b5563;font-size:15px;line-height:1.6;">
                ${order.customerName}, მადლობას გიხდით რომ Carstu-ს ნდობა გამოგვიცხადეთ. თქვენი შეკვეთა მიღებულია და მალე დამუშავდება.
              </p>
            </td>
          </tr>

          <!-- Order Number -->
          <tr>
            <td align="center" style="padding:24px 40px;">
              <div style="display:inline-block;background:linear-gradient(135deg,#eff6ff,#dbeafe);border:2px solid #93c5fd;border-radius:12px;padding:14px 32px;">
                <p style="margin:0 0 4px;color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">შეკვეთის ნომერი / Order #</p>
                <p style="margin:0;color:#1e40af;font-size:20px;font-weight:800;letter-spacing:1px;">${order.orderNumber}</p>
              </div>
            </td>
          </tr>

          <!-- Items Table -->
          <tr>
            <td style="padding:0 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
                <tr style="background:#f9fafb;">
                  <td style="padding:12px 16px;color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">პროდუქტი</td>
                  <td style="padding:12px 16px;color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;text-align:center;">რაოდ.</td>
                  <td style="padding:12px 16px;color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;text-align:right;">ფასი</td>
                </tr>
                ${itemsHtml}
              </table>
            </td>
          </tr>

          <!-- Totals -->
          <tr>
            <td style="padding:20px 24px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:6px 16px;color:#6b7280;font-size:14px;">ნივთები / Subtotal</td>
                  <td style="padding:6px 16px;color:#374151;font-size:14px;text-align:right;">${order.subtotal.toFixed(2)} GEL</td>
                </tr>
                <tr>
                  <td style="padding:6px 16px;color:#6b7280;font-size:14px;">მიტანა / Delivery</td>
                  <td style="padding:6px 16px;color:#374151;font-size:14px;text-align:right;">${order.shippingCost.toFixed(2)} GEL</td>
                </tr>
                <tr>
                  <td colspan="2" style="padding:10px 16px 0;"><div style="height:1px;background:#e5e7eb;"></div></td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;color:#111827;font-size:18px;font-weight:700;">ჯამი / Total</td>
                  <td style="padding:12px 16px;color:#1e40af;font-size:18px;font-weight:800;text-align:right;">${order.total.toFixed(2)} GEL</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Delivery & Payment Info -->
          <tr>
            <td style="padding:24px 24px 0;">
              <div style="background:#f9fafb;border-radius:12px;padding:20px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:4px 0;color:#6b7280;font-size:13px;font-weight:600;width:120px;">მისამართი:</td>
                    <td style="padding:4px 0;color:#374151;font-size:13px;">${order.deliveryCity}, ${order.deliveryAddress}</td>
                  </tr>
                  <tr>
                    <td style="padding:4px 0;color:#6b7280;font-size:13px;font-weight:600;">გადახდა:</td>
                    <td style="padding:4px 0;color:#374151;font-size:13px;">${payment.ka} / ${payment.en}</td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- English Thank You -->
          <tr>
            <td style="padding:32px 40px 8px;text-align:center;">
              <div style="height:1px;background:#e5e7eb;margin-bottom:24px;"></div>
              <h2 style="margin:0 0 8px;color:#111827;font-size:22px;font-weight:700;">Thank you for your purchase!</h2>
              <p style="margin:0;color:#4b5563;font-size:14px;line-height:1.6;">
                Dear ${order.customerName}, thank you for choosing Carstu. Your order has been received and will be processed shortly.
              </p>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td align="center" style="padding:32px 40px;">
              <a href="https://carstu.store" style="display:inline-block;padding:14px 36px;background:linear-gradient(135deg,#3b82f6 0%,#1e40af 100%);color:#ffffff;text-decoration:none;border-radius:12px;font-size:15px;font-weight:600;box-shadow:0 4px 12px rgba(59,130,246,0.3);">
                Carstu.store-ზე დაბრუნება
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb;padding:24px 40px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0 0 8px;color:#6b7280;font-size:13px;font-weight:600;">Carstu</p>
              <p style="margin:0 0 8px;color:#9ca3af;font-size:12px;">
                შეკითხვების შემთხვევაში დაგვიკავშირდით / Contact us: info@carstu.store
              </p>
              <p style="margin:0;color:#9ca3af;font-size:11px;">
                &copy; 2026 Carstu. All rights reserved. &middot; <a href="https://carstu.store" style="color:#3b82f6;text-decoration:none;">carstu.store</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(request: NextRequest) {
  try {
    const body: OrderEmailPayload = await request.json();

    if (!body.customerEmail) {
      return NextResponse.json({ error: 'No customer email' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'mail.privateemail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const html = buildEmailHtml(body);

    await transporter.sendMail({
      from: `"Carstu" <${process.env.SMTP_USER || 'info@carstu.store'}>`,
      to: body.customerEmail,
      bcc: process.env.SMTP_USER || 'info@carstu.store',
      subject: `შეკვეთა #${body.orderNumber} მიღებულია · Order Confirmed · Carstu`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Failed to send order email:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
