import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, CloudArrowUp, FilePdf, CheckCircle } from "@phosphor-icons/react";
import { useToast } from "@/hooks/use-toast";
import { mockVendorServices } from "@/data/mockVendor";

const categories = ["Legal", "Accounting", "Taxes", "Compliance", "Insurance", "Consulting", "Valuation"];
const pricingModels = ["Fixed Fee", "Hourly", "Retainer", "Success Fee"];

const CreateService = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);

  // Step 1
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [pricingModel, setPricingModel] = useState("");
  const [fee, setFee] = useState("");

  // Step 2
  const [mediaFiles, setMediaFiles] = useState<string[]>([]);
  const [docFiles, setDocFiles] = useState<string[]>([]);

  const canAdvance = title.trim() && description.trim() && category && pricingModel && fee;

  const handleSubmit = () => {
    if (!canAdvance) return;

    const newService = {
      id: `vs-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      category,
      pricingModel,
      fee: parseFloat(fee),
      currency: "USD",
      status: "pending_approval" as const,
      views: 0,
      createdAt: new Date().toISOString().slice(0, 10),
    };

    mockVendorServices.unshift(newService);

    toast({
      title: "Service submitted!",
      description: "Your service is pending admin approval. You'll be notified once it's active.",
    });

    navigate("/vendor");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Create New Service</h1>
        <p className="mt-1 text-sm text-muted-foreground">Step {step} of 2 — {step === 1 ? "Scope & Pricing" : "Media & Submission"}</p>
      </div>

      {/* Progress */}
      <div className="flex gap-2">
        {[1, 2].map((s) => (
          <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors ${s <= step ? "bg-primary" : "bg-border"}`} />
        ))}
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Scope & Pricing</CardTitle>
            <CardDescription>Define your service details and fee structure</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="title">Service Title *</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Real Estate Due Diligence" maxLength={100} />
              {!title.trim() && title !== "" && <p className="text-xs text-destructive">Title is required</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="desc">Description / Scope of Work *</Label>
              <Textarea id="desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe what this service includes, deliverables, and timeline…" rows={4} maxLength={1000} />
              <p className="text-[10px] text-muted-foreground text-right">{description.length}/1000</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Category *</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Pricing Model *</Label>
                <Select value={pricingModel} onValueChange={setPricingModel}>
                  <SelectTrigger><SelectValue placeholder="Select model" /></SelectTrigger>
                  <SelectContent>
                    {pricingModels.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2 max-w-xs">
              <Label htmlFor="fee">Fee (USD) *</Label>
              <Input id="fee" type="number" min="0" value={fee} onChange={(e) => setFee(e.target.value)} placeholder="0.00" />
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setStep(2)} disabled={!canAdvance}>
                Next <ArrowRight size={16} className="ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Media & Submission</CardTitle>
            <CardDescription>Upload supporting content and submit for review</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Media upload */}
            <div className="space-y-2">
              <Label>Explainer Content (Videos, Graphics)</Label>
              <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-8 text-center hover:border-primary/40 transition-colors cursor-pointer">
                <CloudArrowUp size={32} className="text-muted-foreground/60 mb-2" />
                <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
                <p className="text-[10px] text-muted-foreground mt-1">MP4, PNG, JPG up to 20MB</p>
              </div>
              {mediaFiles.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {mediaFiles.map((f, i) => (
                    <span key={i} className="text-xs bg-muted px-2 py-1 rounded">{f}</span>
                  ))}
                </div>
              )}
            </div>

            {/* Doc templates */}
            <div className="space-y-2">
              <Label>Document Templates (PDFs)</Label>
              <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-8 text-center hover:border-primary/40 transition-colors cursor-pointer">
                <FilePdf size={32} className="text-muted-foreground/60 mb-2" />
                <p className="text-sm text-muted-foreground">Upload PDF templates</p>
                <p className="text-[10px] text-muted-foreground mt-1">PDF up to 10MB each</p>
              </div>
            </div>

            {/* Summary */}
            <div className="rounded-lg bg-muted/40 border p-4 space-y-1">
              <p className="text-xs font-medium text-foreground">Submission Summary</p>
              <p className="text-xs text-muted-foreground"><strong>Service:</strong> {title}</p>
              <p className="text-xs text-muted-foreground"><strong>Category:</strong> {category} · {pricingModel}</p>
              <p className="text-xs text-muted-foreground"><strong>Fee:</strong> ${parseFloat(fee || "0").toLocaleString()} USD</p>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                <ArrowLeft size={16} className="mr-1" /> Back
              </Button>
              <Button onClick={handleSubmit}>
                <CheckCircle size={16} className="mr-1" /> Submit for Approval
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CreateService;
