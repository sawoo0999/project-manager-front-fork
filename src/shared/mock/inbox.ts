export type NotificationType = 'TASK' | 'INVITE' | 'COMMENT'

export interface NotificationItem {
  id: string
  title: string
  content: string
  type: string
}

export interface NotificationResponse {
  data: NotificationItem[]
}

export const dummyData: NotificationResponse = {
  data: [
    {
      id: '1',
      title: '업무 마감일이 다가옵니다!',
      content: 'ProjectManager의 회원가입 구현 카드 마감까지 D-1',
      type: 'task',
    },
    {
      id: '2',
      title: '프로젝트에 초대되었습니다!',
      content:
        'junbin님으로 부터 ProjectManager 프로젝트 초대 요청이 왔습니다.',
      type: 'invite',
    },
    {
      id: '3',
      title: '업무 마감일이 다가옵니다!',
      content: 'ProjectManager의 로그인 토큰과 세션 카드 마감까지 D-2',
      type: 'task',
    },
    {
      id: '4',
      title: '내 활동에 댓글이 달렸습니다!',
      content:
        "ProjectManager의 회원가입 구현 junbin님의 댓글 '이 부분 이렇게 수정하면 더 좋을 것 같아요'",
      type: 'comment',
    },
    {
      id: '5',
      title: '프로젝트에 초대되었습니다!',
      content:
        'nayeon님으로 부터 JavaScript-study 프로젝트 초대 요청이 왔습니다.',
      type: 'invite',
    },
    {
      id: '6',
      title: '업무 마감일이 다가옵니다!',
      content: 'ProjectManager의 로그인 토큰과 세션 카드 마감까지 D-2',
      type: 'task',
    },
  ],
}
