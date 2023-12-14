<script setup>
import { onMounted, ref, watch, computed } from "vue";
import ClienteService from "../services/ClienteService";
import { useAccessStore } from "../stores/userStore";
import { useUsers } from "../stores/userStore";
import { useRouter } from "vue-router";
import SearchBar from "../components/SearchBar.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import FooterVue from "../components/Footer.vue";
const storeAccess = useAccessStore();
const storeUsers = useUsers();
const cohorts = ref(new Set());
const groups = ref(new Set());
const cohortsAndStudents = ref(new Object());
const groupsAndStudents = ref(new Object());
const router = useRouter();

///////////////////////////////////////////////////////
const currentUsers = ref(storeUsers.users);
const page = ref(1);
const usersPerPage = 6;
const pages = ref([]);

watch(currentUsers, () => {
  setPages();
});

const displayedUsers = computed(() => {
  const from = (page.value - 1) * usersPerPage;
  const to = page.value * usersPerPage;
  return storeUsers.users.slice(from, to);
})

const previusPage = () => {
 if(page.value > 1) {
   page.value--;
 }
}

const nextPage = () => {
 if(page.value < pages.value.length) {
   page.value++;
 }
}

const setPages = () => {
  pages.value = Array.from({length: Math.ceil(storeUsers.users.length / usersPerPage)}, (_, index) => index + 1);
}

////////////////////////////////////////////////////////
onMounted(() => {
  if (!storeAccess.access || !storeAccess.admin) {
    router.push({ name: "login" });
  } else {
    setPages();
    if (
      !Object.values(storeAccess.types)[0] &&
      !Object.values(storeAccess.types)[1]
    ) {
      reload();
    }
  }
});
///////////////////////////////////////////////

const handleSearch = async (dataForm) => {
  if (!dataForm.email) {
    toast.warning("Make sure you enter the email of a user", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
    });
  } else {
    const { data } = await ClienteService.searchByName({
      email: dataForm.email,
    });
    storeUsers.uploadUsers(data);
    currentUsers.value = storeUsers.users;
    storeUsers.uploadEmail("");
  }
};

const DEFAULT = ref("DEFAULT");
const COHORT = ref("COHORT");
const GROUP = ref("GROUP");
const reload = () => {
  DEFAULT.value = "DEFAULT";
  COHORT.value = "COHORT";
  GROUP.value = "GROUP";
  cohorts.value = new Set()
  groups.value = new Set()
  setPages();
  cohortsAndStudents.value = new Object();
  groupsAndStudents.value = new Object();
  storeAccess.resetTypes();
  ClienteService.getAllUsers().then(({ data }) => {
    storeUsers.uploadUsers(data);
    storeUsers.uploadUsersAllAlways(data);

    currentUsers.value = storeUsers.users;
    page.value = 1;
    for (let i = 0; i < storeUsers.users.length; i++) {
      if (!cohorts.value.has(storeUsers.users[i].cohort)) {
        cohorts.value.add(storeUsers.users[i].cohort);
      }
    }
    const cohortsArray = [...cohorts.value];
    cohortsArray.sort();
    cohorts.value = new Set(cohortsArray);
    for (let i = 0; i < storeUsers.users.length; i++) {
      if (storeUsers.users[i].cohort === storeAccess.user.cohort) {
        if (!groups.value.has(storeUsers.users[i].group)) {
          groups.value.add(storeUsers.users[i].group);
        }
      }
    }
    ///////////////////////////////////////////
    cohorts.value.forEach((cohort) => {
      let estudiantes = 0;
      for (let i = 0; i < storeUsers.users.length; i++) {
        if (cohort === storeUsers.users[i].cohort) {
          estudiantes++;
        }
      }
      cohortsAndStudents.value[cohort] = estudiantes;
    });
    ///////////////////////////////////////
    groups.value.forEach((group) => {
      let estudiantes = 0;
      for (let i = 0; i < storeUsers.users.length; i++) {
        if (storeUsers.users[i].cohort === storeAccess.user.cohort) {
          if (group === storeUsers.users[i].group) {
            estudiantes++;
          }
        }
      }
      groupsAndStudents.value[group] = estudiantes;
    });
  });
};
////////////////////////////////////////

const valueOfOrder = (event) => {
  storeAccess.orderUsers(event.target.value);
  currentUsers.value = storeUsers.users;
  setPages();
};
const valueOfFilterOne = (event) => {
  storeAccess.filterUsers(event.target.value);
  currentUsers.value = storeUsers.users;
  setPages();
};

const handleUser = (id) => {
  router.push({ path: `/admin/student-detail/${id}` });
};
</script>

<template>
    <div
      class="Container"
      v-if="storeAccess.access"
      >
      <div class="ppal">
      <h1 class="title">ADMIN DASHBOARD</h1>

      <div class="containerCohorteGroup">
        <div class="boxgc">
          <h2 class="title_Cohorte_Groups">Cohorts</h2>
          <div class="container2">
            <div v-for="cohort in cohorts" :key="cohort">
              <p class="parrafo">
                <span class="span">{{ cohort }} = {{ cohortsAndStudents[cohort] }}</span>
              </p>
            </div>
          </div>
        </div>
        <div class="boxgc">
          <h2 class="title_Cohorte_Groups">Groups</h2>
          <div class="container2">
            <div v-for="group in groups" :key="group">
              <p class="parrafo">
                <span class="span">{{ group }} = {{ groupsAndStudents[group] }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        class="container-filtros"
      >
        <select
          class="filtros"
          name="valueOfOrder"
          id=""
          @change="valueOfOrder"
          v-model="DEFAULT"
        >
          <option value="DEFAULT" selected>Order</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="CohortA">Lower to Higher</option>
          <option value="CohortD">Higher to Lower</option>
          <option value="GroupA">Lower to Higher</option>
          <option value="GroupD">Higher to Lower</option>
          <option value="DEFAULT" disabled>-- Order By Group --</option>
          <option value="DEFAULT" disabled>-- Order By Cohort --</option>
          <option value="DEFAULT" disabled>-- Order By Email --</option>
        </select>

        <select
          class="filtros"
          name=""
          id=""
          v-model="COHORT"
          @change="valueOfFilterOne"
        >
          <option value="COHORT" selected>Filter By Cohort</option>
          <option
            v-for="cohort in cohorts"
            :value="cohort"
            :key="`${cohort}filter`"
          >
            {{ cohort }}
          </option>
        </select>

        <select
          class="filtros"
          name=""
          id=""
          v-model="GROUP"
          @change="valueOfFilterOne"
        >
          <option value="GROUP" selected>Filter By Group</option>
          <option
            v-for="group in groups"
            :value="group"
            :key="`${group}filter`"
          >
            {{ group }}
          </option>
        </select>

        <button
          class="filtros"
          @click="reload"
        >
          Reload
        </button>
        <a
          class="filtros"
          href="https://henry-sup.netlify.app/" 
          target="_blank"
        >
          Asistencia
        </a>
      </div>

      <div class="container3">
        <div class="w-1/2">
          <h1 class="title">Students</h1>
          <SearchBar class="search" @handle-search="handleSearch" :emailProp="email" />
        </div>
        <div class="paginado">
          <button
            v-if="pages.length > 1"
            type="button"
            :class="['botonPrev-Next', { 'cursor-not-allowed': page === 1 }]"
            @click="previusPage"
            :disabled="page === 1"
          >
            Prev
          </button>

            <button
              type="button"
              v-for="pageNumber in pages"
              @click="page = pageNumber"
              :key="pageNumber"
              :class="['bg-container py-[2px] px-[10px] m-[2px] border border-details rounded-md text-title font-bold hover:bg-details hover:text-container', { 'text-container bg-border': page === pageNumber }]"
            >
              {{ pageNumber }}
            </button>

          <button
            v-if="pages.length > 1"
            type="button"
            @click="nextPage"
            :disabled="page === pages.length"
            :class="['botonPrev-Next', { 'cursor-not-allowed': page === pages.length }]"
          >
            Next
          </button>
        </div>
      </div>

      <div       
        class="container-usuarios"
        v-if="storeAccess.admin">
        <div
          v-for="user in displayedUsers"
          class="usuario"
          :key="user._id"
          @click="handleUser(user._id)"
        >
          <div class="correo"><p>{{ user.email }}</p></div>
          <p>Cohort: {{ user.cohort }}</p>
          <p>Group: {{ user.group }}</p>
        </div>
      </div>
    </div>
    </div>
<FooterVue />
</template>

<style lang="scss" scoped>
  .Container {

    background-color: var(--body);
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem;
    font-size: 1.5rem;
  }

  .boxgc{
    margin: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 600px;
  }
  .title {
    border-radius: 10px;
    color: var(--title);
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 15px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .ppal{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 80px;
  }
  .containerCohorteGroup {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .title_Cohorte_Groups {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 300px;
    height: 45px;
    color: var(--title);
    border: 2px solid var(--border);
    background-color: var(--container);
    margin-left: 100px;
    margin-right: 100px;
    margin-bottom: 20px;
    border-radius: 10px;
    font-weight: bold;
  }
  .container2 {
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    color: white;
    margin-left: 115px;
    margin-right: 110px;
  }
  .parrafo {
    border: 1px solid var(--border);
    border-radius: 8px;
    background-color: var(--container);
    margin-bottom: 40px;
    width: 100px;
    display: flex;
    align-items: center;
    flex-direction: column;
    color: var(--title);
  }
  .container-filtros{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 89%;
    padding: 10px;
    margin-bottom: 1rem;
  }
  .filtros {
    display: flex;
    align-items: center;
    flex-direction: column;
    font-weight: bold;
    color: var(--title);
    font-size: 1.25rem;
    width: fit-content;
    background-color: var(--container);
    padding: 0.75rem; 
    border-radius: 10px; 
    transition: 0.5s;
    border: 2px solid var(--details);
  }
  .filtros:hover {
    background-color: var(--border);
    color: var(--title);
  }
  .container3 {
    display: flex;
    align-items: center;
    flex-direction: row;
    width: 87%;
    justify-content: space-between;
    margin-bottom: 15px;
    border: solid 1px var(--border);
    border-radius: 10px;
    background-color: var(--container);
  }
  .container-usuarios {
    background-color: var(--container);
    border-radius: 10px;
    padding: 0.5rem;
    width: 88%;
    border: 1px solid var(--border);
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* Dividir en 3 columnas */
    align-items: center;
    justify-items: center;
    color: var(--title);
  }
  .container-usuarios > * {
    grid-column: span 1;
  }
  .container-usuarios > *:nth-child(3n+1) {
    grid-column: 1;
  }
  .container-usuarios > *:nth-child(3n+2) {
    grid-column: 2;
  }
  .container-usuarios > *:nth-child(3n+3) {
    grid-column: 3;
  }
  .usuario {
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--body);
    margin: 0.5rem;
    border: 1px solid var(--details);
    cursor: pointer;
    transition: 0.3s;
    border-radius: 10px;
    padding: 2px;
    color: var(--title);
  }

  .correo{
    text-align: center;
    width: 290px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .usuario:hover {
    background-color: #fbbf24;
    color: black;
    border: 1px solid var(--border);
  }
  .paginado {
    width: 50%;
    display: flex; 
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 5px;
  }
  // .number {
  //   background-color: var(--container);
  //   border-radius: 10px;
  //   color: var(--title);
  //   font-weight: bold;
  //   padding: 2px 10px;
  //   margin: 2px;
  //   transition: 0.3s;
  //   cursor: pointer;
  //   border: solid 1px var(--border);
  // }
  // .number:hover {
  //   background-color: var(--details);
  //   color: var(--container);
  // }
 
  .botonPrev-Next {  
    background-color: var(--container);
    border-radius: 10px;
    color: var(--title);
    font-weight: bold;
    transition: 0.3s;
    border: solid 1px var(--details);
    width: 100%;
  
  }
  .botonPrev-Next:hover {
    background-color: var(--details);
    color: var(--container);
  }


@media (max-width: 680px) {
  .containerCohorteGroup {
    display: flex;
    flex-wrap: nowrap;
    height: 450px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .boxgc{
    margin: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 300px;
  }

  .container-filtros{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 89%;
    height: 350px;
    padding: 10px;
    margin-bottom: 1rem;
  }


  .filtros {
    margin: 10px;
  }

  .container3{
    margin-top: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
    height: 400px;
  }

  .search{
    scale: 0.9;
  }

  .paginado {
    flex-wrap: wrap;
    width: 300px;
    height: 400px;
  }

  .container-usuarios {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: 800px;
    width: 100%;
    align-items: center;
    justify-content: center;

  }
}
</style>