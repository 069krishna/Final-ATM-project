'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";
import { useState } from "react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: 'Satoshi Nakamoto',
    email: 'satoshi@gmx.com',
    accountNumber: 'XXXX-XXXX-XX42',
    phone: '+91 98765 43210',
    initials: 'SN',
  });
  const [tempUser, setTempUser] = useState(user);

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      setUser(tempUser);
    } else {
      // Start editing
      setTempUser(user);
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setTempUser(user);
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setTempUser(prev => ({ ...prev, [id]: value }));
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
                        <Input id="name" value={tempUser.name} onChange={handleInputChange} readOnly={!isEditing} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" value={tempUser.email} readOnly />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="accountNumber">Account Number</Label>
                        <Input id="accountNumber" value={tempUser.accountNumber} readOnly />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" value={tempUser.phone} onChange={handleInputChange} readOnly={!isEditing} />
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    {isEditing && (
                        <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                    )}
                    <Button onClick={handleEditToggle}>
                        {isEditing ? 'Save Changes' : 'Edit Profile'}
                    </Button>
                </div>
            </CardContent>
        </Card>
    </div>
  )
}
