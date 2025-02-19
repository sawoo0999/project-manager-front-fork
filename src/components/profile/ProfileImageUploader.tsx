import { Button } from '@/shared/ui/common/button'
import { Camera } from 'lucide-react'
import { Link } from 'react-router-dom'

interface ProfileImageUploaderProps {
  imageUrl: string
  onChange: (image: string) => void
  onRemove: () => void
}

const ProfileImageUploader = ({
  imageUrl,
  onChange,
  onRemove,
}: ProfileImageUploaderProps) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        onChange(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <>
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
          <img
            src={imageUrl}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <label className="absolute bottom-0 right-0 cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Camera className="w-4 h-4 text-white" />
          </div>
        </label>
      </div>
      <div className="flex h-auto items-center justify-center gap-3 mb-5">
        <Link
          to="/password"
          className="h-auto p-2 inline-flex items-center justify-center gap-[2px] whitespace-nowrap rounded-button text-xs md:text-sm font-medium transition-colors  disabled:pointer-events-none border  border-primary bg-white text-primary hover:bg-primary hover:text-white "
        >
          비밀번호 변경하기
        </Link>
        <Button
          variant="modalOutline"
          className="text-xs "
          onClick={onRemove}
          type="button"
        >
          사진 제거
        </Button>
      </div>
    </>
  )
}

export default ProfileImageUploader
