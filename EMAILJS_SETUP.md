# EmailJS Setup Guide for Contact Form

## 🚀 Quick Setup (5 minutes)

### Step 1: Create EmailJS Account
1. Go to [https://dashboard.emailjs.com/sign-up](https://dashboard.emailjs.com/sign-up)
2. Sign up with your email and create a free account
3. Verify your email address

### Step 2: Add Email Service
1. In your dashboard, go to **"Email Services"** tab
2. Click **"Add New Service"**
3. Choose your email provider (Gmail, Outlook, Yahoo, etc.)
4. Connect your email account and grant permissions
5. **Copy the Service ID** (you'll need this later)

### Step 3: Create Email Template
1. Go to **"Email Templates"** tab
2. Click **"Create New Template"**
3. Use this template structure:

**Subject:**
```
New Contact Form Message from {{from_name}}
```

**HTML Body:**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>New Contact Form Submission</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
            📧 New Contact Form Submission
        </h2>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #2c3e50;">👤 Contact Details</h3>
            <p><strong>Name:</strong> {{from_name}}</p>
            <p><strong>Email:</strong> {{from_email}}</p>
            <p><strong>Subject:</strong> {{subject}}</p>
        </div>

        <div style="background: #ffffff; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #2c3e50;">💬 Message</h3>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; white-space: pre-wrap;">
                {{message}}
            </div>
        </div>

        <div style="background: #e8f4fd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3498db;">
            <h4 style="margin-top: 0; color: #2c3e50;">📊 Additional Information</h4>
            <p><strong>Submitted:</strong> {{timestamp}}</p>
            <p><strong>Source:</strong> Backend Developer Portfolio</p>
            <p><strong>Reply to:</strong> {{from_email}}</p>
        </div>

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef;">
            <p style="color: #666; font-size: 14px;">
                This message was sent from your portfolio contact form.
            </p>
        </div>
    </div>
</body>
</html>
```

4. **Copy the Template ID** (you'll need this later)

### Step 4: Get Your Public Key
1. Go to **"Account"** tab in your dashboard
2. **Copy the Public Key** (you'll need this later)

### Step 5: Configure Environment Variables
1. Open the `.env.local` file in your project root
2. Replace the placeholder values:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_actual_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_actual_template_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_actual_public_key_here
```

### Step 6: Test Your Setup
1. Start your development server: `npm run dev`
2. Go to your contact form
3. Fill out and submit the form
4. Check your email for the test message

## 🎯 Features

✅ **Professional Email Delivery** - No more browser redirects!
✅ **Beautiful HTML Templates** - Professional-looking emails
✅ **Form Validation** - Client-side validation with helpful error messages
✅ **Error Handling** - Graceful error handling with user-friendly messages
✅ **Rate Limiting** - Built-in protection against spam
✅ **Free Tier** - 200 emails/month free
✅ **Auto-Reply** - Can set up automatic responses to users

## 🔧 Troubleshooting

### "Email service is not configured" error
- Check that all environment variables are set correctly
- Make sure you're using the correct Service ID, Template ID, and Public Key
- Verify your EmailJS account is active

### Emails not being received
- Check your spam/junk folder
- Verify your email service is properly connected in EmailJS dashboard
- Make sure your email provider isn't blocking the emails

### Template variables not working
- Double-check variable names in your template (case-sensitive)
- Ensure variables match exactly: `{{from_name}}`, `{{from_email}}`, etc.

## 📧 Email Template Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{from_name}}` | Sender's name | John Doe |
| `{{from_email}}` | Sender's email | john@example.com |
| `{{subject}}` | Message subject | Project Inquiry |
| `{{message}}` | Message content | Hello, I'm interested... |
| `{{timestamp}}` | Submission time | 12/25/2024, 2:30 PM |

## 🚀 Advanced Features

### Auto-Reply Setup
1. Create a second template for auto-replies
2. Set up auto-reply in your EmailJS dashboard
3. Users will receive confirmation emails automatically

### Custom Styling
Modify the HTML template to match your brand colors and styling.

### Analytics
View email delivery statistics in your EmailJS dashboard.

---

**Need help?** Check the [EmailJS Documentation](https://www.emailjs.com/docs/) or contact their support.