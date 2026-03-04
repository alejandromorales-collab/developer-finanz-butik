import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ShareNetwork, Heart, Clock, Percent, Briefcase, DownloadSimple, ArrowUp, Info } from "@phosphor-icons/react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { mockProjects } from "@/data/mockProjects";

const ProjectSheet = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = mockProjects.find((p) => p.slug === slug) || mockProjects[0];

  const [selectedImage, setSelectedImage] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [simYears, setSimYears] = useState(1);
  const [simAmount, setSimAmount] = useState(100000);

  // Mock simulator
  const rate = (project.annualInterestRateMin + project.annualInterestRateMax) / 2 / 100;
  const projected = simAmount * Math.pow(1 + rate, simYears);
  const gain = projected - simAmount;
  const gainPct = ((gain / simAmount) * 100).toFixed(0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-6 lg:py-10">
        {/* Back + Actions */}
        <div className="mb-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary">
            <ArrowLeft size={16} />
            Back to opportunities
          </Link>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2 rounded-full">
              <ShareNetwork size={16} /> Share
            </Button>
            <Button variant="outline" size="sm" className="gap-2 rounded-full">
              <Heart size={16} /> Save
            </Button>
          </div>
        </div>

        {/* Gallery Mosaic */}
        <div className="mb-8 grid grid-cols-1 gap-2 lg:grid-cols-[1fr_0.5fr] lg:grid-rows-2">
          <div className="row-span-2 overflow-hidden rounded-l-xl lg:rounded-l-2xl">
            <img
              src={project.images[selectedImage]}
              alt={project.title}
              className="h-full max-h-[420px] w-full object-cover"
            />
          </div>
          {project.images.slice(1, 5).map((img, i) => (
            <div
              key={i}
              className={cn(
                "cursor-pointer overflow-hidden",
                i === 1 && "rounded-tr-xl lg:rounded-tr-2xl",
                i === 3 && "rounded-br-xl lg:rounded-br-2xl"
              )}
              onClick={() => setSelectedImage(i + 1)}
            >
              <img
                src={img}
                alt={`${project.title} ${i + 2}`}
                className="h-full max-h-[207px] w-full object-cover transition-transform hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Left Content */}
          <div>
            {/* Title + Stats */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="mb-4 text-2xl font-extrabold leading-tight text-foreground lg:text-3xl">
                {project.title}
              </h1>
              <div className="mb-6 flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock size={18} className="text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Term</p>
                    <p className="font-semibold text-foreground">{project.termRange}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Percent size={18} className="text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Annual Interest Rate</p>
                    <p className="font-semibold text-foreground">
                      0.01% - 99.99%
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Percent size={18} className="text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Annual Interest Rate</p>
                    <p className="font-semibold text-foreground">
                      {project.annualInterestRateMin}%-{project.annualInterestRateMax}%
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <Separator className="my-6" />

            {/* Curated by */}
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <div className="flex h-6 w-6 items-center justify-center rounded bg-primary">
                  <span className="text-[10px] font-bold text-primary-foreground">FB</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Curated by {project.curatedBy}</p>
                {project.legalSupport && (
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Briefcase size={12} /> Legal Support Included.
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>
              {project.highlights.length > 0 && (
                <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-muted-foreground">
                  {project.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              )}
              <Button
                variant="outline"
                size="sm"
                className="mt-4 rounded-full"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? "Show less" : "Show more"}
              </Button>
            </div>

            <Separator className="my-6" />

            {/* Simulator */}
            <div className="mb-8">
              <h2 className="mb-1 flex items-center gap-2 text-lg font-bold text-foreground">
                Potential returns <Info size={18} className="text-muted-foreground" />
              </h2>
              <p className="mb-5 text-sm text-muted-foreground">
                Try our simulator and get to know what you could get investing with us.
              </p>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-foreground">Investment</label>
                  <div className="flex items-center rounded-lg border bg-background px-4 py-2.5">
                    <input
                      type="text"
                      value={simAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      onChange={(e) => {
                        const v = parseFloat(e.target.value.replace(/,/g, ""));
                        if (!isNaN(v)) setSimAmount(v);
                      }}
                      className="w-full bg-transparent text-sm font-medium text-foreground outline-none"
                    />
                    <Info size={16} className="text-muted-foreground" />
                  </div>
                  <div className="mt-3 flex gap-1">
                    {[1, 2, 3].map((y) => (
                      <button
                        key={y}
                        onClick={() => setSimYears(y)}
                        className={cn(
                          "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                          simYears === y
                            ? "bg-foreground text-background"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {y} year{y > 1 ? "s" : ""}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-1.5 text-sm text-muted-foreground">Projected value</p>
                  <p className="text-3xl font-extrabold text-foreground">
                    ${projected.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-sm font-semibold text-success">
                    <ArrowUp size={14} />
                    ${gain.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({gainPct}%)
                  </p>
                </div>
              </div>

              {/* Simple Chart Placeholder */}
              <div className="mt-6 flex h-40 items-end gap-0">
                <svg viewBox="0 0 400 120" className="h-full w-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(174, 85%, 30%)" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="hsl(174, 85%, 30%)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0,100 Q100,90 150,70 Q200,50 280,30 Q350,15 400,5 L400,120 L0,120 Z" fill="url(#chartGrad)" />
                  <path d="M0,100 Q100,90 150,70 Q200,50 280,30 Q350,15 400,5" fill="none" stroke="hsl(174, 85%, 30%)" strokeWidth="2.5" />
                  <circle cx="0" cy="100" r="4" fill="hsl(174, 85%, 30%)" />
                  <circle cx="150" cy="70" r="4" fill="hsl(174, 85%, 30%)" />
                  <circle cx="280" cy="30" r="4" fill="hsl(174, 85%, 30%)" />
                  <circle cx="400" cy="5" r="4" fill="hsl(174, 85%, 30%)" />
                </svg>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Today</span>
                <span>1 year</span>
                <span>2 years</span>
                <span>3 years</span>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Investment Tiers */}
            {project.tiers.length > 0 && (
              <div className="mb-8">
                <h2 className="mb-1 text-lg font-bold text-foreground">Investment Tiers</h2>
                <p className="mb-5 text-sm text-muted-foreground">
                  Choose the tier that best fits your investment goals
                </p>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {project.tiers.map((tier, i) => (
                    <Card key={tier.id} className="overflow-hidden">
                      <div className={cn(
                        "flex items-center justify-between px-4 py-3 text-sm font-bold text-primary-foreground",
                        i === 0 ? "bg-foreground" : i === 1 ? "bg-charcoal" : "bg-primary"
                      )}>
                        <span>{tier.name}</span>
                        <Badge variant="outline" className="border-primary-foreground/30 text-primary-foreground">
                          # Years
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        {tier.ranges.map((range, j) => (
                          <div key={j} className="flex items-center justify-between border-b py-2 last:border-0">
                            <div>
                              <p className="text-xs text-muted-foreground">Investment Amount</p>
                              <p className="text-sm font-semibold text-foreground">
                                ${range.minAmount.toLocaleString()}{range.maxAmount ? ` - $${range.maxAmount.toLocaleString()}` : "+"}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-muted-foreground">Interest Rate</p>
                              <p className="text-sm font-semibold text-foreground">{range.interestRate}%</p>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            <Separator className="my-6" />

            {/* Documents */}
            {project.documents.length > 0 && (
              <div>
                <h2 className="mb-4 text-lg font-bold text-foreground">Documents</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {project.documents.map((doc) => (
                    <Card key={doc.id} className="flex items-center justify-between p-4">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.date}</p>
                      </div>
                      <button className="rounded-full p-2 text-primary transition-colors hover:bg-primary/10">
                        <DownloadSimple size={20} />
                      </button>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar - Investment Card */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Card className="overflow-hidden">
              <CardContent className="p-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Min. Investment</span>
                  <span className="text-xl font-extrabold text-foreground">
                    ${project.minInvestment.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <Button
                  disabled
                  className="w-full rounded-lg bg-muted text-muted-foreground hover:bg-muted"
                  size="lg"
                >
                  Sold Out
                </Button>
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  You won't be charged at this moment
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectSheet;
