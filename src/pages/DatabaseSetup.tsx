import { Button } from "@/components/ui/enhanced-button";
import { Database, Package, Settings, Users } from "lucide-react";
import { useState } from "react";
import { databaseSchema, sampleProducts } from "@/lib/database-setup";

const DatabaseSetup = () => {
  const [setupStep, setSetupStep] = useState(0);

  const steps = [
    {
      title: "Set Up Database Tables",
      description: "Copy and run this SQL in your Supabase SQL Editor",
      code: databaseSchema,
      icon: Database
    },
    {
      title: "Add Sample Products",
      description: "Add sample products to populate your catalog",
      code: sampleProducts,
      icon: Package
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Settings className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Database <span className="gradient-text">Setup</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Follow these steps to set up your gym equipment catalog database in Supabase.
          </p>
        </div>

        <div className="space-y-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="glass-card p-8">
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/20 rounded-lg mr-4">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Step {index + 1}: {step.title}</h2>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>

                <div className="relative">
                  <pre className="bg-card/50 p-6 rounded-lg overflow-x-auto text-sm border border-border/50">
                    <code>{step.code}</code>
                  </pre>
                  <Button
                    variant="glass"
                    size="sm"
                    className="absolute top-4 right-4"
                    onClick={() => copyToClipboard(step.code)}
                  >
                    Copy SQL
                  </Button>
                </div>

                <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <h4 className="font-semibold text-primary mb-2">How to run this:</h4>
                  <ol className="text-sm text-muted-foreground space-y-1">
                    <li>1. Go to your Supabase project dashboard</li>
                    <li>2. Navigate to the SQL Editor</li>
                    <li>3. Paste the code above</li>
                    <li>4. Click "Run" to execute</li>
                  </ol>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="glass-card p-8 border border-green-500/20">
            <Users className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Next Steps</h3>
            <p className="text-muted-foreground mb-6">
              After running the SQL scripts, your database will be ready with sample data. 
              You can then manage your content directly in Supabase or build an admin interface.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="hero"
                onClick={() => window.open('https://supabase.com/dashboard', '_blank')}
              >
                Open Supabase Dashboard
              </Button>
              <Button 
                variant="glass"
                onClick={() => window.location.href = '/'}
              >
                View Your Website
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseSetup;