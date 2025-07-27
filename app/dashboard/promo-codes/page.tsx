"use client"

import { useEffect, useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { apiClient } from "@/lib/api"
import { Plus, Edit, Trash2, Copy, CheckCircle, XCircle, Gift } from "lucide-react"

interface PromoCode {
  id: number
  code: string
  bonusValue: number
  usageLimit: number
  usedCount: number
  active: boolean
  createdAt: string
  expiresAt?: string
}

export default function PromoCodesPage() {
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newPromoCode, setNewPromoCode] = useState({
    code: "",
    bonusValue: 10,
    usageLimit: 100,
    expiresAt: ""
  })

  useEffect(() => {
    loadPromoCodes()
  }, [])

  const loadPromoCodes = async () => {
    try {
      setLoading(true)
      const data = await apiClient.getPromoCodes()
      setPromoCodes(data.promoCodes || [])
      

    } catch (err: any) {
      console.error("Error loading promo codes:", err)
      setError(err.message || "Failed to load promo codes")
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePromoCode = async () => {
    try {
      // Format data exactly as specified in the API documentation
      const promoCodeData = {
        code: newPromoCode.code,
        bonusValue: newPromoCode.bonusValue,
        usageLimit: newPromoCode.usageLimit,
        ...(newPromoCode.expiresAt && { expiresAt: new Date(newPromoCode.expiresAt).toISOString() })
      }
      await apiClient.createPromoCode(promoCodeData)
      setIsCreateDialogOpen(false)
      setNewPromoCode({ code: "", bonusValue: 10, usageLimit: 100, expiresAt: "" })
      loadPromoCodes()
    } catch (err: any) {
      console.error("Error creating promo code:", err)
      setError(err.message || "Failed to create promo code")
    }
  }

  const handleTogglePromoCode = async (promoCodeId: number) => {
    try {
      await apiClient.togglePromoCode(promoCodeId)
      loadPromoCodes()
    } catch (err: any) {
      console.error("Error toggling promo code:", err)
      setError(err.message || "Failed to toggle promo code")
    }
  }

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
  }

  if (loading) {
    return (
      <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
        <DashboardHeader title="Promo Codes" description="Manage promotional codes and discounts" />
        <div className="grid gap-3 sm:gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-48" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-6 w-24 mb-2" />
                <Skeleton className="h-4 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      <DashboardHeader title="Promo Codes" description="Manage promotional codes and discounts" />

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Create Promo Code Button */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold">Promotional Codes</h2>
          <p className="text-sm text-muted-foreground">Create and manage discount codes for users</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Create Promo Code
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Promo Code</DialogTitle>
              <DialogDescription>Add a new promotional code with discount settings</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="code">Promo Code</Label>
                <Input
                  id="code"
                  placeholder="SUMMER2024"
                  value={newPromoCode.code}
                  onChange={(e) => setNewPromoCode({ ...newPromoCode, code: e.target.value.toUpperCase() })}
                />
              </div>
              <div>
                <Label htmlFor="bonusValue">Bonus Value ($)</Label>
                <Input
                  id="bonusValue"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={newPromoCode.bonusValue}
                  onChange={(e) => setNewPromoCode({ ...newPromoCode, bonusValue: parseFloat(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="usageLimit">Usage Limit</Label>
                <Input
                  id="usageLimit"
                  type="number"
                  min="1"
                  value={newPromoCode.usageLimit}
                  onChange={(e) => setNewPromoCode({ ...newPromoCode, usageLimit: parseInt(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="expiresAt">Expiry Date (Optional)</Label>
                <Input
                  id="expiresAt"
                  type="datetime-local"
                  value={newPromoCode.expiresAt}
                  onChange={(e) => setNewPromoCode({ ...newPromoCode, expiresAt: e.target.value })}
                />
              </div>
              <Button onClick={handleCreatePromoCode} className="w-full">
                Create Promo Code
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Promo Codes List */}
      <div className="grid gap-3 sm:gap-4">
        {promoCodes.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8 px-4">
              <Gift className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-center">No Promo Codes</h3>
              <p className="text-muted-foreground text-center mb-4">
                Create your first promotional code to start offering discounts to users
              </p>
              <Button onClick={() => setIsCreateDialogOpen(true)} className="w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Create First Promo Code
              </Button>
            </CardContent>
          </Card>
        ) : (
          promoCodes.map((promoCode) => (
            <Card key={promoCode.id}>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-base sm:text-lg font-bold break-all">{promoCode.code}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(promoCode.code)}
                        className="h-6 w-6 p-0 flex-shrink-0"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    <Badge variant={promoCode.active ? "default" : "secondary"} className="w-fit">
                      {promoCode.active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleTogglePromoCode(promoCode.id)}
                      className="h-8 w-8 p-0"
                    >
                      {promoCode.active ? (
                        <XCircle className="h-4 w-4 text-red-500" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs sm:text-sm">Bonus Value</p>
                    <p className="font-semibold text-sm sm:text-base">${promoCode.bonusValue}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs sm:text-sm">Usage</p>
                    <p className="font-semibold text-sm sm:text-base">{promoCode.usedCount} / {promoCode.usageLimit}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs sm:text-sm">Created</p>
                    <p className="font-semibold text-sm sm:text-base">{new Date(promoCode.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs sm:text-sm">Expires</p>
                    <p className="font-semibold text-sm sm:text-base">
                      {promoCode.expiresAt ? new Date(promoCode.expiresAt).toLocaleDateString() : "Never"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
} 