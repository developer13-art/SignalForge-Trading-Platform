import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { MailIcon, PhoneIcon, GlobeIcon } from '../../components/ui/icons';
import toast from 'react-hot-toast';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message is required'),
});

type ContactForm = z.infer<typeof contactSchema>;

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    try {
      // In production, send to API endpoint
      await new Promise(r => setTimeout(r, 1000));
      toast.success('Message sent. We will get back to you soon.');
      reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Contact Us</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            We would love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {[
              { icon: MailIcon, label: 'Email', value: 'hello@signalforge.ai' },
              { icon: PhoneIcon, label: 'Phone', value: '+1 (555) 123-4567' },
              { icon: GlobeIcon, label: 'Website', value: 'www.signalforge.ai' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="card p-6 flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center shrink-0">
                    <Icon size={24} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
                    <p className="text-base font-medium text-gray-900 dark:text-white">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="card p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input label="Name" error={errors.name?.message} {...register('name')} />
              <Input label="Email" type="email" error={errors.email?.message} {...register('email')} />
              <Input label="Subject" error={errors.subject?.message} {...register('subject')} />
              <Textarea label="Message" error={errors.message?.message} rows={5} {...register('message')} />
              <Button type="submit" isLoading={isSubmitting} className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}