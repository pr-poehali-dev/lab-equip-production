"""Отправка запроса коммерческого предложения на почту mail@paratus.ru — v3"""
import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    try:
        body = json.loads(event.get("body") or "{}")
    except Exception:
        return {"statusCode": 400, "headers": cors, "body": json.dumps({"error": "Invalid JSON"})}

    org      = body.get("org", "").strip()
    name     = body.get("name", "").strip()
    phone    = body.get("phone", "").strip()
    email    = body.get("email", "").strip()
    message  = body.get("message", "").strip()
    product  = body.get("product", "").strip()

    if not name or not (phone or email):
        return {
            "statusCode": 400,
            "headers": cors,
            "body": json.dumps({"error": "Укажите имя и телефон или email"}),
        }

    smtp_host = os.environ.get("SMTP_HOST", "")
    smtp_port = int(os.environ.get("SMTP_PORT", "465"))
    smtp_user = os.environ.get("SMTP_USER", "")
    smtp_pass = os.environ.get("SMTP_PASSWORD", "")
    to_email  = "mail@paratus.ru"

    subject = f"Запрос КП — {product or 'Общий запрос'} — {org or name}"

    html_body = f"""
    <html><body style="font-family: Arial, sans-serif; color: #1a2a3a; background: #f4f6f8; padding: 0; margin: 0;">
    <div style="max-width:600px; margin:32px auto; background:#fff; border-top:4px solid #1a9ec0;">
      <div style="padding:32px 36px;">
        <h2 style="margin:0 0 4px; font-size:22px; color:#0d1520;">Новый запрос КП</h2>
        <p style="margin:0 0 24px; color:#7a8fa6; font-size:13px;">Получен с сайта ЛабПроф</p>

        {"<div style='background:#f0f8fb; border-left:3px solid #1a9ec0; padding:10px 16px; margin-bottom:24px;'><p style='margin:0; font-size:13px; color:#1a2a3a;'><b>Продукт:</b> " + product + "</p></div>" if product else ""}

        <table style="width:100%; border-collapse:collapse; font-size:14px;">
          <tr style="border-bottom:1px solid #e8edf3;">
            <td style="padding:10px 0; color:#7a8fa6; width:140px;">Организация</td>
            <td style="padding:10px 0; font-weight:600;">{org or "—"}</td>
          </tr>
          <tr style="border-bottom:1px solid #e8edf3;">
            <td style="padding:10px 0; color:#7a8fa6;">Контактное лицо</td>
            <td style="padding:10px 0; font-weight:600;">{name}</td>
          </tr>
          <tr style="border-bottom:1px solid #e8edf3;">
            <td style="padding:10px 0; color:#7a8fa6;">Телефон</td>
            <td style="padding:10px 0;">{phone or "—"}</td>
          </tr>
          <tr style="border-bottom:1px solid #e8edf3;">
            <td style="padding:10px 0; color:#7a8fa6;">Email</td>
            <td style="padding:10px 0;">{email or "—"}</td>
          </tr>
          {"<tr><td style='padding:10px 0; color:#7a8fa6; vertical-align:top;'>Вопрос</td><td style='padding:10px 0;'>" + message.replace('\n','<br>') + "</td></tr>" if message else ""}
        </table>
      </div>
      <div style="padding:16px 36px; background:#f4f6f8; font-size:12px; color:#9fb3c8;">
        Письмо отправлено автоматически с сайта. Не отвечайте на это письмо.
      </div>
    </div>
    </body></html>
    """

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"]    = smtp_user
    msg["To"]      = to_email
    if email:
        msg["Reply-To"] = email
    msg.attach(MIMEText(html_body, "html", "utf-8"))

    try:
        if smtp_port == 465:
            with smtplib.SMTP_SSL(smtp_host, smtp_port, timeout=10) as server:
                server.login(smtp_user, smtp_pass)
                server.sendmail(smtp_user, [to_email], msg.as_string())
        else:
            with smtplib.SMTP(smtp_host, smtp_port, timeout=10) as server:
                server.starttls()
                server.login(smtp_user, smtp_pass)
                server.sendmail(smtp_user, [to_email], msg.as_string())
    except Exception as e:
        return {
            "statusCode": 500,
            "headers": cors,
            "body": json.dumps({"error": f"Ошибка отправки: {str(e)}"}),
        }

    return {
        "statusCode": 200,
        "headers": cors,
        "body": json.dumps({"ok": True, "message": "Запрос отправлен"}),
    }