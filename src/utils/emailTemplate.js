const passwordResetTemplate = (user, resetCode) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: 'Roboto', sans-serif;
                background-color: #f9f5e3; /* Sandy beige background */
                margin: 0;
                padding: 0;
            }
            .email-container {
                max-width: 600px;
                margin: 40px auto;
                background-color: #ffffff;
                border-radius: 10px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                overflow: hidden;
                border: 2px solid #e0c097; /* Warm brown border */
            }
            .email-header {
                background-color: #d4883f; /* Sunset orange */
                color: #ffffff;
                text-align: center;
                padding: 30px;
            }
            .email-header img {
                width: 60px;
                height: 60px;
            }
            .email-body {
                padding: 20px;
                color: #5a4a35; /* Warm brown text */
            }
            .email-body p {
                margin-bottom: 20px;
                line-height: 1.6;
            }
            .reset-code {
                background-color: #fdf8e6; /* Light sand color */
                border-left: 5px solid #d4883f; /* Sunset orange accent */
                padding: 10px 20px;
                font-size: 20px;
                font-weight: bold;
                color: #5a4a35;
            }
            .email-footer {
                text-align: center;
                padding: 20px;
                background-color: #f2ede1; /* Light beige footer */
                font-size: 14px;
                color: #777777;
            }
            .email-footer a {
                color: #d4883f;
                text-decoration: none;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="email-header">
            <img src="https://res.cloudinary.com/dteulnfyy/image/upload/v1726864135/jgvtwcmsjli8rtygayph.png" alt="Silk Road Logo" style="width: 120px; height: 120px;">
                <h1>Password Reset Request</h1>
            </div>
            <div class="email-body">
                <p>Dear ${user.name},</p>
                <p>We received a request to reset the password for your Silk Road account.</p>
                <p class="reset-code">Reset Code: ${resetCode}</p>
                <p>Please enter this code on the password reset page to proceed. The code will expire shortly.</p>
                <p>If you did not request this reset, please contact our support team immediately.</p>
                <p>Best regards,<br>The Silk Road Team</p>
            </div>
            <div class="email-footer">
                <p>If you have any questions, feel free to <a href="mailto:support@silkroadapp.com">contact our support team</a>.</p>
            </div>
        </div>
    </body>
    </html>
`;

module.exports = passwordResetTemplate;
