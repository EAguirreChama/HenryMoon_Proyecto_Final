<script setup>
import { ref, onMounted } from "vue";
import ClienteService from "../services/ClienteService";
import { useAccessStore } from "../stores/userStore";
const storeAccess = useAccessStore()
const rankingOptions = [
  { id: 1, name: "Global", active: true },
  { id: 2, name: "Cohort", active: false },
  { id: 3, name: "Group", active: false },
];
const selectedRanking = ref(1);
const selectRanking = (selectedOption) => {
  rankingOptions.forEach((option) => {
    option.active = option.id === selectedOption.id;
  });
  selectedRanking.value = selectedOption.id;
};
const allUsers = ref([]);

onMounted(async () => {

  rankingOptions.forEach((option) => {
    option.active = option.id === 1;
  });

  const resultsGlobal = await ClienteService.getGlobalRanking();
  const resultCohorts = await ClienteService.getAllCohorts();
  const resultGroups = await ClienteService.getAllGroups(storeAccess.user.cohort)

  allUsers.value = resultsGlobal.data;
  cohorts.value = resultCohorts.data;
  groups.value = resultGroups.data

});

const selectedCohort = ref("DEFAULT");
const cohorts = ref([]);
const usersByCohort = ref([]);
const usersByGroup = ref([]);
const selectedGroup = ref("DEFAULT");
const groups = ref([]);

const filteredUsersByCohort = async () => {

  const { data } = await ClienteService.getCohortRanking(selectedCohort.value);
  usersByCohort.value = [...data]
};

const filteredUsersByGroup = async () => {
  const { data } = await ClienteService.getGroupRanking(storeAccess.user.cohort, selectedGroup.value);
  usersByGroup.value = [...data]
};

const counter = ref(0)

</script>

<template>
  <div class="ranking-container">
    <div class="flex flex-row w-full options">
      <div v-for="option in rankingOptions" :key="option.id" :class="{ 'ranking-option': true, active: option.active }"
        @click="selectRanking(option)">
        {{ option.name }}
      </div>
    </div>
    <div class="points-container h-[900px]" v-if="selectedRanking === 1">
      <h2 class="allUsers text-xl mb-3">Total Scores All Users</h2>
      <ul class="w-full p-3" >
        <!-- {{ user?.user[0]?.name }} -->
        <div class="w-full flex flex-row justify-between py-2 px-3 row-color" v-for="(user, i) in allUsers" :key="user.id" :class="{ 'highlighted-user': user?.user[0]?.name === storeAccess.user.name }">
          <!-- <span>{{ i + 1 }}.  {{ user?.user[0]?.name }}</span> <span>Score: {{ user.total }}</span> -->
          <span class="w-52 text-ellipsis overflow-hidden whitespace-nowrap">{{ i + 1 }}.  {{ user?.user[0]?.name }}</span> <span>Score: {{ user.total }}</span>
        </div>
      </ul>
    </div>
    <div   v-if="selectedRanking === 2">
      <div class="points-container h-[900px]">
        <h2 >Scores by Cohort</h2>
        <label for="cohortFilter">Choose a Cohort:</label>
        <select
        class="text-title text-md w-fit bg-container p-2 m-3 rounded-md border cursor-pointer border-border hover:bg-border hover:text-title"
          id="cohortFilter" @change="filteredUsersByCohort" v-model="selectedCohort">
          <option value="DEFAULT" selected>Select</option>
          <option v-for="cohort in cohorts" :value="cohort" :key="cohort">
            {{ cohort }}
          </option>
        </select>
        <ul class="w-full p-3">

          <div class="w-full flex flex-row justify-between py-2 px-3 row-color" v-for="(user, i) in usersByCohort" :key="user.user[0].name"
            :class="{ 'highlighted-user': user.user[0].name === storeAccess.user.name }"
          >

            {{ i + 1 }}. {{ user.user[0].name }} <span>Score: {{ user.total }} </span>
          </div>
        </ul>
      </div>
    </div>
    <div class="points-container h-[900px]"
      v-if="selectedRanking === 3">
      <h2>Scores by Group of the {{ storeAccess.user.cohort }}</h2>
      <label for="groupFilter">Choose a Group:</label>
      <select
        class="text-title text-md w-fit bg-container p-2 m-3 rounded-md border border-border hover:bg-border hover:text-title"
        id="groupFilter" @change="filteredUsersByGroup" v-model="selectedGroup">
        <option value="DEFAULT" selected>Select</option>
        <option v-for="group in groups" :value="group" :key="group">
          {{ group }}
        </option>
      </select>
      <ul class="w-full p-3">
        <div class="w-full flex flex-row justify-between py-2 px-3 row-color" v-for="(user, i) in usersByGroup" :key="user.user[0]._id"
            :class="{ 'highlighted-user': user.user[0].name === storeAccess.user.name }"
          >
          {{ i + 1 }}. {{ user?.user[0]?.name }} <span>Score: {{ user.total }}</span> 
        </div>
      </ul>
    </div>
  </div>
</template>

<style>

.ranking-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: .95rem;
}

.ranking-option {
  flex: 1;
  padding: 2px;
  color: var(--container);
  background-color: var(--title);
  cursor: pointer;
  text-align: center;
  height: 35px;
  font-size: large;
  font-weight: 500;
  border: solid 1px var(--border);
  border-radius: 10px 10px 0 0;
}

.ranking-option:hover {
  background-color: var(--body);
  color: var(--title);
  font-weight: bold;
}

.ranking-option.active {
  background-color: var(--body);
  color: var(--details);
  border: solid 1px var(--title);
}

.points-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  color: var(--title);
  width: 100%;
  padding: 5px;
  background-color: var(--container);
  border-radius: 1px 1px 10px 10px;
  font-weight: bold;
  overflow-y: auto;
  margin-top: 2px;
  border: solid 1px var(--title);
}

@media (max-width: 600px) {
  .points-container {
    font-size: .7rem;
  }
  .allUsers{
    font-size: .9rem;
  }
}

@media (max-width: 291px) {
  .options{
    font-size: .8rem;
  }
}

.row-color:nth-child(odd) {
  background-color: hsl(222, 47%, 18%);
}

.highlighted-user {
  color: var(--details);
}
</style>
