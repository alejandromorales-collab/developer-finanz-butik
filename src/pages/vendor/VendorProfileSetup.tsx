import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Clock, Shield, Bell, Bank, FileText, IdentificationCard } from "@phosphor-icons/react";
import { useToast } from "@/hooks/use-toast";
import { vendorProfile } from "@/data/mockVendor";

const categories = ["Legal", "Accounting", "Taxes", "Compliance", "Insurance", "Consulting", "Valuation"];

const VendorProfileSetup = () => {
  const { toast } = useToast();
  const [firmName, setFirmName] = useState(vendorProfile.firmName);
  const [category, setCategory] = useState(vendorProfile.category);
  const [bio, setBio] = useState(vendorProfile.bio);
  const [taxId, setTaxId] = useState(vendorProfile.taxId);
  const [license, setLicense] = useState(vendorProfile.licenseNumber);
  const [termsAccepted, setTermsAccepted] = useState(true);

  // Notification toggles
  const [notifMessages, setNotifMessages] = useState(true);
  const [notifClients, setNotifClients] = useState(true);
  const [notifSystem, setNotifSystem] = useState(false);

  const handleSave = () => {
    if (!firmName.trim() || !category) {
      toast({ title: "Missing fields", description: "Firm name and category are required.", variant: "destructive" });
      return;
    }
    toast({ title: "Profile saved", description: "Your vendor profile has been updated successfully." });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Profile & Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage your professional identity and account settings</p>
        </div>
        <Badge variant="outline" className={vendorProfile.verified ? "bg-emerald-100 text-emerald-800 border-emerald-200" : "bg-amber-100 text-amber-800 border-amber-200"}>
          {vendorProfile.verified ? <CheckCircle size={14} className="mr-1" /> : <Clock size={14} className="mr-1" />}
          {vendorProfile.verified ? "Verified" : "Pending Verification"}
        </Badge>
      </div>

      <Tabs defaultValue="identity" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 h-auto bg-surface-elevated-alt">
          <TabsTrigger value="identity" className="text-xs py-2 data-[state=active]:bg-card"><IdentificationCard size={14} className="mr-1" /> Identity</TabsTrigger>
          <TabsTrigger value="payouts" className="text-xs py-2 data-[state=active]:bg-card"><Bank size={14} className="mr-1" /> Payouts</TabsTrigger>
          <TabsTrigger value="notifications" className="text-xs py-2 data-[state=active]:bg-card"><Bell size={14} className="mr-1" /> Notifications</TabsTrigger>
          <TabsTrigger value="agreements" className="text-xs py-2 data-[state=active]:bg-card"><FileText size={14} className="mr-1" /> Agreements</TabsTrigger>
        </TabsList>

        {/* ─── Professional Identity ─── */}
        <TabsContent value="identity">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Professional Identity</CardTitle>
              <CardDescription>Your firm credentials and public-facing information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firmName">Firm Name *</Label>
                  <Input id="firmName" value={firmName} onChange={(e) => setFirmName(e.target.value)} placeholder="Your firm or business name" />
                </div>
                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Firm Bio</Label>
                <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Describe your firm's expertise…" rows={3} />
              </div>
              <Separator />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="taxId">Tax ID / EIN</Label>
                  <Input id="taxId" value={taxId} onChange={(e) => setTaxId(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="license">Professional License #</Label>
                  <Input id="license" value={license} onChange={(e) => setLicense(e.target.value)} />
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-lg border p-4 bg-muted/30">
                <Shield size={20} className="text-primary shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Licenses & Certifications</p>
                  <p className="text-xs text-muted-foreground">Upload supporting documents for verification</p>
                </div>
                <Button variant="outline" size="sm">Upload</Button>
              </div>

              <div className="flex items-start gap-2">
                <Switch checked={termsAccepted} onCheckedChange={setTermsAccepted} id="terms" />
                <Label htmlFor="terms" className="text-xs text-muted-foreground leading-snug cursor-pointer">
                  I accept the Vendor Terms & Conditions and Service Level Agreement
                </Label>
              </div>

              <Button onClick={handleSave} className="w-full sm:w-auto">Save Profile</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ─── Payout Settings ─── */}
        <TabsContent value="payouts">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Payout Settings</CardTitle>
              <CardDescription>Bank account configuration and revenue distribution</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="text-sm font-medium text-foreground">Current Balance</p>
                  <p className="text-2xl font-bold text-primary">${vendorProfile.balance.toLocaleString()}</p>
                </div>
                <Badge variant="outline" className={vendorProfile.bankConfigured ? "bg-emerald-100 text-emerald-800 border-emerald-200" : "bg-amber-100 text-amber-800 border-amber-200"}>
                  {vendorProfile.bankConfigured ? "Bank Connected" : "Setup Required"}
                </Badge>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Payout Method</Label>
                  <Select defaultValue="ach">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ach">ACH Transfer</SelectItem>
                      <SelectItem value="wire">Wire Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Account Ending</Label>
                  <Input value="****7842" disabled />
                </div>
              </div>

              <Separator />
              <h3 className="font-heading text-sm font-semibold text-foreground">Distribution Log</h3>
              <div className="rounded-lg border overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Date</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Amount</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendorProfile.payoutHistory.map((p, i) => (
                      <tr key={i} className="border-t">
                        <td className="px-4 py-2.5 text-foreground">{p.date}</td>
                        <td className="px-4 py-2.5 font-medium text-foreground">${p.amount.toLocaleString()}</td>
                        <td className="px-4 py-2.5 text-muted-foreground">{p.method}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ─── Notifications ─── */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Notification Preferences</CardTitle>
              <CardDescription>Control which alerts you receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "New Messages", desc: "Get notified when a client sends a message", value: notifMessages, set: setNotifMessages },
                { label: "Client Activity", desc: "Alerts when clients interact with your services", value: notifClients, set: setNotifClients },
                { label: "System Updates", desc: "Platform announcements and critical updates", value: notifSystem, set: setNotifSystem },
              ].map((n) => (
                <div key={n.label} className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">{n.label}</p>
                    <p className="text-xs text-muted-foreground">{n.desc}</p>
                  </div>
                  <Switch checked={n.value} onCheckedChange={n.set} />
                </div>
              ))}
              <Button onClick={() => toast({ title: "Preferences saved" })} className="w-full sm:w-auto">Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ─── Agreement Records ─── */}
        <TabsContent value="agreements">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Agreement Records</CardTitle>
              <CardDescription>Your signed contracts and terms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: "Vendor Terms & Conditions v2.1", accepted: "2025-10-01 14:32 UTC" },
                { name: "Service Level Agreement (SLA)", accepted: "2025-10-01 14:33 UTC" },
                { name: "Data Processing Agreement", accepted: "2025-10-01 14:33 UTC" },
              ].map((a) => (
                <div key={a.name} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <FileText size={18} className="text-primary shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{a.name}</p>
                      <p className="text-[10px] text-muted-foreground">Accepted: {a.accepted}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VendorProfileSetup;
