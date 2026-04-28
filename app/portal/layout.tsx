import { TopNav } from "@/components/portal/top-nav"
import { AuthProvider } from "@/contexts/auth-context"

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#f5f7fa]">
        <TopNav />
        <main>
          {children}
        </main>
      </div>
    </AuthProvider>
  )
}
