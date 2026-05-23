import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface StatusEmailPayload {
  customerEmail: string;
  customerName: string;
  orderNumber: string;
  status: 'shipped' | 'delivered';
}

function buildShippedEmail(name: string, orderNumber: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f5f7fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7fa;padding:40px 20px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#3b82f6 0%,#1e40af 100%);padding:32px;text-align:center;">
            <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:800;">Carstu</h1>
          </td>
        </tr>

        <!-- Icon -->
        <tr>
          <td align="center" style="padding:40px 32px 0;">
            <div style="width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);display:inline-block;line-height:80px;text-align:center;box-shadow:0 8px 24px rgba(245,158,11,0.3);">
              <span style="color:#ffffff;font-size:36px;vertical-align:middle;">🚚</span>
            </div>
          </td>
        </tr>

        <!-- Georgian -->
        <tr>
          <td style="padding:24px 40px 8px;text-align:center;">
            <h2 style="margin:0 0 8px;color:#111827;font-size:24px;font-weight:700;">თქვენი შეკვეთა გზაშია!</h2>
            <p style="margin:0;color:#4b5563;font-size:15px;line-height:1.6;">
              ${name}, თქვენი შეკვეთა <strong>#${orderNumber}</strong> კურიერმა აიღო და უკვე გზაშია. მალე მიიღებთ!
            </p>
          </td>
        </tr>

        <!-- Order Number -->
        <tr>
          <td align="center" style="padding:24px 40px;">
            <div style="display:inline-block;background:linear-gradient(135deg,#fefce8,#fef3c7);border:2px solid #fcd34d;border-radius:12px;padding:14px 32px;">
              <p style="margin:0 0 4px;color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">შეკვეთის ნომერი / Order #</p>
              <p style="margin:0;color:#b45309;font-size:20px;font-weight:800;letter-spacing:1px;">${orderNumber}</p>
            </div>
          </td>
        </tr>

        <!-- Steps -->
        <tr>
          <td style="padding:0 40px 24px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center" width="25%">
                  <div style="width:36px;height:36px;border-radius:50%;background:#10b981;display:inline-block;line-height:36px;color:#fff;font-size:14px;font-weight:700;">✓</div>
                  <p style="margin:6px 0 0;color:#10b981;font-size:11px;font-weight:600;">მიღებულია</p>
                </td>
                <td align="center" width="25%">
                  <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#f59e0b,#d97706);display:inline-block;line-height:36px;color:#fff;font-size:14px;font-weight:700;">2</div>
                  <p style="margin:6px 0 0;color:#d97706;font-size:11px;font-weight:700;">გზაშია</p>
                </td>
                <td align="center" width="25%">
                  <div style="width:36px;height:36px;border-radius:50%;background:#e5e7eb;display:inline-block;line-height:36px;color:#9ca3af;font-size:14px;font-weight:700;">3</div>
                  <p style="margin:6px 0 0;color:#9ca3af;font-size:11px;">ჩაბარებული</p>
                </td>
                <td align="center" width="25%">
                  <div style="width:36px;height:36px;border-radius:50%;background:#e5e7eb;display:inline-block;line-height:36px;color:#9ca3af;font-size:14px;font-weight:700;">4</div>
                  <p style="margin:6px 0 0;color:#9ca3af;font-size:11px;">დასრულებული</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- English -->
        <tr>
          <td style="padding:0 40px 8px;text-align:center;">
            <div style="height:1px;background:#e5e7eb;margin-bottom:24px;"></div>
            <h2 style="margin:0 0 8px;color:#111827;font-size:20px;font-weight:700;">Your order is on its way!</h2>
            <p style="margin:0;color:#4b5563;font-size:14px;line-height:1.6;">
              Dear ${name}, your order <strong>#${orderNumber}</strong> has been picked up by our courier and is on its way to you!
            </p>
          </td>
        </tr>

        <!-- CTA -->
        <tr>
          <td align="center" style="padding:32px 40px;">
            <a href="https://carstu.store/orders" style="display:inline-block;padding:14px 36px;background:linear-gradient(135deg,#3b82f6 0%,#1e40af 100%);color:#ffffff;text-decoration:none;border-radius:12px;font-size:15px;font-weight:600;box-shadow:0 4px 12px rgba(59,130,246,0.3);">
              შეკვეთის ნახვა / View Order
            </a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb;padding:24px 40px;text-align:center;border-top:1px solid #e5e7eb;">
            <p style="margin:0 0 8px;color:#6b7280;font-size:13px;font-weight:600;">Carstu</p>
            <p style="margin:0;color:#9ca3af;font-size:12px;">info@carstu.store</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body></html>`;
}

function buildDeliveredEmail(name: string, orderNumber: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f5f7fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7fa;padding:40px 20px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#3b82f6 0%,#1e40af 100%);padding:32px;text-align:center;">
            <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:800;">Carstu</h1>
          </td>
        </tr>

        <!-- Icon -->
        <tr>
          <td align="center" style="padding:40px 32px 0;">
            <div style="width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,#10b981 0%,#059669 100%);display:inline-block;line-height:80px;text-align:center;box-shadow:0 8px 24px rgba(16,185,129,0.3);">
              <span style="color:#ffffff;font-size:36px;vertical-align:middle;">📦</span>
            </div>
          </td>
        </tr>

        <!-- Georgian -->
        <tr>
          <td style="padding:24px 40px 8px;text-align:center;">
            <h2 style="margin:0 0 8px;color:#111827;font-size:24px;font-weight:700;">შეკვეთა ჩაბარებულია!</h2>
            <p style="margin:0;color:#4b5563;font-size:15px;line-height:1.6;">
              ${name}, თქვენი შეკვეთა <strong>#${orderNumber}</strong> წარმატებით ჩაბარდა! მადლობა რომ Carstu-ს ენდეთ. ვიმედოვნებთ ისევ გვეწვევით! 💚
            </p>
          </td>
        </tr>

        <!-- Order Number -->
        <tr>
          <td align="center" style="padding:24px 40px;">
            <div style="display:inline-block;background:linear-gradient(135deg,#ecfdf5,#d1fae5);border:2px solid #6ee7b7;border-radius:12px;padding:14px 32px;">
              <p style="margin:0 0 4px;color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">შეკვეთის ნომერი / Order #</p>
              <p style="margin:0;color:#059669;font-size:20px;font-weight:800;letter-spacing:1px;">${orderNumber}</p>
            </div>
          </td>
        </tr>

        <!-- Steps -->
        <tr>
          <td style="padding:0 40px 24px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center" width="25%">
                  <div style="width:36px;height:36px;border-radius:50%;background:#10b981;display:inline-block;line-height:36px;color:#fff;font-size:14px;font-weight:700;">✓</div>
                  <p style="margin:6px 0 0;color:#10b981;font-size:11px;font-weight:600;">მიღებულია</p>
                </td>
                <td align="center" width="25%">
                  <div style="width:36px;height:36px;border-radius:50%;background:#10b981;display:inline-block;line-height:36px;color:#fff;font-size:14px;font-weight:700;">✓</div>
                  <p style="margin:6px 0 0;color:#10b981;font-size:11px;font-weight:600;">გზაშია</p>
                </td>
                <td align="center" width="25%">
                  <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#10b981,#059669);display:inline-block;line-height:36px;color:#fff;font-size:14px;font-weight:700;">✓</div>
                  <p style="margin:6px 0 0;color:#059669;font-size:11px;font-weight:700;">ჩაბარებული</p>
                </td>
                <td align="center" width="25%">
                  <div style="width:36px;height:36px;border-radius:50%;background:#e5e7eb;display:inline-block;line-height:36px;color:#9ca3af;font-size:14px;font-weight:700;">4</div>
                  <p style="margin:6px 0 0;color:#9ca3af;font-size:11px;">დასრულებული</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- English -->
        <tr>
          <td style="padding:0 40px 8px;text-align:center;">
            <div style="height:1px;background:#e5e7eb;margin-bottom:24px;"></div>
            <h2 style="margin:0 0 8px;color:#111827;font-size:20px;font-weight:700;">Your order has been delivered!</h2>
            <p style="margin:0;color:#4b5563;font-size:14px;line-height:1.6;">
              Dear ${name}, your order <strong>#${orderNumber}</strong> has been successfully delivered! Thank you for choosing Carstu. We hope to see you again! 💚
            </p>
          </td>
        </tr>

        <!-- CTA -->
        <tr>
          <td align="center" style="padding:32px 40px;">
            <a href="https://carstu.store" style="display:inline-block;padding:14px 36px;background:linear-gradient(135deg,#3b82f6 0%,#1e40af 100%);color:#ffffff;text-decoration:none;border-radius:12px;font-size:15px;font-weight:600;box-shadow:0 4px 12px rgba(59,130,246,0.3);">
              კიდევ შეიძინე / Shop Again
            </a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb;padding:24px 40px;text-align:center;border-top:1px solid #e5e7eb;">
            <p style="margin:0 0 8px;color:#6b7280;font-size:13px;font-weight:600;">Carstu</p>
            <p style="margin:0;color:#9ca3af;font-size:12px;">info@carstu.store</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body></html>`;
}

export async function POST(request: NextRequest) {
  try {
    const body: StatusEmailPayload = await request.json();

    if (!body.customerEmail || !body.status) {
      return NextResponse.json({ error: 'Missing email or status' }, { status: 400 });
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

    const html = body.status === 'shipped'
      ? buildShippedEmail(body.customerName, body.orderNumber)
      : buildDeliveredEmail(body.customerName, body.orderNumber);

    const subject = body.status === 'shipped'
      ? `შეკვეთა #${body.orderNumber} გზაშია · Order Shipped · Carstu`
      : `შეკვეთა #${body.orderNumber} ჩაბარებულია · Order Delivered · Carstu`;

    await transporter.sendMail({
      from: `"Carstu" <${process.env.SMTP_USER || 'info@carstu.store'}>`,
      to: body.customerEmail,
      bcc: process.env.SMTP_USER || 'info@carstu.store',
      subject,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Failed to send status email:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
