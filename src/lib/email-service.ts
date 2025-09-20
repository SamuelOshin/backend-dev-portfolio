// EmailJS service for handling contact form submissions
interface EmailServiceConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

class EmailService {
  private config: EmailServiceConfig;

  constructor() {
    this.config = {
      serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
      templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
      publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''
    };
  }

  /**
   * Initialize EmailJS with public key
   */
  private async initializeEmailJS(): Promise<void> {
    const { default: emailjs } = await import('@emailjs/browser');
    emailjs.init({
      publicKey: this.config.publicKey,
    });
  }

  /**
   * Send contact form email
   */
  async sendContactForm(formData: ContactFormData): Promise<{ success: boolean; message: string }> {
    try {
      // Initialize EmailJS
      await this.initializeEmailJS();

      // Dynamic import to avoid SSR issues
      const { default: emailjs } = await import('@emailjs/browser');

      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'samuelt.oshin@gmail.com',
        reply_to: formData.email,
        timestamp: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        user_agent: typeof window !== 'undefined' ? window.navigator.userAgent : 'Server-side',
        source: 'Backend Developer Portfolio Contact Form'
      };

      // Send email
      const response = await emailjs.send(
        this.config.serviceId,
        this.config.templateId,
        templateParams
      );

      if (response.status === 200) {
        return {
          success: true,
          message: 'Message sent successfully! I\'ll get back to you within 24 hours.'
        };
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Email service error:', error);

      // Provide user-friendly error messages
      let errorMessage = 'Failed to send message. Please try again or contact me directly at samuelt.oshin@gmail.com';

      if (error instanceof Error) {
        if (error.message.includes('rate limit')) {
          errorMessage = 'Too many requests. Please wait a moment and try again.';
        } else if (error.message.includes('network')) {
          errorMessage = 'Network error. Please check your connection and try again.';
        }
      }

      return {
        success: false,
        message: errorMessage
      };
    }
  }

  /**
   * Validate form data before sending
   */
  validateFormData(formData: ContactFormData): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Name validation
    if (!formData.name?.trim()) {
      errors.push('Name is required');
    } else if (formData.name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long');
    } else if (formData.name.trim().length > 100) {
      errors.push('Name must be less than 100 characters');
    }

    // Email validation
    if (!formData.email?.trim()) {
      errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.push('Please enter a valid email address');
    }

    // Subject validation
    if (!formData.subject?.trim()) {
      errors.push('Subject is required');
    } else if (formData.subject.trim().length < 5) {
      errors.push('Subject must be at least 5 characters long');
    } else if (formData.subject.trim().length > 200) {
      errors.push('Subject must be less than 200 characters');
    }

    // Message validation
    if (!formData.message?.trim()) {
      errors.push('Message is required');
    } else if (formData.message.trim().length < 10) {
      errors.push('Message must be at least 10 characters long');
    } else if (formData.message.trim().length > 2000) {
      errors.push('Message must be less than 2000 characters');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Sanitize form data to prevent XSS and ensure data integrity
   */
  sanitizeFormData(formData: ContactFormData): ContactFormData {
    return {
      name: this.sanitizeString(formData.name, 100),
      email: this.sanitizeString(formData.email?.toLowerCase(), 100),
      subject: this.sanitizeString(formData.subject, 200),
      message: this.sanitizeString(formData.message, 2000)
    };
  }

  /**
   * Basic string sanitization
   */
  private sanitizeString(str: string | undefined, maxLength: number): string {
    if (!str) return '';

    return str
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim()
      .substring(0, maxLength);
  }

  /**
   * Check if EmailJS is properly configured
   */
  isConfigured(): boolean {
    return !!(this.config.serviceId && this.config.templateId && this.config.publicKey);
  }

  /**
   * Get configuration status for debugging
   */
  getConfigStatus(): { serviceId: boolean; templateId: boolean; publicKey: boolean } {
    return {
      serviceId: !!this.config.serviceId,
      templateId: !!this.config.templateId,
      publicKey: !!this.config.publicKey
    };
  }
}

// Export singleton instance
export default new EmailService();
export type { EmailServiceConfig };