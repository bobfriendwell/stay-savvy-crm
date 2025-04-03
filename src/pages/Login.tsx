
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6h.01" />
                <path d="M7 2h11a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-2" />
                <path d="M12.5 16 11 17.5c-.5.5-1.5.8-2.4.6a2 2 0 0 1-1.6-1.6c-.2-.9.1-1.9.6-2.4L9 12.5" />
                <path d="M13 8.4c.5-.5 1.5-.8 2.4-.6a2 2 0 0 1 1.6 1.6c.2.9-.1 1.9-.6 2.4" />
                <path d="m9 12.5-1.5 1.5" />
                <path d="M12.5 9 14 7.5" />
                <path d="M3 15h3v5H3z" />
              </svg>
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
        <p>© 2023 Stay Savvy CRM. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Login;
