'use client'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { publicService } from '@/lib/api/services/public.service';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  subject: z.string().optional(),
  phone: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
      subject: 'Message from Website',
      phone: '',
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);

    try {
      // 1. Submit to Backend API (Database)
      const backendResponse = await publicService.submitContactForm({
        ...data,
        category: 'general', // Default category for backend
      });

      if (!backendResponse.success) {
        throw new Error(backendResponse.message || 'Failed to sync with backend database');
      }

      // 2. Submit to Web3Forms (Email Notification)
      const web3FormsKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

      if (web3FormsKey) {
        const formData = new FormData();
        formData.append('access_key', web3FormsKey);
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('subject', data.subject || 'Message from Website');
        formData.append('message', data.message);
        formData.append('phone', data.phone || '');
        formData.append('from_name', 'AICOD Website Contact');

        const web3Response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData,
        });

        const web3Data = await web3Response.json();
        if (!web3Data.success) {
          console.warn('Web3Forms notification failed:', web3Data.message);
          // We don't throw here because backend submission succeeded
        }
      }

      toast({
        title: 'Success!',
        description: 'Your message has been sent successfully and recorded in our system. We\'ll get back to you soon!',
      });
      form.reset();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.data?.message || error.message || 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Please type your message here..." className="min-h-[150px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          // ADDED: bg-brand-orange text-white hover:bg-brand-orange/90
          className="w-full bg-brand-orange text-white hover:bg-brand-orange/90 transition-colors"
          disabled={isSubmitting}
        >
          {isSubmitting && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </Form>
  );
}