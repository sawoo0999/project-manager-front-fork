import MetaInfoField from './MetaInfo'

interface AssigneeFieldProps {
  name: string
  photoUrl?: string
}

export function AssigneeField({ name, photoUrl }: AssigneeFieldProps) {
  return (
    <MetaInfoField label="담당자">
      <img
        src={photoUrl}
        alt="프로필"
        className="rounded-full w-5 sm:w-6 md:w-7 h-5 sm:h-6 md:h-7"
      />
      <span className="text-xs text-cardDate">{name}</span>
    </MetaInfoField>
  )
}
