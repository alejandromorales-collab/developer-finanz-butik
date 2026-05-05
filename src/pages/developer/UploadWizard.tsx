import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight, Check, Image as ImageIcon, Images, FilePdf, CloudArrowUp } from "@phosphor-icons/react";
import { toast } from "@/hooks/use-toast";
import { mockProjects } from "@/data/mockProjects";
import type { Project } from "@/types/api";

const steps = ["Basic Info", "Financial Details", "Media & Documents", "Review"];

const categoryDescriptions: Record<Project["category"], string> = {
  cash: "Cash — Short-term liquidity opportunities. Investors contribute available capital to earn fast returns with low risk.",
  lend: "Lend — Debt financing. Investors lend capital to the project and receive periodic interest payments plus principal repayment.",
  buy: "Buy — Acquisition of existing assets (real estate, operating complexes, equity stakes). Investors purchase a share of an asset already in operation.",
  develop: "Develop — Ground-up development or construction projects. Capital funds the creation of the asset; returns come from its future sale or rental income.",
};

const UploadWizard = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    title: "", category: "develop" as Project["category"], description: "",
    minInvestment: "", interestMin: "", interestMax: "", termRange: "",
    highlights: "",
  });

  const update = (key: string, val: string) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = () => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      title: form.title || "Untitled Project",
      slug: (form.title || "untitled").toLowerCase().replace(/\s+/g, "-"),
      status: "waiting_approval",
      category: form.category,
      thumbnailUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
      images: [],
      termRange: form.termRange || "—",
      annualInterestRateMin: parseFloat(form.interestMin) || 0,
      annualInterestRateMax: parseFloat(form.interestMax) || 0,
      minInvestment: parseFloat(form.minInvestment) || 0,
      currency: "USD",
      description: form.description,
      highlights: form.highlights ? form.highlights.split("\n").filter(Boolean) : [],
      curatedBy: "The Finanz Butik Team",
      legalSupport: true,
      tiers: [],
      documents: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockProjects.unshift(newProject);

    toast({
      title: "Project submitted successfully! 🎉",
      description: "Your project is now waiting for approval.",
    });

    navigate("/developer");
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Upload New Project</h1>
        <p className="text-sm text-muted-foreground">Create a new investment opportunity</p>
      </div>

      {/* Steps indicator */}
      <div className="flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
              i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}>
              {i < step ? <Check size={14} /> : i + 1}
            </div>
            {i < steps.length - 1 && <div className={`h-px w-8 ${i < step ? "bg-primary" : "bg-border"}`} />}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        {step === 0 && (
          <>
            <div className="space-y-2">
              <Label>Project Title</Label>
              <Input value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="Villa Residencial Costa del Sol" />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={form.category} onValueChange={(v) => update("category", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="lend">Lend</SelectItem>
                  <SelectItem value="buy">Buy</SelectItem>
                  <SelectItem value="develop">Develop</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                {categoryDescriptions[form.category]}
              </p>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={form.description} onChange={(e) => update("description", e.target.value)} rows={4} placeholder="Describe the project..." />
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Min Investment (USD)</Label>
                <Input type="number" value={form.minInvestment} onChange={(e) => update("minInvestment", e.target.value)} placeholder="20000" />
              </div>
              <div className="space-y-2">
                <Label>Term Range</Label>
                <Input value={form.termRange} onChange={(e) => update("termRange", e.target.value)} placeholder="1 - 5 years" />
              </div>
              <div className="space-y-2">
                <Label>Target Return Min (%)</Label>
                <Input type="number" step="0.1" value={form.interestMin} onChange={(e) => update("interestMin", e.target.value)} placeholder="6.5" />
              </div>
              <div className="space-y-2">
                <Label>Target Return Max (%)</Label>
                <Input type="number" step="0.1" value={form.interestMax} onChange={(e) => update("interestMax", e.target.value)} placeholder="8.5" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Highlights (one per line)</Label>
              <Textarea value={form.highlights} onChange={(e) => update("highlights", e.target.value)} rows={3} placeholder={"Prime location\nHigh demand\nGuaranteed returns"} />
            </div>
          </>
        )}

        {step === 2 && (
          <div className="space-y-6">
            {/* Thumbnail */}
            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <Label>Thumbnail Image</Label>
                <span className="text-[11px] text-muted-foreground">1 image required</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-muted/30 px-4 py-6 text-center cursor-pointer hover:border-primary/50 transition-colors">
                <ImageIcon size={28} className="text-muted-foreground/70" />
                <p className="text-sm text-foreground font-medium">Click or drag to upload</p>
                <p className="text-xs text-muted-foreground">
                  Recommended size: <span className="text-foreground font-medium">1200 × 800 px</span> (3:2)
                </p>
                <p className="text-xs text-muted-foreground">
                  Format: <span className="text-foreground font-medium">JPG, PNG, WEBP</span> · Max <span className="text-foreground font-medium">5 MB</span>
                </p>
              </div>
            </div>

            {/* Gallery */}
            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <Label>Project Gallery</Label>
                <span className="text-[11px] text-muted-foreground">Up to 10 images</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-muted/30 px-4 py-6 text-center cursor-pointer hover:border-primary/50 transition-colors">
                <Images size={28} className="text-muted-foreground/70" />
                <p className="text-sm text-foreground font-medium">Upload multiple images</p>
                <p className="text-xs text-muted-foreground">
                  Recommended size: <span className="text-foreground font-medium">1600 × 1067 px</span> (3:2)
                </p>
                <p className="text-xs text-muted-foreground">
                  Format: <span className="text-foreground font-medium">JPG, PNG, WEBP</span> · Max <span className="text-foreground font-medium">5 MB</span> each
                </p>
              </div>
            </div>

            {/* Documents */}
            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <Label>Documents</Label>
                <span className="text-[11px] text-muted-foreground">Up to 5 files</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-muted/30 px-4 py-6 text-center cursor-pointer hover:border-primary/50 transition-colors">
                <FilePdf size={28} className="text-muted-foreground/70" />
                <p className="text-sm text-foreground font-medium">Upload legal documents</p>
                <p className="text-xs text-muted-foreground">
                  Format: <span className="text-foreground font-medium">PDF</span> · Max <span className="text-foreground font-medium">10 MB</span> per file
                </p>
                <p className="text-xs text-muted-foreground">
                  Suggested: prospectus, term sheet, legal opinion
                </p>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3">
            <h3 className="font-heading font-semibold text-foreground">Review Your Project</h3>
            <dl className="space-y-2 text-sm">
              {[
                ["Title", form.title || "—"],
                ["Category", form.category],
                ["Min Investment", form.minInvestment ? `$${form.minInvestment}` : "—"],
                ["Target Return", form.interestMin && form.interestMax ? `${form.interestMin}% – ${form.interestMax}%` : "—"],
                ["Term", form.termRange || "—"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-border pb-2">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="font-medium text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
          <ArrowLeft size={16} className="mr-1" /> Back
        </Button>
        {step < steps.length - 1 ? (
          <Button onClick={() => setStep(step + 1)}>
            Next <ArrowRight size={16} className="ml-1" />
          </Button>
        ) : (
          <Button onClick={handleSubmit}>
            <Check size={16} className="mr-1" /> Submit Project
          </Button>
        )}
      </div>
    </div>
  );
};

export default UploadWizard;
