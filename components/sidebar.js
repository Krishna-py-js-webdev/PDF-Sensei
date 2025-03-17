import { FileText, Home, LogOut, NotebookText, Settings, User2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"

export function Sidebar() {
  return (
    <SidebarComponent>
      <SidebarHeader className="border-b pb-4">
        <Link href="/" className="flex items-center gap-2 px-2">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-UCSE6cF6VP2r1CvXTMllnNHgJtyR0U.png"
            alt="Logo"
            className="h-8 w-8"
          />
          <span className="text-xl font-bold text-emerald-500">PDFSENSEI</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/personalization">
                <User2 className="h-4 w-4" />
                <span>Personalization</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/settings">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarGroup>
          <SidebarGroupLabel>Generated Flash Cards</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <NotebookText className="h-4 w-4" />
                  <span>Module 1 CST.pdf</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <NotebookText className="h-4 w-4" />
                  <span>Chess_Analysis.pdf</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Previous Chats</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <FileText className="h-4 w-4" />
                  <span>Modern Applications of AI.pdf</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <FileText className="h-4 w-4" />
                  <span>Chess_Analysis.pdf</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <FileText className="h-4 w-4" />
                  <span>Stats&prob.pdf</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4 space-y-4">
        <Button className="w-full" variant="outline">
          Add PDF
        </Button>
        <Button className="w-full" variant="ghost">
          <LogOut className="h-4 w-4 mr-2" />
          Log out
        </Button>
      </SidebarFooter>
    </SidebarComponent>
  )
}