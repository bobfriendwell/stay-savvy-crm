
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { 
  CalendarIcon, 
  DownloadIcon, 
  LineChartIcon, 
  BarChart3Icon,
  PieChartIcon,
  GlobeIcon,
  UsersIcon,
  BedDoubleIcon,
  CreditCardIcon,
  TrendingUpIcon,
  FilterIcon
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";

// Mock data for charts
const monthlyBookings = [
  { name: '1月', bookings: 40, revenue: 120000 },
  { name: '2月', bookings: 30, revenue: 90000 },
  { name: '3月', bookings: 45, revenue: 135000 },
  { name: '4月', bookings: 55, revenue: 165000 },
  { name: '5月', bookings: 65, revenue: 195000 },
  { name: '6月', bookings: 75, revenue: 225000 },
  { name: '7月', bookings: 80, revenue: 240000 },
  { name: '8月', bookings: 90, revenue: 270000 },
  { name: '9月', bookings: 70, revenue: 210000 },
  { name: '10月', bookings: 60, revenue: 180000 },
  { name: '11月', bookings: 55, revenue: 165000 },
  { name: '12月', bookings: 70, revenue: 210000 },
];

const guestSourceData = [
  { name: 'Booking.com', value: 35 },
  { name: 'Agoda', value: 25 },
  { name: '官網', value: 20 },
  { name: 'Expedia', value: 10 },
  { name: '其他', value: 10 },
];

const guestTypeData = [
  { name: '商務旅客', value: 40 },
  { name: '觀光旅客', value: 35 },
  { name: '長住客', value: 15 },
  { name: '其他', value: 10 },
];

const guestRegionData = [
  { id: 'TW', value: 40 },
  { id: 'CN', value: 15 },
  { id: 'JP', value: 12 },
  { id: 'US', value: 8 },
  { id: 'HK', value: 7 },
  { id: 'KR', value: 6 },
  { id: 'SG', value: 4 },
  { id: 'GB', value: 3 },
  { id: 'AU', value: 3 },
  { id: 'OTHER', value: 2 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const Reports = () => {
  const [dateRange, setDateRange] = useState("year");
  const [reportType, setReportType] = useState("overview");

  return (
    <div className="container py-6 space-y-6 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">報表分析 Reports</h1>
        <p className="text-muted-foreground">
          查看關鍵績效指標、各種統計圖表及詳細分析資料。
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <Tabs defaultValue="overview" className="flex-1" onValueChange={setReportType}>
          <TabsList className="grid grid-cols-3 md:grid-cols-5 w-full">
            <TabsTrigger value="overview">總覽</TabsTrigger>
            <TabsTrigger value="guests">旅客分析</TabsTrigger>
            <TabsTrigger value="bookings">訂房分析</TabsTrigger>
            <TabsTrigger value="revenue">營收分析</TabsTrigger>
            <TabsTrigger value="geo">地區分布</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[160px]">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                <SelectValue placeholder="選擇時間範圍" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">本週</SelectItem>
              <SelectItem value="month">本月</SelectItem>
              <SelectItem value="quarter">本季</SelectItem>
              <SelectItem value="year">本年</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <FilterIcon className="h-4 w-4" />
            篩選
          </Button>
          <Button variant="outline" className="gap-2">
            <DownloadIcon className="h-4 w-4" />
            匯出
          </Button>
        </div>
      </div>

      {/* 總覽分頁 */}
      <TabsContent value="overview" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">總旅客數</CardTitle>
              <UsersIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4,325</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+5.2%</span> 較上期
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">總訂房數</CardTitle>
              <BedDoubleIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6,782</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+3.7%</span> 較上期
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">總營收</CardTitle>
              <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2,045,762</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+8.2%</span> 較上期
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">平均住宿天數</CardTitle>
              <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.8</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+0.3</span> 較上期
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>月度訂房數</CardTitle>
              <CardDescription>本年度各月訂房數量統計</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyBookings}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} 筆`, '訂房數']} />
                  <Legend />
                  <Bar dataKey="bookings" fill="#8884d8" name="訂房數" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>月度營收</CardTitle>
              <CardDescription>本年度各月營收統計</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={monthlyBookings}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '營收']} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#82ca9d" name="營收" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>旅客來源分布</CardTitle>
              <CardDescription>依訂房平台統計</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={guestSourceData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {guestSourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>旅客類型分布</CardTitle>
              <CardDescription>依旅客類型統計</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={guestTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {guestTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>旅客地區分布</CardTitle>
            <CardDescription>依旅客國籍統計</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px] flex justify-center items-center">
            <div className="w-full h-full flex flex-col items-center justify-center">
              <GlobeIcon className="h-24 w-24 text-muted-foreground mb-4" />
              <p className="text-lg font-medium">互動式世界地圖</p>
              <p className="text-sm text-muted-foreground max-w-md text-center mt-2">
                此區域將顯示根據旅客來源地區的互動式世界地圖，顯示全球旅客分布情況。
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8 w-full max-w-2xl">
                {guestRegionData.slice(0, 5).map((region, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="text-lg font-bold">{region.value}%</div>
                    <div className="text-sm text-muted-foreground">{region.id}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* 其他分頁的佔位區，實際實現時會添加更多詳細內容 */}
      <TabsContent value="guests" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>旅客詳細分析</CardTitle>
            <CardDescription>各類旅客數據詳細分析</CardDescription>
          </CardHeader>
          <CardContent>
            <p>此區域將顯示更詳細的旅客分析數據</p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="bookings" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>訂房詳細分析</CardTitle>
            <CardDescription>訂房數據及趨勢詳細分析</CardDescription>
          </CardHeader>
          <CardContent>
            <p>此區域將顯示更詳細的訂房分析數據</p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="revenue" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>營收詳細分析</CardTitle>
            <CardDescription>營收數據及趨勢詳細分析</CardDescription>
          </CardHeader>
          <CardContent>
            <p>此區域將顯示更詳細的營收分析數據</p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="geo" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>地區分布詳細分析</CardTitle>
            <CardDescription>旅客地區分布詳細資料</CardDescription>
          </CardHeader>
          <CardContent>
            <p>此區域將顯示更詳細的地區分析數據，結合Google地理數據</p>
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  );
};

export default Reports;
