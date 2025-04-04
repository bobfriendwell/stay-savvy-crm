
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { 
  DownloadIcon, 
  FilterIcon, 
  SearchIcon, 
  PlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
  TagIcon,
  PhoneIcon,
  MailIcon,
  InstagramIcon,
  XIcon
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const mockGuests = [
  {
    id: 1,
    name: "王小明",
    nameEn: "Wang Xiao Ming",
    phone: "0912345678",
    email: "wang@example.com",
    line: "@wangxm",
    instagram: "wang_xm",
    source: "Booking.com",
    level: "銀卡",
    points: 3200,
    tags: ["常客", "商務旅客"],
    avatarSrc: "",
    notes: "喜歡安靜的房間，遠離電梯"
  },
  {
    id: 2,
    name: "林美玲",
    nameEn: "Lin Mei Ling",
    phone: "0923456789",
    email: "lin@example.com",
    line: "@linml",
    instagram: "lin_ml_travel",
    source: "官網",
    level: "金卡",
    points: 8500,
    tags: ["長住客", "喜歡寵物"],
    avatarSrc: "",
    notes: "經常攜帶小型犬入住，需要寵物友善房"
  },
  {
    id: 3,
    name: "James Smith",
    nameEn: "James Smith",
    phone: "+1 234 567 8901",
    email: "james@example.com",
    line: "@jamessmith",
    instagram: "james_world_travel",
    source: "Agoda",
    level: "一般",
    points: 750,
    tags: ["國際旅客"],
    avatarSrc: "",
    notes: "需要英文服務，喜歡當地美食推薦"
  },
  {
    id: 4,
    name: "陳大華",
    nameEn: "Chen Da Hua",
    phone: "0934567890",
    email: "chen@example.com",
    line: "@chendh",
    instagram: "chen_travel",
    source: "LINE@",
    level: "黑卡",
    points: 15000,
    tags: ["VIP", "喜歡升等"],
    avatarSrc: "",
    notes: "每次入住都希望升等至套房，願意支付差價"
  },
  {
    id: 5,
    name: "黃小琳",
    nameEn: "Huang Xiao Lin",
    phone: "0945678901",
    email: "huang@example.com",
    line: "@huangxl",
    instagram: "huang_foodie",
    source: "朋友推薦",
    level: "一般",
    points: 1200,
    tags: ["美食愛好者"],
    avatarSrc: "",
    notes: "對餐廳選擇有特別要求，經常詢問美食推薦"
  },
  {
    id: 6,
    name: "張建國",
    nameEn: "Zhang Jian Guo",
    phone: "0956789012",
    email: "zhang@example.com",
    line: "@zhangjg",
    instagram: "",
    source: "Walk-in",
    level: "銀卡",
    points: 2800,
    tags: ["隱私重視"],
    avatarSrc: "",
    notes: "不希望被打擾，拒絕客房服務"
  },
  {
    id: 7,
    name: "Maria Garcia",
    nameEn: "Maria Garcia",
    phone: "+34 612 345 678",
    email: "maria@example.com",
    line: "",
    instagram: "maria_g_travels",
    source: "Expedia",
    level: "一般",
    points: 500,
    tags: ["國際旅客", "蜜月旅行"],
    avatarSrc: "",
    notes: "蜜月旅行，需要特別佈置房間與香檳"
  }
];

const Guests = () => {
  const [search, setSearch] = useState("");
  const [filterLevel, setFilterLevel] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newGuest, setNewGuest] = useState({
    name: "",
    nameEn: "",
    phone: "",
    email: "",
    line: "",
    instagram: "",
    source: "官網",
    level: "一般",
    tags: "",
    notes: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewGuest(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewGuest(prev => ({ ...prev, [name]: value }));
  };

  const handleAddGuest = () => {
    // 在真實情況下，這裡會進行API調用來保存新旅客
    // 目前僅模擬成功提示
    toast.success(`成功新增旅客：${newGuest.name}`);
    setNewGuest({
      name: "",
      nameEn: "",
      phone: "",
      email: "",
      line: "",
      instagram: "",
      source: "官網",
      level: "一般",
      tags: "",
      notes: ""
    });
    setIsDialogOpen(false);
  };

  const filteredGuests = mockGuests.filter(guest => {
    const matchSearch = search === "" || 
      guest.name.toLowerCase().includes(search.toLowerCase()) || 
      guest.nameEn.toLowerCase().includes(search.toLowerCase()) ||
      guest.phone.includes(search) ||
      guest.email.toLowerCase().includes(search.toLowerCase());
    
    const matchLevel = filterLevel === "all" || guest.level === filterLevel;
    
    return matchSearch && matchLevel;
  });

  const getLevelBadgeClass = (level: string) => {
    switch(level) {
      case "黑卡": return "bg-black text-white border-black";
      case "金卡": return "bg-amber-100 text-amber-800 border-amber-200";
      case "銀卡": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-background";
    }
  };

  return (
    <div className="container py-6 space-y-6 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">旅客管理 Guests</h1>
        <p className="text-muted-foreground">
          管理所有旅客資料，查看旅客詳細資訊，並追蹤互動紀錄。
        </p>
      </div>
      
      <Card className="ios-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="搜尋旅客姓名、電話或Email..." 
                className="pl-9 ios-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterLevel} onValueChange={setFilterLevel}>
                <SelectTrigger className="ios-input min-w-[160px]">
                  <div className="flex items-center gap-2">
                    <FilterIcon className="h-4 w-4" />
                    <SelectValue placeholder="會員等級" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部等級</SelectItem>
                  <SelectItem value="黑卡">黑卡</SelectItem>
                  <SelectItem value="金卡">金卡</SelectItem>
                  <SelectItem value="銀卡">銀卡</SelectItem>
                  <SelectItem value="一般">一般</SelectItem>
                </SelectContent>
              </Select>
              
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="ios-button gap-2">
                    <PlusIcon className="h-4 w-4" />
                    新增旅客
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                  <DialogHeader>
                    <DialogTitle>新增旅客</DialogTitle>
                    <DialogDescription>
                      填寫下列資料以新增旅客資訊到系統中
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">中文姓名</Label>
                        <Input
                          id="name"
                          name="name"
                          value={newGuest.name}
                          onChange={handleInputChange}
                          placeholder="如：王小明"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nameEn">英文姓名</Label>
                        <Input
                          id="nameEn"
                          name="nameEn"
                          value={newGuest.nameEn}
                          onChange={handleInputChange}
                          placeholder="如：Wang Xiao Ming"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">電話</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={newGuest.phone}
                          onChange={handleInputChange}
                          placeholder="如：0912345678"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={newGuest.email}
                          onChange={handleInputChange}
                          placeholder="如：example@mail.com"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="line">LINE ID</Label>
                        <Input
                          id="line"
                          name="line"
                          value={newGuest.line}
                          onChange={handleInputChange}
                          placeholder="如：@userid"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="instagram">Instagram</Label>
                        <Input
                          id="instagram"
                          name="instagram"
                          value={newGuest.instagram}
                          onChange={handleInputChange}
                          placeholder="如：username"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="source">來源平台</Label>
                        <Select 
                          value={newGuest.source} 
                          onValueChange={(value) => handleSelectChange("source", value)}
                        >
                          <SelectTrigger id="source">
                            <SelectValue placeholder="選擇來源" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="官網">官網</SelectItem>
                            <SelectItem value="Booking.com">Booking.com</SelectItem>
                            <SelectItem value="Agoda">Agoda</SelectItem>
                            <SelectItem value="Expedia">Expedia</SelectItem>
                            <SelectItem value="LINE@">LINE@</SelectItem>
                            <SelectItem value="Walk-in">Walk-in</SelectItem>
                            <SelectItem value="朋友推薦">朋友推薦</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="level">會員等級</Label>
                        <Select 
                          value={newGuest.level} 
                          onValueChange={(value) => handleSelectChange("level", value)}
                        >
                          <SelectTrigger id="level">
                            <SelectValue placeholder="選擇等級" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="一般">一般</SelectItem>
                            <SelectItem value="銀卡">銀卡</SelectItem>
                            <SelectItem value="金卡">金卡</SelectItem>
                            <SelectItem value="黑卡">黑卡</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="tags">標籤（以逗號分隔）</Label>
                      <Input
                        id="tags"
                        name="tags"
                        value={newGuest.tags}
                        onChange={handleInputChange}
                        placeholder="如：常客,商務旅客"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="notes">備註</Label>
                      <Input
                        id="notes"
                        name="notes"
                        value={newGuest.notes}
                        onChange={handleInputChange}
                        placeholder="如：喜歡安靜的房間"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>取消</Button>
                    <Button onClick={handleAddGuest}>新增</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Button variant="outline" className="ios-button-secondary w-10 p-0 md:w-auto md:px-3">
                <DownloadIcon className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">匯出</span>
              </Button>
            </div>
          </div>
          
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">旅客姓名</TableHead>
                  <TableHead>聯絡方式</TableHead>
                  <TableHead>來源平台</TableHead>
                  <TableHead>會員資訊</TableHead>
                  <TableHead>標籤</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGuests.map((guest) => (
                  <TableRow key={guest.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={guest.avatarSrc || "/placeholder.svg"} alt={guest.name} />
                          <AvatarFallback>{guest.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{guest.name}</div>
                          <div className="text-xs text-muted-foreground">{guest.nameEn}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center">
                          <PhoneIcon className="mr-2 h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{guest.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <MailIcon className="mr-2 h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{guest.email}</span>
                        </div>
                        {guest.instagram && (
                          <div className="flex items-center">
                            <InstagramIcon className="mr-2 h-3 w-3 text-muted-foreground" />
                            <span className="text-sm">{guest.instagram}</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="inline-block py-1 px-2 bg-muted rounded-md text-sm">
                        {guest.source}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <Badge variant="outline" className={getLevelBadgeClass(guest.level)}>
                          {guest.level}
                        </Badge>
                        <div className="flex items-center text-sm">
                          <StarIcon className="mr-1 h-3 w-3 text-amber-500" />
                          <span>{guest.points} 點</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {guest.tags.map((tag, i) => (
                          <div key={i} className="ios-tag bg-primary/10 text-primary flex items-center">
                            <TagIcon className="mr-1 h-3 w-3" />
                            {tag}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline">
                        查看詳情
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              顯示 {filteredGuests.length} 筆，共 {mockGuests.length} 筆資料
            </div>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="h-8 w-8">1</Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Guests;
