import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Project } from "@/types/api";
import { Clock, Percent } from "@phosphor-icons/react";

interface ProjectCardProps {
  project: Project;
}

const categoryLabels: Record<Project["category"], string> = {
  cash: "Cash",
  lend: "Lend",
  buy: "Buy",
  develop: "Develop",
};

const statusLabels: Record<Project["status"], string> = {
  active: "Active",
  sold_out: "Sold Out",
  coming_soon: "Coming Soon",
  waiting_approval: "Waiting Approval",
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Link to={`/project/${project.slug}`}>
      <Card className="group overflow-hidden border transition-shadow hover:shadow-lg">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={project.thumbnailUrl}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute left-3 top-3 flex gap-2">
            <Badge variant="secondary" className="bg-background/90 text-foreground backdrop-blur">
              {categoryLabels[project.category]}
            </Badge>
            <Badge
              className={
                project.status === "sold_out"
                  ? "bg-muted text-muted-foreground"
                  : project.status === "active"
                  ? "bg-success text-white"
                  : "bg-gold text-white"
              }
            >
              {statusLabels[project.status]}
            </Badge>
          </div>
        </div>
        <CardContent className="p-5">
          <h3 className="mb-3 font-heading text-lg font-bold leading-snug text-foreground">
            {project.title}
          </h3>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Clock size={16} />
              {project.termRange}
            </span>
            <span className="flex items-center gap-1.5">
              <Percent size={16} />
              {project.annualInterestRateMin}% - {project.annualInterestRateMax}%
            </span>
          </div>
          <div className="mt-3 text-sm font-semibold text-foreground">
            Min. ${project.minInvestment.toLocaleString()} {project.currency}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProjectCard;
