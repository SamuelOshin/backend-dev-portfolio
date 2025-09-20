#!/usr/bin/env node

/**
 * EmailJS Setup Test Script
 *
 * This script helps you verify that your EmailJS configuration is working correctly.
 * Run this after setting up your EmailJS account and environment variables.
 *
 * Usage: node test-emailjs.js
 */

const emailjs = require('@emailjs/browser');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

console.log('🚀 Testing EmailJS Configuration...\n');

// Check if environment variables are set
const checkEnvVars = () => {
  console.log('📋 Checking Environment Variables:');
  console.log(`   Service ID: ${SERVICE_ID ? '✅ Set' : '❌ Missing'}`);
  console.log(`   Template ID: ${TEMPLATE_ID ? '✅ Set' : '❌ Missing'}`);
  console.log(`   Public Key: ${PUBLIC_KEY ? '✅ Set' : '❌ Missing'}\n`);

  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.log('❌ Missing environment variables!');
    console.log('   Please check your .env.local file and ensure all EmailJS credentials are set.\n');
    console.log('   Expected format:');
    console.log('   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id');
    console.log('   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id');
    console.log('   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key\n');
    return false;
  }
  return true;
};

// Test EmailJS connection
const testEmailJS = async () => {
  console.log('📧 Testing EmailJS Connection...');

  try {
    // Initialize EmailJS
    emailjs.init({
      publicKey: PUBLIC_KEY,
    });

    // Test template parameters
    const templateParams = {
      from_name: 'EmailJS Test',
      from_email: 'test@example.com',
      subject: 'EmailJS Configuration Test',
      message: 'This is a test email to verify your EmailJS setup is working correctly.',
      timestamp: new Date().toLocaleString()
    };

    console.log('   Sending test email...');

    // Send test email
    const result = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams
    );

    if (result.status === 200) {
      console.log('✅ Email sent successfully!');
      console.log(`   Status: ${result.status}`);
      console.log(`   Message ID: ${result.text}\n`);
      console.log('🎉 Your EmailJS setup is working correctly!');
      console.log('   Check your email inbox for the test message.\n');
    } else {
      console.log('❌ Unexpected response status:', result.status);
      console.log('   Response:', result.text);
    }

  } catch (error) {
    console.log('❌ EmailJS Error:', error.message);

    if (error.message.includes('service_id')) {
      console.log('   → Check your Service ID in EmailJS dashboard');
    } else if (error.message.includes('template_id')) {
      console.log('   → Check your Template ID in EmailJS dashboard');
    } else if (error.message.includes('public_key')) {
      console.log('   → Check your Public Key in EmailJS account settings');
    } else if (error.message.includes('rate limit')) {
      console.log('   → You\'ve exceeded EmailJS rate limits. Try again later.');
    } else {
      console.log('   → Check your EmailJS dashboard for service status');
    }
    console.log('');
  }
};

// Main test function
const runTests = async () => {
  console.log('='.repeat(50));
  console.log('🧪 EmailJS Configuration Test');
  console.log('='.repeat(50));
  console.log('');

  const envVarsOk = checkEnvVars();

  if (!envVarsOk) {
    console.log('🔧 Fix the environment variables and run this test again.');
    console.log('📖 See EMAILJS_SETUP.md for detailed setup instructions.');
    process.exit(1);
  }

  await testEmailJS();

  console.log('='.repeat(50));
  console.log('📝 Next Steps:');
  console.log('   1. Start your dev server: npm run dev');
  console.log('   2. Test the contact form on your portfolio');
  console.log('   3. Check your email for form submissions');
  console.log('='.repeat(50));
};

// Handle script execution
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { runTests, checkEnvVars, testEmailJS };