export type MeetupStatusType = 'черновик' | 'удален' | 'сформирован' | 'завершен' | 'отклонен'

export type SpeakerStatusType = 'активный' | 'удален'

export type UserRoleType = 'участник' | 'организатор' | 'модератор'

export type MeetupsType = {
  id: number
  status: string
  date?: string
  place?: string
  title?: string
  description?: string
  preview?: string
  updatedAt?: string
  confirmedAt?: string
  createdAt: string
  creatorLogin?: string
  moderatorLogin?: string
  speakers?: SpeakerType[]
  MeetupsSpeakers?: MeetupsSpeakersType[]
}

export type SpeakerType = {
  id: number
  name: string
  phone: string
  email: string
  avatarImg?: string
  status: SpeakerStatusType
  organization?: string
  description: string
}

export type MeetupsSpeakersType = {
  meetupId: number
  speakerId: number
  startsAt?: string
  endsAt?: string
  reportTheme?: string
  reportDescription?: string
}

export type UserType = {
  id: number
  name: string
  phone?: string
  email: string
  password: string
  avatarImg?: string
  role: UserRoleType
}
