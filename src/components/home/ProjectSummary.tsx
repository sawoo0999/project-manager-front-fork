interface ProjectSummaryProps {
  projectCount: number
  totalCard: number
}

const ProjectSummary = ({ projectCount, totalCard }: ProjectSummaryProps) => {
  return (
    <div className="flex justify-center gap-4 px-4 py-2 border border-primary rounded-full sm:text-sm">
      <div className="text-primary font-bold">total</div>
      <div className="text-primary font-bold">{projectCount} 프로젝트</div>
      <div className="text-primary font-bold">{totalCard} 카드</div>
    </div>
  )
}

export default ProjectSummary
