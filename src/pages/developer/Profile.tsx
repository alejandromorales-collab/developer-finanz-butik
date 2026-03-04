import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { Check, UploadSimple } from "@phosphor-icons/react";

const Profile = () => {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Profile / KYC</h1>
        <p className="text-sm text-muted-foreground">Manage your developer profile and verification documents</p>
      </div>

      {/* Personal Info */}
      <section className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="font-heading text-lg font-semibold text-foreground">Personal Information</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input defaultValue={user?.name || ""} />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input defaultValue={user?.email || ""} type="email" />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input placeholder="+52 55 1234 5678" />
          </div>
          <div className="space-y-2">
            <Label>Country</Label>
            <Input defaultValue="Mexico" />
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="font-heading text-lg font-semibold text-foreground">Company Details</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Company Name</Label>
            <Input defaultValue={user?.company || ""} />
          </div>
          <div className="space-y-2">
            <Label>Tax ID</Label>
            <Input placeholder="RFC / NIT / RUC" />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Company Description</Label>
          <Textarea placeholder="Tell us about your company and experience in real estate development..." rows={3} />
        </div>
      </section>

      {/* KYC Documents */}
      <section className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="font-heading text-lg font-semibold text-foreground">KYC Documents</h2>
        <p className="text-xs text-muted-foreground">Upload required documents for verification</p>
        {["Government ID (front & back)", "Proof of Address", "Company Registration Certificate", "Financial Statements"].map((doc) => (
          <div key={doc} className="flex items-center justify-between rounded-lg border border-dashed border-border p-3">
            <span className="text-sm text-foreground">{doc}</span>
            <Button variant="outline" size="sm">
              <UploadSimple size={14} className="mr-1" /> Upload
            </Button>
          </div>
        ))}
      </section>

      <div className="flex justify-end">
        <Button onClick={handleSave} className={saved ? "bg-green-600" : ""}>
          {saved ? <><Check size={16} className="mr-1" /> Saved!</> : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};

export default Profile;
