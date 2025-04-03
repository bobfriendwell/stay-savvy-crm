
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  username: z.string().min(3, {
    message: "使用者名稱至少需要 3 個字元。",
  }),
  password: z.string().min(6, {
    message: "密碼至少需要 6 個字元。",
  }),
  role: z.enum(["frontdesk", "admin"]),
});

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      role: "frontdesk",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem("user", JSON.stringify({
        name: values.username,
        role: values.role,
        isLoggedIn: true
      }));
      
      toast({
        title: "登入成功！",
        description: "歡迎回來，" + values.username,
      });
      
      navigate("/dashboard");
    }, 1500);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full max-w-sm">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">登入系統</h1>
          <p className="text-muted-foreground">輸入您的帳號密碼進入 Stay Savvy CRM</p>
        </div>
        
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex justify-between">
                <span>使用者名稱</span>
                <span className="text-xs text-muted-foreground">Username</span>
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="輸入使用者名稱" 
                  className="ios-input" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex justify-between">
                <span>密碼</span>
                <span className="text-xs text-muted-foreground">Password</span>
              </FormLabel>
              <FormControl>
                <Input 
                  type="password" 
                  placeholder="輸入密碼" 
                  className="ios-input" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex justify-between">
                <span>角色</span>
                <span className="text-xs text-muted-foreground">Role</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="ios-input">
                    <SelectValue placeholder="選擇角色" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="frontdesk">
                    <div className="flex justify-between w-full">
                      <span>櫃台人員</span>
                      <span className="text-xs text-muted-foreground">Front Desk</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="admin">
                    <div className="flex justify-between w-full">
                      <span>管理者</span>
                      <span className="text-xs text-muted-foreground">Admin</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full ios-button" disabled={isLoading}>
          {isLoading ? "登入中..." : "登入"}
        </Button>
      </form>
    </Form>
  );
}
