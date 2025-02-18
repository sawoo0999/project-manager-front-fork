export interface Comment {
  id: string
  content: string
  nickname: string
  date: string
}

export const MOCK_CARD_DETAIL = {
  data: {
    id: 1,
    title: '회원가입 기능 구현',
    content:
      '회원가입시 DB에 저장\n활용 기술: Json Web Token & Spring Security',
    startDate: '2024-01-10',
    endDate: '2024-01-24',
    completeDate: null,
    categoryColor: '#4E77E0', // Blue color for Backend category
    categoryName: 'Backend',
    nickName: '김나연',
    photoUrl: 'https://example.com/profile/user1.jpg',
  },
  comments: [
    {
      id: 'comment-001',
      content: '회원가입 API 명세서 작성 완료했습니다.',
      nickname: '김나연',
      date: '2024-01-15',
    },
    {
      id: 'comment-002',
      content: '피드백 반영해서 수정했습니다. 확인 부탁드려요.',
      nickname: '이지훈',
      date: '2024-01-16',
    },
    {
      id: 'comment-003',
      content: 'JWT 토큰 만료시간 72시간으로 설정했습니다.',
      nickname: '김나연',
      date: '2024-01-17',
    },
  ],
}
