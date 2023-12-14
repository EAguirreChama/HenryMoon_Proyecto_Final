import { ref, onMounted, watch } from "vue";
import ClienteService from "../services/ClienteService";
import { defineStore } from "pinia";

export const useUsers = defineStore("users", () => {
  const users = ref([]);
  const email = ref('')
  const uploadEmail = (data) => {
    email.value = data
  }
  const usersLength = ref(users.value.length)
  const usersAllAlways = ref([]);
  const uploadUsers = (usersInfo) => {
    users.value = [...usersInfo];
    usersLength.value = users.value.length
  };
  const uploadUsersAllAlways = (usersInfo) => {
    usersAllAlways.value = [...usersInfo];
  };

  watch(users, () => {
    localStorage.setItem("usersAll", JSON.stringify(users.value));
  });
  onMounted(() => {
    const usersAllStorage = localStorage.getItem("usersAll");
    if (usersAllStorage) {
      users.value = JSON.parse(usersAllStorage);
      usersLength.value = users.value.length
    }
  });
  return { email, uploadEmail, users, usersAllAlways, usersLength, uploadUsers, uploadUsersAllAlways };
});

export const useAccessStore = defineStore("access", () => {
  const storeOfUsers = useUsers();
  const types = ref({
    filterCohort: "",
    filterGroup: "",
  });
  const user = ref({}); // ! USER
  const admin = ref(false);
  const access = ref(false);
  const completeProfile = ref({});

  // ! /////////

  const resetTypes = () => {
    types.value.filterCohort = "";
    types.value.filterGroup = "";
  };

  // Para notificaciones del nuevo chat

  const addNotifications = (room) => {
    if (user.value.newMessages[room]) {
      user.value.newMessages[room] = user.value.newMessages[room] + 1;
    } else {
      user.value.newMessages[room] = 1;
    }
  };

  const resetNotifications = (room) => {
    delete user.value.newMessages[room];
  };

  // ! /////////

  const login = (data) => {
    access.value = true;
    user.value = { ...data };
  };
  const logOut = () => {
    access.value = false;
    user.value = {}
    admin.value = false;
    localStorage.setItem("admin", JSON.stringify(false));
  };
  const updateProfile = (data) => {
    (completeProfile.value.name = data.name),
      (completeProfile.value.email = data.email),
      (completeProfile.value.image = data.image);

      user.value = {...data}
  };
  const updateAdmin = (data) => {
    if (data.email === "henrymoon.latam@gmail.com" && access.value) {
      admin.value = true;
      ClienteService.getAllUsers()
        .then(({ data }) => storeOfUsers.uploadUsers(data))
    }
  };

  const orderUsers = (case_) => {
    let orderedUsers;
    let orderedUsersAllAlways;
    switch (case_) {
      case "Z-A":
        orderedUsers = storeOfUsers.users.sort((a, b) =>
          a.email < b.email ? 1 : -1
        );
        orderedUsersAllAlways = storeOfUsers.usersAllAlways.sort((a, b) =>
          a.email < b.email ? 1 : -1
        );
        storeOfUsers.uploadUsers(orderedUsers);
        storeOfUsers.uploadUsersAllAlways(orderedUsersAllAlways);
        break;
      case "CohortA":
        orderedUsers = storeOfUsers.users.sort((a, b) =>
          +a.cohort.split("").slice(0, 2).join("") >
          +b.cohort.split("").slice(0, 2).join("")
            ? 1
            : -1
        );
        orderedUsersAllAlways = storeOfUsers.usersAllAlways.sort((a, b) =>
          +a.cohort.split("").slice(0, 2).join("") >
          +b.cohort.split("").slice(0, 2).join("")
            ? 1
            : -1
        );
        storeOfUsers.uploadUsers(orderedUsers);
        storeOfUsers.uploadUsersAllAlways(orderedUsersAllAlways);
        break;
      case "CohortD":
        orderedUsers = storeOfUsers.users.sort((a, b) =>
          +a.cohort.split("").slice(0, 2).join("") <
          +b.cohort.split("").slice(0, 2).join("")
            ? 1
            : -1
        );
        orderedUsersAllAlways = storeOfUsers.usersAllAlways.sort((a, b) =>
          +a.cohort.split("").slice(0, 2).join("") <
          +b.cohort.split("").slice(0, 2).join("")
            ? 1
            : -1
        );
        storeOfUsers.uploadUsers(orderedUsers);
        storeOfUsers.uploadUsersAllAlways(orderedUsersAllAlways);
        break;
      case "GroupA":
        orderedUsers = storeOfUsers.users.sort((a, b) =>
          +a.group > +b.group ? 1 : -1
        );
        orderedUsersAllAlways = storeOfUsers.usersAllAlways.sort((a, b) =>
          +a.group > +b.group ? 1 : -1
        );
        storeOfUsers.uploadUsers(orderedUsers);
        storeOfUsers.uploadUsersAllAlways(orderedUsersAllAlways);
        break;
      case "GroupD":
        orderedUsers = storeOfUsers.users.sort((a, b) =>
          +a.group < +b.group ? 1 : -1
        );
        orderedUsersAllAlways = storeOfUsers.usersAllAlways.sort((a, b) =>
          +a.group < +b.group ? 1 : -1
        );
        storeOfUsers.uploadUsers(orderedUsers);
        storeOfUsers.uploadUsersAllAlways(orderedUsersAllAlways);
        break;
      default:
        orderedUsers = storeOfUsers.users.sort((a, b) =>
          a.email > b.email ? 1 : -1
        );
        orderedUsersAllAlways = storeOfUsers.usersAllAlways.sort((a, b) =>
          a.email > b.email ? 1 : -1
        );
        storeOfUsers.uploadUsers(orderedUsers);
        storeOfUsers.uploadUsersAllAlways(orderedUsersAllAlways);
        break;
    }
  };

  const filterUsers = (case_) => {
    let result = [];
    if (
      types.value.filterCohort !== "" &&
      !isNaN(+case_) &&
      case_ !== "COHORT"
    ) {
      result = result.length
        ? result.filter((user) => user.cohort === types.value.filterCohort)
        : storeOfUsers.usersAllAlways.filter(
            (user) => user.cohort === types.value.filterCohort
          );
    } else if (
      types.value.filterGroup !== "" &&
      isNaN(+case_) &&
      case_ !== "GROUP"
    ) {
      
      result = result.length
        ? result.filter((user) => user.group === types.value.filterGroup)
        : storeOfUsers.usersAllAlways.filter(
            (user) => user.group === types.value.filterGroup
          );
    } else {
      
      result = storeOfUsers.usersAllAlways;
    }
    let filteredUsers;
    if (isNaN(+case_) && case_ !== "COHORT" && case_ !== "GROUP") {
      filteredUsers = result.filter((user) => user.cohort === case_);
      types.value.filterCohort = case_;
    } else if (isNaN(+case_) && case_ === "COHORT") {
      storeOfUsers.uploadUsers(result);
      types.value.filterCohort = "";
      return;
    } else if (case_ === "GROUP") {
      if (types.filterCohort !== "") {
        result = result.filter(
          (user) => user.cohort === types.value.filterCohort
        );
        storeOfUsers.uploadUsers(result);
      } else {
        storeOfUsers.uploadUsers(result);
      }
      types.value.filterGroup = "";
      return;
    } else {

      filteredUsers = result.filter((user) => user.group === case_);
      types.value.filterGroup = case_;
    }
    storeOfUsers.uploadUsers(filteredUsers);
  };
  ///////////////////////////////////////////////////////////////
 
 
  watch(admin, () => {
    localStorage.setItem("admin", JSON.stringify(admin.value));
  });
  onMounted(() => {
    const adminStorage = localStorage.getItem("admin");
    if (adminStorage) {
      admin.value = JSON.parse(adminStorage);
    }
  });

  watch(user, () => {
    localStorage.setItem("user", JSON.stringify(user.value));
  });
  onMounted(() => {
    const userStorage = localStorage.getItem("user");
    if (userStorage) {
      user.value = JSON.parse(userStorage);
    }
  });

  watch(access, () => {
    localStorage.setItem("access", JSON.stringify(access.value));
  });
  onMounted(() => {
    const accessStorage = localStorage.getItem("access");
    if (accessStorage) {
      access.value = JSON.parse(accessStorage);
    }
  });

  return {
    access,
    user,
    admin,
    completeProfile,
    types,
    updateProfile,
    updateAdmin,
    filterUsers,
    login,
    logOut,
    orderUsers,
    addNotifications,
    resetNotifications,
    resetTypes,
  };
});

export const useUserInfo = defineStore("user", () => {
  const user = ref({});
  const uploadUser = (userInfo) => {
    user.value = { ...userInfo };
  };
  return { user, uploadUser };
});

export const useChatStore = defineStore("chat", {
  state: () => ({
    message: "",
    messages: [],
  }),
  actions: {
    addMessage(message) {
      this.messages.push(message);
    },
    clearMessage() {
      this.message = "";
    },
  },
});
