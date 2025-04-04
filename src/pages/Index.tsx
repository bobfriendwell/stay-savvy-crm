import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.isLoggedIn) {
        navigate("/dashboard");
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/10 flex flex-col">
      <header className="container py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground rounded-xl p-1.5">
            <img 
              src="/lovable-uploads/0a2d2d46-ff14-4cc1-85bf-51c1b314de18.png" 
              alt="Stay Savvy Logo" 
              className="w-8 h-8"
            />
          </div>
          <span className="font-bold text-lg">Stay Savvy</span>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link to="/login">
            <Button>登入</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 container flex flex-col md:flex-row items-center justify-center gap-8 py-12">
        <div className="md:w-1/2 space-y-6 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            智能化旅館客戶管理<br />讓您留住每位賓客
          </h1>
          <p className="text-xl text-muted-foreground max-w-md">
            Stay Savvy 旅館 CRM 系統，提供最全面的賓客資料管理、互動紀錄追蹤與行銷工具。
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/login">
              <Button size="lg" className="ios-button w-full sm:w-auto">
                立即開始
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="ios-button-secondary w-full sm:w-auto">
              了解更多
            </Button>
          </div>
          <div className="flex gap-8 pt-8">
            <div>
              <p className="text-3xl font-bold">25+</p>
              <p className="text-sm text-muted-foreground">旅館合作夥伴</p>
            </div>
            <div>
              <p className="text-3xl font-bold">10K+</p>
              <p className="text-sm text-muted-foreground">賓客資料</p>
            </div>
            <div>
              <p className="text-3xl font-bold">95%</p>
              <p className="text-sm text-muted-foreground">客戶滿意度</p>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-teal/30 to-azure/30 transform -rotate-6 rounded-2xl blur-xl"></div>
            <div className="relative ios-card flex items-center justify-center p-8 h-80 backdrop-blur-md bg-card/70">
              <div className="text-center">
                <div className="text-6xl font-bold pb-4">Stay Savvy</div>
                <p className="text-xl">旅館客戶關係管理系統</p>
                <div className="pt-6 flex gap-4 justify-center">
                  <Badge className="px-3 py-1 bg-teal-light/20 text-teal">旅客資料</Badge>
                  <Badge className="px-3 py-1 bg-lavender-light/20 text-lavender">互動紀錄</Badge>
                  <Badge className="px-3 py-1 bg-azure-light/20 text-azure">行銷通知</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-8 border-t">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="bg-primary text-primary-foreground rounded-xl p-1">
              <img 
                src="/lovable-uploads/0a2d2d46-ff14-4cc1-85bf-51c1b314de18.png" 
                alt="Stay Savvy Logo" 
                className="w-6 h-6"
              />
            </div>
            <span className="text-sm font-medium">© 2025 Stay Savvy CRM powered by WR</span>
          </div>
          <div className="text-sm text-muted-foreground">
            旅館客戶關係管理系統 | 保留所有權利
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
