import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-7xl mx-auto">
        <Card>
            <CardHeader>
                <div className="flex items-center gap-3">
                    <Settings className="h-6 w-6" />
                    <CardTitle>Settings</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <p>This is where the user's settings would be configured.</p>
            </CardContent>
        </Card>
    </div>
  )
}
