
import React from 'react';
import Layout from '@/components/Layout';
import BlueCollarDashboard from '@/components/BlueCollarDashboard';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { testSupabaseConnection, logTestResults, type SupabaseTestResults } from '@/utils/testSupabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Dashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [testResults, setTestResults] = React.useState<SupabaseTestResults | null>(null);
  const [testingConnection, setTestingConnection] = React.useState(false);
  
  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          setIsAuthenticated(false);
          navigate('/auth');
          return;
        }
        
        // Check if user has an employer profile
        const { data: employerProfile, error } = await supabase
          .from('employer_profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        if (error || !employerProfile) {
          toast({
            title: "Please complete your employer profile",
            description: "You need to set up your employer profile to access the dashboard",
            variant: "destructive"
          });
          navigate('/profile');
          return;
        }
        
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [navigate, toast]);

  const runConnectionTest = async () => {
    setTestingConnection(true);
    try {
      const results = await testSupabaseConnection();
      logTestResults(results);
      setTestResults(results);
      toast({
        title: results.connection && results.database ? "✅ Supabase is working!" : "❌ Supabase connection issues",
        description: results.errors.length > 0 ? results.errors[0] : "All tests passed",
        variant: results.connection && results.database ? "default" : "destructive"
      });
    } catch (error) {
      console.error('Test error:', error);
      toast({
        title: "Test failed",
        description: "Could not run connection test",
        variant: "destructive"
      });
    } finally {
      setTestingConnection(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-12 flex justify-center items-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-lg">Loading dashboard...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="container py-12">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Sign In Required</h1>
            <p className="mb-6">You need to sign in to access the employer dashboard.</p>
            <Button onClick={() => navigate('/auth')}>
              Sign In
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-6 space-y-6">
        {/* Supabase Connection Test Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Supabase Connection Status</CardTitle>
                <CardDescription>Test your Supabase connection and database access</CardDescription>
              </div>
              <Button 
                onClick={runConnectionTest} 
                disabled={testingConnection}
                variant="outline"
              >
                {testingConnection ? 'Testing...' : 'Test Connection'}
              </Button>
            </div>
          </CardHeader>
          {testResults && (
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="font-medium">Connection: </span>
                    <Badge variant={testResults.connection ? "default" : "destructive"}>
                      {testResults.connection ? "✅ Connected" : "❌ Failed"}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium">Auth: </span>
                    <Badge variant={testResults.auth ? "default" : "destructive"}>
                      {testResults.auth ? "✅ Working" : "❌ Failed"}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium">Database: </span>
                    <Badge variant={testResults.database ? "default" : "destructive"}>
                      {testResults.database ? "✅ Working" : "❌ Failed"}
                    </Badge>
                  </div>
                </div>
                
                {testResults.tables.length > 0 && (
                  <div>
                    <span className="font-medium">Accessible Tables: </span>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {testResults.tables.map((table: string) => (
                        <Badge key={table} variant="secondary">{table}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {testResults.errors.length > 0 && (
                  <div>
                    <span className="font-medium text-destructive">Errors: </span>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      {testResults.errors.map((error: string, index: number) => (
                        <li key={index} className="text-sm text-destructive">{error}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          )}
        </Card>
        
        <BlueCollarDashboard />
      </div>
    </Layout>
  );
};

export default Dashboard;
