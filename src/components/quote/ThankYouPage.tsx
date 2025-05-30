
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ThankYouPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 text-center">
        <div className="mb-6">
          <img src="/lovable-uploads/ffc1c08f-f4cb-4b31-a4c8-d80f99d0d75b.png" alt="TrueQuote" className="h-12 mx-auto mb-4" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h1>
        <p className="text-gray-600 mb-6">
          We'll contact you shortly with your personalized quotes from top insurance providers.
        </p>
        <Button 
          onClick={() => window.location.reload()} 
          className="w-full bg-[#467FCE] hover:bg-[#3a6bb8] text-white"
        >
          Get Another Quote
        </Button>
      </Card>
    </div>
  );
};

export default ThankYouPage;
