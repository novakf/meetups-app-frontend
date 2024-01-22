import { SpeakerType } from '../types'
import avatar1 from './assets/avatar1.png'
import avatar2 from './assets/avatar2.png'
import avatar3 from './assets/avatar3.png'
import avatar4 from './assets/avatar4.jpg'
import avatar5 from './assets/avatar5.jpg'
import avatar6 from './assets/avatar6.png'
import avatar7 from './assets/avatar7.png'
import avatar8 from './assets/avatar8.jpg'

export default [
  {
    id: 1,
    name: 'Никита Иванов',
    phone: '8(987)498-3948',
    email: 'nik@mail.ru',
    avatarImg: avatar1,
    status: 'активный',
    organization: 'SberTech',
    description: 'Исследователь Computer Vision в Google',
  },
  {
    id: 2,
    name: 'Алиса Измайлова',
    phone: '8(193)384-4857',
    email: 'alice@mail.ru',
    avatarImg: avatar2,
    status: 'активный',
    organization: null,
    description:
      'Director of Artificial Intelligence в NVIDIA. Ранее работал инженером по разработке ПО в IBM. Затем около 5 лет работал в Samsung Electronics',
  },
  {
    id: 3,
    name: 'Тимур Максимов',
    phone: '8(895)485-4854',
    email: 'tim@gmail.com',
    avatarImg: avatar3,
    status: 'активный',
    organization: 'Mail.ru',
    description:
      'к. ф.-м.н., руководитель исследовательской группы байесовских методов, начальник департамента больших данных и информационного поиска факультета компьютерных наук НИУ ВШ',
  },
  {
    id: 4,
    name: 'Дмитрий Викторов',
    phone: '8(845)485-4857',
    email: 'vict@mail.ru',
    avatarImg: avatar4,
    status: 'активный',
    organization: 'Yandex',
    description: 'Основатель группы компаний EORA',
  },
  {
    id: 5,
    name: 'Сергей Михайлов',
    phone: '8(845)485-4857',
    email: 'vict@mail.ru',
    organization: 'Yandex',
    status: 'активный',
    avatarImg: avatar5,
    description:
      'К.ф.-м.н., руководитель направления «Kaspersky Neuromorphic Platform», базирующемся на импульсных нейронных сетях (SNN) и нейроморфном чипе Алтай, руководитель разработки системы предиктивной аналитики "Kaspersky Machine Learning for Anomaly Detection"',
  },
  {
    id: 6,
    name: 'Алексей Соболев',
    phone: '8(845)485-4857',
    email: 'vict@mail.ru',
    status: 'активный',
    avatarImg: avatar6,
    organization: 'Ozon',
    description:
      'Лидер команды компьютерного зрения. С 2015 года занимается компьютерным зрением, множество проектов от ADAS до систем сличения амурских тигров. С 2020 года возглавляет в SberDevices команду CV.',
  },
  {
    id: 7,
    name: 'Евгений Анисимов',
    phone: '8(845)485-4857',
    email: 'vict@mail.ru',
    organization: 'Tesla',
    status: 'активный',
    avatarImg: avatar7,
    description:
      'Основатель Aigents, архитектор по ИИ и блокчейну SingularityNET, ведущий специалист НГУ, организатор и модератор AGI-in-Russian',
  },
  {
    id: 8,
    name: 'Михаил Иванов',
    phone: '8(845)485-4857',
    email: 'vict@mail.ru',
    organization: 'VK',
    status: 'активный',
    avatarImg: avatar8,
    description:
      'Руководитель отдела искусственного интеллекта Цифрум (Росатом). Работал в ABBYY, Medcore, TNK-BP, Microtest, Связной. Визионер в области нейроморфных систем искусственного интеллекта.',
  },
] as SpeakerType[]
