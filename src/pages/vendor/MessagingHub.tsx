import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  EnvelopeSimple,
  MagnifyingGlass,
  ShieldCheck,
  Circle,
  Clock,
  CheckCircle,
  ChatCircleDots,
} from "@phosphor-icons/react";
import { mockInquiries, type InquiryStatus } from "@/data/mockMessaging";
import { formatDistanceToNow } from "date-fns";

const statusConfig: Record<InquiryStatus, { label: string; color: string; icon: React.ElementType }> = {
  active: { label: "Active", color: "bg-emerald-500/15 text-emerald-700 border-emerald-200", icon: Circle },
  pending_response: { label: "Pending Response", color: "bg-amber-500/15 text-amber-700 border-amber-200", icon: Clock },
  resolved: { label: "Resolved", color: "bg-muted text-muted-foreground border-border", icon: CheckCircle },
};

const MessagingHub = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | InquiryStatus>("all");

  const filtered = mockInquiries.filter((inq) => {
    const matchesFilter = filter === "all" || inq.status === filter;
    const matchesSearch =
      !search ||
      inq.subject.toLowerCase().includes(search.toLowerCase()) ||
      inq.counterparty.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <EnvelopeSimple size={24} weight="duotone" className="text-primary" />
          <h1 className="font-heading text-2xl font-bold text-foreground">Messaging Hub</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Manage inquiries and communications with investors about your services.
        </p>
      </div>

      {/* Admin Oversight Banner */}
      <div className="flex items-center gap-2.5 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
        <ShieldCheck size={20} weight="duotone" className="text-primary shrink-0" />
        <div>
          <p className="text-xs font-medium text-foreground">Admin Oversight</p>
          <p className="text-[11px] text-muted-foreground">
            All communications are monitored by Finanz Butik for quality assurance and regulatory compliance.
          </p>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by subject or contact…"
            className="pl-9"
          />
        </div>
        <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="pending_response">Pending</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Inquiry List */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <ChatCircleDots size={48} weight="duotone" className="text-muted-foreground/40 mb-3" />
          <p className="text-sm font-medium text-foreground">No inquiries found</p>
          <p className="text-xs text-muted-foreground mt-1">
            {search ? "Try adjusting your search terms." : "New inquiries from investors will appear here."}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((inq) => {
            const sc = statusConfig[inq.status];
            const StatusIcon = sc.icon;
            return (
              <Card
                key={inq.id}
                className="cursor-pointer transition-all hover:shadow-md hover:border-primary/30 group"
                onClick={() => navigate(`/vendor/messages/${inq.id}`)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex items-center gap-2">
                        {inq.unreadCount > 0 && (
                          <span className="h-2 w-2 rounded-full bg-primary shrink-0" />
                        )}
                        <h3 className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                          {inq.subject}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-medium text-foreground/80">{inq.counterparty.name}</span>
                        {inq.counterparty.company && (
                          <>
                            <span>·</span>
                            <span>{inq.counterparty.company}</span>
                          </>
                        )}
                        <span>·</span>
                        <span>{inq.serviceTitle}</span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">{inq.lastMessagePreview}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <Badge variant="outline" className={`text-[10px] ${sc.color}`}>
                        <StatusIcon size={12} weight="fill" className="mr-1" />
                        {sc.label}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground">
                        {formatDistanceToNow(new Date(inq.lastMessageAt), { addSuffix: true })}
                      </span>
                      {inq.unreadCount > 0 && (
                        <span className="text-[10px] font-semibold bg-primary text-primary-foreground rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
                          {inq.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MessagingHub;
