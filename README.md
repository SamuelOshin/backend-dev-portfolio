This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Backend Developer Portfolio

A modern, responsive portfolio website showcasing backend development skills, projects, and contact information. Built with Next.js 15, TypeScript, and Tailwind CSS.

### Features

- 🚀 **Next.js 15** with App Router and TypeScript
- 🎨 **Modern UI** with Tailwind CSS and Framer Motion animations
- 📧 **Professional Contact Form** with EmailJS integration
- 📱 **Responsive Design** optimized for all devices
- ⚡ **Fast Performance** with optimized fonts and images
- 🎯 **SEO Optimized** with proper meta tags and structure

### Contact Form Setup

This portfolio includes a professional contact form that sends emails directly without redirecting users to external apps. To set up the email functionality:

1. **Follow the complete setup guide**: [EMAILJS_SETUP.md](./EMAILJS_SETUP.md)
2. **Configure your EmailJS account** (5-minute setup)
3. **Add your credentials** to `.env.local`
4. **Test the contact form** to ensure emails are delivered

The contact form provides:
- ✅ Client-side validation with helpful error messages
- ✅ Professional email delivery (no browser redirects!)
- ✅ Beautiful HTML email templates
- ✅ Comprehensive error handling
- ✅ Rate limiting protection

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Environment Setup

Create a `.env.local` file in the root directory and add your EmailJS credentials:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

See [EMAILJS_SETUP.md](./EMAILJS_SETUP.md) for detailed setup instructions.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout component
│   ├── page.tsx           # Main portfolio page
│   ├── globals.css        # Global styles
│   └── components/
│       ├── ui/            # Reusable UI components
│       └── ErrorReporter.tsx
├── lib/
│   └── utils.ts           # Utility functions
└── hooks/
    └── use-mobile.ts      # Mobile detection hook
```

## Technologies Used

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Email Service**: EmailJS
- **Icons**: Lucide React
- **Forms**: React Hook Form with validation
- **Deployment**: Vercel (recommended)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
