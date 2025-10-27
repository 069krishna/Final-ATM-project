'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Bell, Brush, Shield } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Settings</h1>
      <Accordion type="single" collapsible defaultValue="appearance" className="w-full">
        <AccordionItem value="appearance">
          <AccordionTrigger>
            <div className="flex items-center gap-3">
              <Brush className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Appearance</h2>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardHeader>
                <CardTitle>Theme</CardTitle>
                <CardDescription>Select your preferred theme for the application.</CardDescription>
              </CardHeader>
              <CardContent>
                <ThemeSwitcher />
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="notifications">
          <AccordionTrigger>
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Notifications</h2>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive notifications from us.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <Label htmlFor="email-notifications" className="font-medium">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive updates and alerts via email.</p>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <Label htmlFor="sms-notifications" className="font-medium">SMS Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get critical alerts on your mobile.</p>
                  </div>
                  <Switch id="sms-notifications" />
                </div>
                 <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <Label htmlFor="push-notifications" className="font-medium">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get real-time updates on your device.</p>
                  </div>
                  <Switch id="push-notifications" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="security">
          <AccordionTrigger>
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Security</h2>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
                <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Manage your account&apos;s security settings.</CardDescription>
                </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                      <h4 className="font-medium">Change Password</h4>
                      <p className="text-sm text-muted-foreground">It&apos;s a good idea to use a strong password.</p>
                  </div>
                  <Button variant="outline">Change</Button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <Label htmlFor="2fa" className="font-medium">Two-Factor Authentication (2FA)</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
                  </div>
                  <Switch id="2fa" />
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
