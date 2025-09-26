const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

// POST /send-email
router.post('/', async (req, res) => {
    const { to, name, jobId, status } = req.body;  // Ensure you also send 'status' from frontend

    if (!to || !name || !jobId || !status) {
        return res.status(400).json({ message: 'Missing fields' });
    }

    try {
        // Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.USER, // HR official email
                pass: process.env.PASS, // App password (not your Gmail password)
            },
        });

        // HTML email content
        let subject, htmlContent;
        
        // Check status and set appropriate subject and message
        if (status === 'accepted') {
            subject = 'Congratulations! You have been selected 🎉';
            htmlContent = `
                <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                    <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 10px;">
                        <h2 style="color: #4CAF50;">Congratulations, ${name}!</h2>
                        <p>We are thrilled to inform you that you have been <strong>selected</strong> for the job you applied for (Job ID: <strong>${jobId}</strong>).</p>
                        <p>Our team was very impressed with your profile and interview.</p>
                        <p>Next steps will be shared with you soon. Please keep an eye on your email!</p>
                        <br/>
                        <p>Best Regards,</p>
                        <p style="color: #4CAF50;">Your Company HR Team</p>
                        <hr/>
                        <p style="font-size: 12px; color: #999;">This is an automated message. Please do not reply.</p>
                    </div>
                </div>
            `;
        } else if (status === 'rejected') {
            subject = 'Unfortunately, you have not been selected';
            htmlContent = `
                <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                    <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 10px;">
                        <h2 style="color: #FF5733;">Unfortunately, ${name}</h2>
                        <p>We regret to inform you that you have not been selected for the job you applied for (Job ID: <strong>${jobId}</strong>).</p>
                        <p>Although your profile was impressive, we have decided to move forward with other candidates at this time.</p>
                        <p>Thank you for your time and effort in applying. We encourage you to apply for future opportunities with us.</p>
                        <br/>
                        <p>Best Regards,</p>
                        <p style="color: #FF5733;">Your Company HR Team</p>
                        <hr/>
                        <p style="font-size: 12px; color: #999;">This is an automated message. Please do not reply.</p>
                    </div>
                </div>
            `;
        }  else if (status === 'waiting') {
            subject = 'Your application is on the waiting list';
            htmlContent = `
                <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                    <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 10px;">
                        <h2 style="color: #FFA500;">Update on your application, ${name}</h2>
                        <p>We wanted to inform you that your application for the job you applied for (Job ID: <strong>${jobId}</strong>) is currently on the <strong>waiting list</strong>.</p>
                        <p>Our team was impressed with your profile and will be reviewing it further as other candidates are considered. We will reach out to you if there are any further updates.</p>
                        <p>Thank you for your patience, and we appreciate your interest in our company!</p>
                        <br/>
                        <p>Best Regards,</p>
                        <p style="color: #FFA500;">Your Company HR Team</p>
                        <hr/>
                        <p style="font-size: 12px; color: #999;">This is an automated message. Please do not reply.</p>
                    </div>
                </div>
            `;
        } else {
            return res.status(400).json({ message: 'Invalid status' });
        }

        // Mail options
        const mailOptions = {
            from: '"Your Company HR" <yourcompanyhr@gmail.com>',
            to,
            subject,
            html: htmlContent,
        };

        // Send Email
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email' });
    }
});

module.exports = router;
