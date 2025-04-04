
import { LoginForm } from "@/components/auth/LoginForm";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/10 flex flex-col">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary text-primary-foreground rounded-xl p-3">
              <img 
                src="/lovable-uploads/0a2d2d46-ff14-4cc1-85bf-51c1b314de18.png" 
                alt="Stay Savvy Logo" 
                className="w-12 h-12"
              />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2">Stay Savvy</h1>
          <p className="text-muted-foreground">旅館客戶關係管理系統</p>
        </div>
        
        <div className="ios-card backdrop-blur bg-card/80 w-full max-w-md animate-scale-in">
          <LoginForm />
        </div>
      </div>
      
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>© 2025 Stay Savvy CRM powered by WR</p>
      </footer>
    </div>
  );
};

export default Login;
