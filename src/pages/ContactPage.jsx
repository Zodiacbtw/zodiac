import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="flex flex-col space-y-10 md:space-y-16">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase text-blue-600 tracking-wider">Get in Touch</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
          Contact Us
        </h1>
        <p className="mt-4 max-w-2xl text-base text-gray-600 lg:mx-auto">
          We'd love to hear from you! Whether you have a question about our products, features, pricing, or anything else, our team is ready to answer all your questions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-sm">
          <Mail size={32} className="text-blue-600 mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Email Us</h3>
          <p className="text-sm text-gray-600 mb-2">Our support team will get back to you within 24 hours.</p>
          <a href="mailto:hello@example.com" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            hello@zodiac.com
          </a>
        </div>

        <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-sm">
          <Phone size={32} className="text-blue-600 mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Call Us</h3>
          <p className="text-sm text-gray-600 mb-2">Mon-Fri from 8am to 5pm.</p>
          <a href="tel:+1234567890" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            +1 (234) 567-890
          </a>
        </div>

        <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-sm md:col-span-2 lg:col-span-1">
          <MapPin size={32} className="text-blue-600 mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Visit Us</h3>
          <p className="text-sm text-gray-600">
            123 Fashion Street, Style City, SC 45678
          </p>
        </div>
      </div>

      <div className="bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center md:text-left">Send Us a Message</h2>
        <form action="#" method="POST" className="space-y-6">
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
            <div>
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                First name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5"
                />
              </div>
            </div>
            <div>
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Last name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5"
                />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5"
              />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium leading-6 text-gray-900">
              Message
            </label>
            <div className="mt-1">
              <textarea
                id="message"
                name="message"
                rows={4}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5"
                defaultValue={''}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 gap-2"
            >
              Send Message
              <Send size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;