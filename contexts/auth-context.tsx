"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface UserRole {
  id: string
  name: string
  label: string
}

interface Tenant {
  id: string
  name: string
  code: string
}

interface User {
  id: string
  name: string
  avatar: string
  roles: UserRole[]
  currentRole: UserRole
  tenant: Tenant
}

interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  availableTenants: Tenant[]
  login: (username: string, password: string, tenantId: string) => Promise<boolean>
  logout: () => void
  switchRole: (roleId: string) => void
}

const mockTenants: Tenant[] = [
  { id: "1", name: "知与大学", code: "QHDX" },
  { id: "2", name: "北京大学", code: "BJDX" },
  { id: "3", name: "复旦大学", code: "FDDX" },
]

const mockRoles: UserRole[] = [
  { id: "teacher", name: "teacher", label: "教职工" },
  { id: "student", name: "student", label: "学生" },
  { id: "enterprise", name: "enterprise", label: "企业人员" },
  { id: "admin", name: "admin", label: "系统管理员" },
]

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const storedUser = localStorage.getItem("portal_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        localStorage.removeItem("portal_user")
      }
    }
  }, [])

  const login = async (username: string, password: string, tenantId: string): Promise<boolean> => {
    if (username && password && tenantId) {
      const selectedTenant = mockTenants.find(t => t.id === tenantId) || mockTenants[0]
      const newUser: User = {
        id: "1",
        name: username === "admin" ? "张老师" : username,
        avatar: username.charAt(0).toUpperCase(),
        roles: mockRoles,
        currentRole: mockRoles[0],
        tenant: selectedTenant,
      }
      setUser(newUser)
      localStorage.setItem("portal_user", JSON.stringify(newUser))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("portal_user")
  }

  const switchRole = (roleId: string) => {
    if (user) {
      const newRole = user.roles.find(r => r.id === roleId)
      if (newRole) {
        const updatedUser = { ...user, currentRole: newRole }
        setUser(updatedUser)
        localStorage.setItem("portal_user", JSON.stringify(updatedUser))
      }
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoggedIn: !!user, 
      availableTenants: mockTenants,
      login, 
      logout,
      switchRole 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
