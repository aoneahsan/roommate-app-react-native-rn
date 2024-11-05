export const reactQueryKeys = {
  mutation: {
    login: ["login"],
    register: ["register"],
    logout: ["logout"],
    updateUserData: ["updateUserData"],
    updateUserStatus: ["updateUserStatus"],
  },

  login: ["login"],
  register: ["register"],
  logout: ["logout"],
  updateUserData: ["updateUserData"],
  updateUserStatus: ["updateUserStatus"],

  dashboardData: "dashboardData",
  engagerDashboard: "engagerDashboard",

  user: {
    getAll: "allUsersData",
    getSingle: "singleUserData",
  },

  game: {
    getAll: "allGamesData",
    getSingle: "singleGameData",
  },

  gameRoom: {
    getAll: "allGameRoomsData",
    getSingle: "singleGameRoomData",
  },

  availableGameRoom: {
    getAll: "allAvailableGameRoomsData",
    getSingle: "singleAvailableGameRoomData",
  },
} as const;
