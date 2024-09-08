const passwordResetTemplate = (user, resetCode) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .email-container {
                max-width: 600px;
                margin: 40px auto;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            .email-header {
                background-color: #1a73e8;
                color: #ffffff;
                text-align: center;
                padding: 20px;
            }
            .email-body {
                padding: 20px;
                color: #333333;
            }
            .email-body p {
                margin-bottom: 20px;
                line-height: 1.6;
            }
            .reset-code {
                background-color: #f1f1f1;
                border-left: 5px solid #1a73e8;
                padding: 10px 20px;
                font-size: 18px;
                font-weight: bold;
                color: #333333;
            }
            .email-footer {
                text-align: center;
                padding: 20px;
                background-color: #f1f1f1;
                font-size: 14px;
                color: #777777;
            }
            .email-footer a {
                color: #1a73e8;
                text-decoration: none;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="email-header">
                <h1>Password Reset Request</h1>
            </div>
            <div class="email-body">
                <p>Dear ${user.name},</p>
                <p>We received a request to reset the password for your AUTHCUARD account.</p>
                <p class="reset-code">Reset Code: ${resetCode}</p>
                <p>Please enter this code on the password reset page to proceed. For security purposes, the code will expire shortly.</p>
                <p>If you did not request this reset, contact our support team immediately.</p>
                <p>Thank you for your prompt attention.</p>
                <p>Best regards,<br>The DEVLANT Team</p>
            </div>
            <div class="email-footer">
                <p>If you have any questions, feel free to <a href="mailto:support@devlant.com">contact our support team</a>.</p>
            </div>
        </div>
    </body>
    </html>
`;

module.exports = passwordResetTemplate;
