import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="max-w-7xl mx-auto">
        <Card>
            <CardHeader>
                <div className="flex items-center gap-3">
                    <User className="h-6 w-6" />
                    <CardTitle>Profile</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <p>This is where the user's profile information would be displayed.</p>
            </CardContent>
        </Card>
    </div>
  )
}
