import { useState } from 'react'
import { format, parseISO } from 'date-fns'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/shared/ui/common/input'
import { Button } from '@/shared/ui/common/button'
import { useQueryCommentList } from '@/shared/queries/useQueryCommentList'
import {
  useMutationCreateComment,
  useMutationEditComment,
  useMutationDeleteComment,
} from '@/shared/queries/useMutationComment'
import { Icon } from '@/shared/ui/Icon'
import { toast } from 'react-toastify'
import { useGetUser } from '@/store/useUserStore'

const formSchema = z.object({
  content: z.string().min(1, '댓글은 1글자 이상 입력해야 합니다.'),
})

type FormValues = z.infer<typeof formSchema>

export default function CommentSection({
  cardId,
  isComplete,
}: {
  cardId: number
  isComplete: boolean
}) {
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null)
  const [editContent, setEditContent] = useState<string>('')
  const { data: commentData } = useQueryCommentList(cardId)
  const comments = commentData?.data
  const createCommentMutation = useMutationCreateComment()
  const editCommentMutation = useMutationEditComment()
  const deleteCommentMutation = useMutationDeleteComment()
  const getUser = useGetUser()
  const loggedInUser = getUser()
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  })

  const handleEdit = (commentId: number, content: string) => {
    setEditingCommentId(commentId)
    setEditContent(content)
  }

  const handleDelete = async (commentId: number) => {
    try {
      await deleteCommentMutation.mutateAsync({ cardId, commentId })
      toast.success('댓글이 삭제되었습니다')
      setEditingCommentId(null)
    } catch (error) {
      console.error('댓글 삭제 실패:', error)
      toast.error('에러가 발생했습니다')
    }
  }

  const handleUpdate = async () => {
    try {
      if (editingCommentId === null) return
      await editCommentMutation.mutateAsync({
        cardId,
        commentId: editingCommentId,
        content: editContent,
      })
      setEditingCommentId(null)
      toast.success('댓글이 수정되었습니다.')
    } catch (error) {
      console.error('댓글 수정 실패:', error)
      toast.error('오류가 발생하였습니다')
    }
  }

  const onSubmit = async (values: FormValues) => {
    try {
      await createCommentMutation.mutateAsync({
        cardId,
        content: values.content,
      })
      reset()
      toast.success('댓글이 생성되었습니다')
    } catch (error) {
      console.error('댓글 저장 실패:', error)
      toast.error('오류가 발생하였습니다')
    }
  }

  const formatDate = (dateString: string) => {
    const date = parseISO(dateString)
    return format(date, 'M월 d일')
  }

  return (
    <div className="space-y-3">
      <div className="py-2 border-b">
        <h3 className="text-sm font-semibold text-cardDate">댓글</h3>
      </div>

      {/* 댓글 목록 */}
      <div className="max-h-[190px] overflow-auto space-y-4">
        {comments?.map((comment) => {
          const isEditing = editingCommentId === comment.commentId
          const isValid = loggedInUser.nickName === comment.nickName
          return (
            <div key={comment.commentId} className="flex gap-3 ">
              <img
                src={comment.photoUrl}
                alt="User Profile"
                className="w-8 h-8 rounded-full flex-shrink-0"
              />
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {comment.nickName}
                  </span>
                  <span className="text-xs text-cardDate">
                    {formatDate(comment.createAt)}
                  </span>
                </div>

                {isEditing ? (
                  <div className="flex gap-2 justify-center items-center">
                    <Input
                      type="text"
                      className="w-full h-8"
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                    />
                    <Button
                      variant="modal"
                      onClick={handleUpdate}
                      disabled={!editContent.trim()}
                      className="w-8 h-8"
                    >
                      확인
                    </Button>
                    <Button
                      variant="modalOutline"
                      onClick={() => setEditingCommentId(null)}
                      className="w-8 h-8 "
                    >
                      취소
                    </Button>
                  </div>
                ) : (
                  <p className="text-sm ">{comment.content}</p>
                )}
              </div>

              {/* 수정 ✏️ / 삭제 🗑️ 버튼 */}
              {!isComplete && !isEditing && isValid && (
                <div className="flex gap-2 ">
                  <button
                    onClick={() =>
                      handleEdit(comment.commentId, comment.content)
                    }
                  >
                    <Icon
                      icon="Setting"
                      className="w-4 h-4 md:w-[14px] md:h-[14px] fill-primary"
                    />
                  </button>
                  <button onClick={() => handleDelete(comment.commentId)}>
                    <Icon
                      icon="Delete"
                      className="w-4 h-4 md:w-[14px] md:h-[14px] fill-warning"
                    />
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* 새 댓글 입력 */}
      {!isComplete && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex gap-3 pt-2 justify-center items-center"
        >
          <img
            src={loggedInUser?.imageUrl}
            alt="User Profile"
            className="w-8 h-8 rounded-full flex-shrink-0"
          />
          <Input
            type="text"
            placeholder="댓글을 입력하세요"
            className="w-full"
            {...register('content')}
          />
          <Button onClick={handleSubmit(onSubmit)} disabled={!isValid}>
            등록
          </Button>
        </form>
      )}
    </div>
  )
}
