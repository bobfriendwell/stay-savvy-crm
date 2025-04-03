
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  CalendarIcon, 
  UsersIcon, 
  BellIcon, 
  TrendingUpIcon,
  HotelIcon,
  UserIcon,
  TagIcon,
  AlertTriangleIcon
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface UserType {
  name: string;
  role: "admin" | "frontdesk";
  isLoggedIn: boolean;
}

const Dashboard = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check authentication
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/");
    }
    setLoading(false);
  }, [navigate]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  const todayCheckins = 12;
  const todayCheckouts = 8;
  const pendingTasks = 5;
  const occupancyRate = 78;

  const recentGuests = [
    { id: 1, name: "王小明", nameEn: "Wang Xiao Ming", room: "301", status: "已入住", checkIn: "2023-06-20", checkOut: "2023-06-25", source: "Booking.com", level: "銀卡" },
    { id: 2, name: "林美玲", nameEn: "Lin Mei Ling", room: "412", status: "即將入住", checkIn: "2023-06-21", checkOut: "2023-06-24", source: "官網", level: "金卡" },
    { id: 3, name: "James Smith", nameEn: "James Smith", room: "205", status: "已入住", checkIn: "2023-06-19", checkOut: "2023-06-23", source: "Agoda", level: "一般" },
    { id: 4, name: "陳大華", nameEn: "Chen Da Hua", room: "118", status: "即將退房", checkIn: "2023-06-17", checkOut: "2023-06-21", source: "LINE@", level: "黑卡" }
  ];

  return (
    <div className="container py-6 space-y-6 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">儀表板 Dashboard</h1>
        <p className="text-muted-foreground">
          歡迎回來，{user.name}。以下是今日旅館概況。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="ios-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex justify-between">
              <span>今日入住</span>
              <span className="text-xs text-muted-foreground">Check-ins</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-3xl font-bold">{todayCheckins}</div>
              <div className="bg-teal-light/20 text-teal p-2 rounded-full">
                <HotelIcon className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <p className="text-xs text-muted-foreground">較昨日 +2</p>
          </CardFooter>
        </Card>

        <Card className="ios-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex justify-between">
              <span>今日退房</span>
              <span className="text-xs text-muted-foreground">Check-outs</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-3xl font-bold">{todayCheckouts}</div>
              <div className="bg-azure-light/20 text-azure p-2 rounded-full">
                <CalendarIcon className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <p className="text-xs text-muted-foreground">較昨日 -1</p>
          </CardFooter>
        </Card>

        <Card className="ios-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex justify-between">
              <span>入住率</span>
              <span className="text-xs text-muted-foreground">Occupancy</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-3xl font-bold">{occupancyRate}%</div>
              <div className="bg-lavender-light/20 text-lavender p-2 rounded-full">
                <TrendingUpIcon className="h-5 w-5" />
              </div>
            </div>
            <Progress value={occupancyRate} className="mt-2 h-2" />
          </CardContent>
          <CardFooter className="pt-0">
            <p className="text-xs text-muted-foreground">較上週 +5%</p>
          </CardFooter>
        </Card>

        <Card className="ios-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex justify-between">
              <span>待處理事項</span>
              <span className="text-xs text-muted-foreground">Tasks</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-3xl font-bold">{pendingTasks}</div>
              <div className="bg-latte-light/20 text-latte-dark p-2 rounded-full">
                <BellIcon className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="ghost" size="sm" className="text-xs p-0 h-auto">
              查看全部
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="ios-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex justify-between">
              <span>最近入住旅客</span>
              <span className="text-sm text-muted-foreground">Recent Guests</span>
            </CardTitle>
            <CardDescription>今日和明日的入住與退房旅客</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-2 px-3 text-sm font-medium text-muted-foreground">旅客姓名</th>
                    <th className="py-2 px-3 text-sm font-medium text-muted-foreground">房號</th>
                    <th className="py-2 px-3 text-sm font-medium text-muted-foreground">狀態</th>
                    <th className="py-2 px-3 text-sm font-medium text-muted-foreground hidden md:table-cell">來源</th>
                    <th className="py-2 px-3 text-sm font-medium text-muted-foreground hidden md:table-cell">等級</th>
                  </tr>
                </thead>
                <tbody>
                  {recentGuests.map((guest) => (
                    <tr key={guest.id} className="border-b last:border-0">
                      <td className="py-3 px-3">
                        <div className="flex flex-col">
                          <span className="font-medium">{guest.name}</span>
                          <span className="text-xs text-muted-foreground">{guest.nameEn}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3">{guest.room}</td>
                      <td className="py-3 px-3">
                        <Badge variant={
                          guest.status === "已入住" ? "default" : 
                          guest.status === "即將入住" ? "outline" :
                          "secondary"
                        }>
                          {guest.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-3 hidden md:table-cell">
                        <span className="text-sm">{guest.source}</span>
                      </td>
                      <td className="py-3 px-3 hidden md:table-cell">
                        <Badge variant="outline" className={
                          guest.level === "黑卡" ? "bg-black text-white border-black" :
                          guest.level === "金卡" ? "bg-amber-100 text-amber-800 border-amber-200" :
                          guest.level === "銀卡" ? "bg-gray-100 text-gray-800 border-gray-200" :
                          "bg-background"
                        }>
                          {guest.level}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">查看所有旅客</Button>
            <Button size="sm">建立新旅客</Button>
          </CardFooter>
        </Card>

        <Card className="ios-card">
          <CardHeader>
            <CardTitle className="flex justify-between">
              <span>快速工具</span>
              <span className="text-sm text-muted-foreground">Tools</span>
            </CardTitle>
            <CardDescription>常用功能快速入口</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start mb-2" variant="outline">
              <UserIcon className="mr-2 h-4 w-4" />
              <span>新增旅客</span>
              <span className="ml-auto text-xs text-muted-foreground">New Guest</span>
            </Button>
            <Button className="w-full justify-start mb-2" variant="outline">
              <HotelIcon className="mr-2 h-4 w-4" />
              <span>登記入住</span>
              <span className="ml-auto text-xs text-muted-foreground">Check In</span>
            </Button>
            <Button className="w-full justify-start mb-2" variant="outline">
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span>登記退房</span>
              <span className="ml-auto text-xs text-muted-foreground">Check Out</span>
            </Button>
            <Button className="w-full justify-start mb-2" variant="outline">
              <TagIcon className="mr-2 h-4 w-4" />
              <span>管理標籤</span>
              <span className="ml-auto text-xs text-muted-foreground">Tags</span>
            </Button>
            <Button className="w-full justify-start mb-2" variant="outline">
              <BellIcon className="mr-2 h-4 w-4" />
              <span>行銷推播</span>
              <span className="ml-auto text-xs text-muted-foreground">Marketing</span>
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <AlertTriangleIcon className="mr-2 h-4 w-4" />
              <span>客訴處理</span>
              <span className="ml-auto text-xs text-muted-foreground">Complaints</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
