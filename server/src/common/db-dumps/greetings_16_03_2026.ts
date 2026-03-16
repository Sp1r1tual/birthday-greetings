//!Дамп бази на випадок, якщо вона заморозиться
export const HARDCODED_GREETINGS = [
  {
    _id: '69b6a00dc17646067db4d0d7',
    name: 'Олег',
    city: 'Львів',
    greetings:
      "Бажаю здоров'я, мирного неба, успіхів у житті, здійснення мрій і всьо, я більше не придумав 😅🫡🙃",
    createdAt: new Date('2026-03-15T12:03:25.155Z'),
    updatedAt: new Date('2026-03-15T12:03:25.155Z'),
  },
  {
    _id: '69b6a7d0a9338136d76a76dd',
    name: 'Higashi',
    city: 'Kyoto',
    greetings: 'Щастя, здоровля і мнагая літа!',
    createdAt: new Date('2026-03-15T12:36:32.829Z'),
    updatedAt: new Date('2026-03-15T12:36:32.829Z'),
  },
  {
    _id: '69b6a91fa9338136d76a76e9',
    name: 'yurin',
    city: 'Seoul',
    greetings: 'Happy birthday!!!! З днем народження! 誕生日おめでとー',
    createdAt: new Date('2026-03-15T12:42:07.779Z'),
    updatedAt: new Date('2026-03-15T12:42:07.779Z'),
  },
  {
    _id: '69b6c33f99dea800473f189d',
    name: 'Nazarii',
    city: 'Warsaw 😭',
    greetings: 'Work is not permanent, as well as life. Enjoy the moments ⛰️',
    createdAt: new Date('2026-03-15T14:33:35.729Z'),
    updatedAt: new Date('2026-03-15T14:33:35.729Z'),
  },
  {
    _id: '69b70a612b959e9ec074b6ca',
    name: 'Віка',
    city: 'Львів',
    greetings:
      "з Днем народження! бажаю міцного здоров'я, щастя та безліч радісних моментів у житті, нехай здійснюються всі мрії 🎉",
    createdAt: new Date('2026-03-15T19:37:05.789Z'),
    updatedAt: new Date('2026-03-15T19:37:05.789Z'),
  },
  {
    _id: '69b70d16b0c714cf587f7cf9',
    name: 'Матвій',
    city: 'Запитів',
    greetings:
      'Нехай тебе завжди переповнює вдача та впевненість у тому що ти робиш, продовжуй випромінювати таку ж щирість та доброту якою ти тішиш нас завжди♥️',
    createdAt: new Date('2026-03-15T19:48:38.346Z'),
    updatedAt: new Date('2026-03-15T19:48:38.346Z'),
  },
  {
    _id: '69b49055fa7797d311ada4d6',
    name: 'Андрій',
    city: 'Запитів',
    greetings: 'З Днем народження!',
    createdAt: new Date('2026-03-15T22:00:00.000Z'),
    updatedAt: new Date('2026-03-15T22:00:00.000Z'),
  },
  {
    _id: '69b82c9a2190c5d38673e6e0',
    name: 'EA_Vlad',
    city: 'ІФ',
    greetings:
      'Щоб в спину завжди дув попутний golden wind і все збувалось 🌀🎉',
    createdAt: new Date('2026-03-16T16:15:22.242Z'),
    updatedAt: new Date('2026-03-16T16:15:22.242Z'),
  },
  {
    _id: '69b82db92190c5d38673e6e7',
    name: 'Roma',
    city: 'Morioh',
    greetings:
      'Вітаю з ДН 🎉 Бажаю тобі всього найкращого і щоб сьогодні тобі приснилася Азуса Хамаока 🎁',
    createdAt: new Date('2026-03-16T16:20:09.414Z'),
    updatedAt: new Date('2026-03-16T16:20:09.414Z'),
  },
  {
    _id: '69b83f40b56279dc546bf46f',
    name: 'Денис',
    city: 'Івано-Франківськ',
    greetings: 'Reaching the line just to start again',
    createdAt: new Date('2026-03-16T17:34:56.023Z'),
    updatedAt: new Date('2026-03-16T17:34:56.023Z'),
  },
];

export const HARDCODED_IDS = new Set(HARDCODED_GREETINGS.map((g) => g._id));
