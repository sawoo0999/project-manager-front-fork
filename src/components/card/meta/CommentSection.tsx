import { format, parseISO } from 'date-fns'
import { Input } from '@/shared/ui/common/input'
import { Comment } from '@/shared/mock/cardDetail'

interface CommentSectionProps {
  comments: Comment[]
  completeDate: string | null
}

export default function CommentSection({
  comments,
  completeDate,
}: CommentSectionProps) {
  const formatDate = (dateString: string) => {
    const date = parseISO(dateString)
    return format(date, 'M월 d일')
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-cardDate">댓글</h3>
      {/* 댓글 목록 */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            <div className="w-8 h-8 bg-primary rounded-full flex-shrink-0" />
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{comment.nickname}</span>
                <span className="text-xs text-cardDate">
                  {formatDate(comment.date)}
                </span>
              </div>
              <p className="text-sm text-gray-800">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
      {/* 댓글 입력 - 완료 상태가 아닐 때만 표시 */}
      {!completeDate && (
        <div className="flex gap-3 pt-2">
          <div className="w-8 h-8 bg-primary rounded-full flex-shrink-0" />
          <Input
            type="text"
            placeholder="댓글을 입력하세요"
            className="w-full"
          />
        </div>
      )}
    </div>
  )
}
