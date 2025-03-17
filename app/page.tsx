import { MainChat } from "@/components/main-chat"
import { AppSidebar } from "@/components/app-sidebar"

export default function Home() {
  return (
    <div className="flex w-full h-screen bg-background">
      <AppSidebar />
      <MainChat />
    </div>
  )
}