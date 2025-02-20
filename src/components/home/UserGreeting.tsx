interface UserGreetingProps {
  user: string
}

const formatDate = () => {
  const now = new Date()
  const month = now.getMonth() + 1
  const date = now.getDate()
  const dayNames = ['일', '월', '화', '수', '목', '금', '토']
  const day = dayNames[now.getDay()]
  return `${month}월 ${date}일 ${day}요일`
}

const UserGreeting = ({ user }: UserGreetingProps) => {
  return (
    <div className="text-center text-base">
      {formatDate()} <span className="font-semibold">{user}</span> 님
      안녕하세요!
    </div>
  )
}

export default UserGreeting
