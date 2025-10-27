import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";

export default function ProfilePage() {
  const user = {
    name: 'Satoshi Nakamoto',
    email: 'satoshi@gmx.com',
    accountNumber: 'XXXX-XXXX-XX42',
    phone: '+91 98765 43210',
    initials: 'SN',
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
        <Card className="shadow-lg">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <User className="h-6 w-6" />
                    <CardTitle>Personal Information</CardTitle>
                </div>
                <CardDescription>View and manage your personal details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${user.name}`} />
                        <AvatarFallback>{user.initials}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                        <h2 className="text-2xl font-bold">{user.name}</h2>
                        <p className="text-muted-foreground">{user.email}</p>
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue={user.name} readOnly />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" defaultValue={user.email} readOnly />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="accountNumber">Account Number</Label>
                        <Input id="accountNumber" defaultValue={user.accountNumber} readOnly />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" defaultValue={user.phone} readOnly />
                    </div>
                </div>
                <div className="flex justify-end">
                    <Button disabled>Edit Profile</Button>
                </div>
            </CardContent>
        </Card>
    </div>
  )
}
