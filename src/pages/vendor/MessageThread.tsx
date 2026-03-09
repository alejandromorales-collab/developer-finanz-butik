import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  PaperPlaneRight,
  Paperclip,
  FilePdf,
  FileDoc,
  Image,
  File,
  ShieldCheck,
  SealCheck,
  Buildings,
  IdentificationBadge,
} from "@phosphor-icons/react";
import { mockInquiries, type ThreadMessage, type MessageAttachment } from "@/data/mockMessaging";
import { format } from "date-fns";

const attachmentIcons: Record<string, React.ElementType> = {
  pdf: FilePdf,
  docx: FileDoc,
  image: Image,
  other: File,
};

const roleColors: Record<string, string> = {
  vendor: "bg-primary/10 text-primary",
  investor: "bg-secondary/60 text-secondary-foreground",
  admin: "bg-amber-500/10 text-amber-700",
};

const MessageThread = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [reply, setReply] = useState("");

  const inquiry = mockInquiries.find((inq) => inq.id === id);

  if (!inquiry) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-sm text-muted-foreground">Inquiry not found.</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate("/vendor/messages")}>
          <ArrowLeft size={16} className="mr-1" /> Back to Messages
        </Button>
      </div>
    );
  }

  const handleSend = () => {
    if (!reply.trim()) return;
    // Mock: would push to API
    setReply("");
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Thread */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Header */}
          <div className="space-y-2">
            <button
              onClick={() => navigate("/vendor/messages")}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={14} />
              Back to Messaging Hub
            </button>
            <h1 className="font-heading text-xl font-bold text-foreground">{inquiry.subject}</h1>
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline" className="text-[10px]">{inquiry.serviceCategory}</Badge>
              <span>·</span>
              <span>{inquiry.serviceTitle}</span>
              <span>·</span>
              <span>{inquiry.messages.length} messages</span>
            </div>
          </div>

          {/* Admin Oversight */}
          <div className="flex items-center gap-2 rounded-md border border-primary/20 bg-primary/5 px-3 py-2">
            <ShieldCheck size={16} weight="duotone" className="text-primary shrink-0" />
            <p className="text-[11px] text-muted-foreground">
              This conversation is monitored by Finanz Butik for quality and compliance.
            </p>
          </div>

          {/* Messages */}
          <div className="space-y-4">
            {inquiry.messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
          </div>

          {/* Reply Composer */}
          {inquiry.status !== "resolved" && (
            <Card>
              <CardContent className="p-4 space-y-3">
                <Textarea
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Write your reply…"
                  rows={4}
                  className="resize-none"
                />
                <div className="flex items-center justify-between">
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <Paperclip size={16} className="mr-1.5" />
                    Attach File
                  </Button>
                  <Button onClick={handleSend} disabled={!reply.trim()}>
                    <PaperPlaneRight size={16} className="mr-1.5" />
                    Send Reply
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {inquiry.status === "resolved" && (
            <div className="text-center py-4">
              <p className="text-xs text-muted-foreground">This inquiry has been resolved and is now read-only.</p>
            </div>
          )}
        </div>

        {/* Vendor Info Card — Persistent Sidebar */}
        <aside className="lg:w-72 shrink-0">
          <Card className="sticky top-6">
            <CardContent className="p-5 space-y-4">
              <div className="space-y-1">
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Service Provider</p>
                <h3 className="text-sm font-semibold text-foreground">{inquiry.vendorInfo.firmName}</h3>
              </div>

              <Separator />

              <div className="space-y-3">
                <InfoRow icon={Buildings} label="Category" value={inquiry.vendorInfo.category} />
                <InfoRow icon={IdentificationBadge} label="License" value={inquiry.vendorInfo.licenseNumber} />
                {inquiry.vendorInfo.verified && (
                  <div className="flex items-center gap-2">
                    <SealCheck size={16} weight="fill" className="text-primary" />
                    <span className="text-xs font-medium text-primary">Verified Provider</span>
                  </div>
                )}
              </div>

              <Separator />

              <div className="space-y-1">
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Counterparty</p>
                <p className="text-sm font-medium text-foreground">{inquiry.counterparty.name}</p>
                {inquiry.counterparty.company && (
                  <p className="text-xs text-muted-foreground">{inquiry.counterparty.company}</p>
                )}
                <Badge variant="outline" className="text-[10px] mt-1 capitalize">{inquiry.counterparty.role}</Badge>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
};

/* ── Sub-components ── */

const InfoRow = ({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) => (
  <div className="flex items-start gap-2">
    <Icon size={15} className="text-muted-foreground mt-0.5 shrink-0" />
    <div>
      <p className="text-[10px] text-muted-foreground">{label}</p>
      <p className="text-xs font-medium text-foreground">{value}</p>
    </div>
  </div>
);

const MessageBubble = ({ message }: { message: ThreadMessage }) => {
  const isVendor = message.senderRole === "vendor";
  return (
    <div className={`flex ${isVendor ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[85%] space-y-2`}>
        {/* Header */}
        <div className={`flex items-center gap-2 ${isVendor ? "justify-end" : ""}`}>
          <Badge variant="outline" className={`text-[10px] ${roleColors[message.senderRole]}`}>
            {message.senderRole === "vendor" ? "You" : message.senderName}
          </Badge>
          <span className="text-[10px] text-muted-foreground">
            {format(new Date(message.sentAt), "MMM d, yyyy · h:mm a")}
          </span>
        </div>

        {/* Body */}
        <div
          className={`rounded-lg border px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
            isVendor
              ? "bg-primary/5 border-primary/20 text-foreground"
              : "bg-card border-border text-foreground"
          }`}
        >
          {message.body}
        </div>

        {/* Attachments */}
        {message.attachments.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {message.attachments.map((att) => (
              <AttachmentChip key={att.id} attachment={att} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const AttachmentChip = ({ attachment }: { attachment: MessageAttachment }) => {
  const Icon = attachmentIcons[attachment.type] || File;
  return (
    <a
      href={attachment.url}
      className="flex items-center gap-1.5 rounded-md border bg-muted/40 px-2.5 py-1.5 text-xs hover:bg-muted transition-colors"
    >
      <Icon size={14} className="text-primary shrink-0" />
      <span className="truncate max-w-[160px]">{attachment.name}</span>
      <span className="text-[10px] text-muted-foreground shrink-0">{attachment.size}</span>
    </a>
  );
};

export default MessageThread;
