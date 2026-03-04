import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { managerBrand } from "@/data/mockClients";
import { Check, UploadSimple } from "@phosphor-icons/react";

const BrandSettings = () => {
  const [brand, setBrand] = useState(managerBrand);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Brand Settings</h1>
        <p className="text-sm text-muted-foreground">Customize the white-label experience for your clients</p>
      </div>

      {/* Preview */}
      <div className="rounded-xl border border-border p-6" style={{ borderColor: brand.primaryColor }}>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: brand.primaryColor }}>
            <span className="text-sm font-bold text-white">{brand.companyName.substring(0, 2).toUpperCase()}</span>
          </div>
          <div>
            <p className="font-heading font-bold text-foreground">{brand.companyName}</p>
            <p className="text-xs text-muted-foreground">{brand.domain}</p>
          </div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Live preview of your branded portal</p>
      </div>

      {/* Settings */}
      <section className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="font-heading text-lg font-semibold text-foreground">Brand Identity</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Company Name</Label>
            <Input value={brand.companyName} onChange={(e) => setBrand({ ...brand, companyName: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Primary Color</Label>
            <div className="flex gap-2">
              <input
                type="color"
                value={brand.primaryColor}
                onChange={(e) => setBrand({ ...brand, primaryColor: e.target.value })}
                className="h-10 w-10 cursor-pointer rounded border border-input"
              />
              <Input value={brand.primaryColor} onChange={(e) => setBrand({ ...brand, primaryColor: e.target.value })} className="flex-1" />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Custom Domain</Label>
          <Input value={brand.domain} onChange={(e) => setBrand({ ...brand, domain: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>Logo</Label>
          <div className="flex h-24 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30 text-sm text-muted-foreground cursor-pointer hover:border-primary/50">
            <UploadSimple size={20} className="mr-2" /> Upload logo
          </div>
        </div>
      </section>

      <div className="flex justify-end">
        <Button onClick={handleSave} className={saved ? "bg-green-600" : ""}>
          {saved ? <><Check size={16} className="mr-1" /> Saved!</> : "Save Brand Settings"}
        </Button>
      </div>
    </div>
  );
};

export default BrandSettings;
