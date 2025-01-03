<template>
  <template v-if="!isLogged">
    <div
        class="h-full flex flex-col items-center justify-center space-y-4 container mx-auto text-center max-w-4xl -mt-14">
      <p>Kami Di Sini untuk Membantu Anda</p>
      <p class="text-4xl">"Quiz sederhana dan data mendalam untuk mendukung hidup sehat dan bahagia Anda"</p>
      <NuxtLink to="/register"
                class="py-2 px-2.5 inline-flex items-center font-medium text-sm rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 focus:outline-none focus:bg-cyan-700 disabled:opacity-50 disabled:pointer-events-none">
        Coba Sekarang
      </NuxtLink>
    </div>
  </template>

  <template v-else>
    <div class="max-w-[85rem] mx-auto p-6 space-y-6">

      <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        <!-- Card -->
        <div class="flex flex-col bg-white border shadow-sm rounded-xl">
          <div class="p-4 md:p-5">
            <div class="flex items-center gap-x-2">
              <p class="text-xs uppercase tracking-wide text-gray-500">
                Quizzes Completed
              </p>
            </div>

            <div class="mt-1 flex items-center gap-x-2">
              <h3 class="text-xl sm:text-2xl font-medium text-gray-800">
                {{ stats.quizCompleted }}
              </h3>
            </div>
          </div>
        </div>
        <!-- End Card -->

        <!-- Card -->
        <div class="flex flex-col bg-white border shadow-sm rounded-xl">
          <div class="p-4 md:p-5">
            <div class="flex items-center gap-x-2">
              <p class="text-xs uppercase tracking-wide text-gray-500">
                Total Score
              </p>
            </div>

            <div class="mt-1 flex items-center gap-x-2">
              <h3 class="text-xl sm:text-2xl font-medium text-gray-800">
                {{ stats.totalScore }}
              </h3>
            </div>
          </div>
        </div>
        <!-- End Card -->

        <!-- Card -->
        <div class="flex flex-col bg-white border shadow-sm rounded-xl">
          <div class="p-4 md:p-5">
            <div class="flex items-center gap-x-2">
              <p class="text-xs uppercase tracking-wide text-gray-500">
                Health Grade
              </p>
            </div>

            <div class="mt-1 flex items-center gap-x-2">
              <h3 class="text-xl sm:text-2xl font-medium text-gray-800">
                {{ stats.lastTestStatus }}
              </h3>
            </div>
          </div>
        </div>
        <!-- End Card -->
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <!-- Card -->
        <div
            class="p-4 md:col-span-2 md:p-5 min-h-[410px] flex flex-col bg-white border shadow-sm rounded-xl">
          <!-- Header -->
          <div class="flex justify-between items-center">
            <div>
              <h2 class="text-sm text-gray-500">
                Perkembangan kesehatan mental
              </h2>
            </div>

            <div v-if="loadingGraph" class="flex justify-center items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-teal-500 animate-spin" viewBox="0 0 24 24"
                   fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-opacity=".25" class="opacity-75"/>
                <path d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12Z" fill="currentColor"/>
              </svg>
              <span class="text-teal-500">Loading...</span>
            </div>
            <div>
              <div class="relative">
                <client-only>
                  <select v-model="year" data-hs-select='{
      "placeholder": "Select option...",
      "toggleTag": "<button type=\"button\" aria-expanded=\"false\"></button>",
      "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 ps-4 pe-9 flex gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
      "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto",
      "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100",
      "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"shrink-0 size-3.5 text-blue-600 \" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
    }'>
                    <option v-for="(year,i) in [2025]" :value="year" :key="i"
                            :selected="year === new Date().getFullYear()">{{ year }}
                    </option>
                  </select>
                </client-only>
                <div class="absolute top-1/2 end-2.5 -translate-y-1/2">
                  <svg class="shrink-0 size-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                       viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                       stroke-linejoin="round">
                    <path d="m7 15 5 5 5-5"></path>
                    <path d="m7 9 5-5 5 5"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <!-- End Header -->

          <div id="hs-single-area-chart" class="h-full w-full">
            <client-only>
              <ChartAreaChart
                  :series="graphData?.series??[]"
                  :categories="graphData?.categories??[]"
                  :color="chartColors"
              />
            </client-only>
          </div>
        </div>
        <!-- End Card -->

        <!-- Card -->
        <div
            class="p-4 col-span-1 md:p-5 min-h-[410px] flex flex-col bg-white border shadow-sm rounded-xl">
          <!-- Header -->
          <div class="flex justify-between items-center">
            <div>
              <h2 class="text-sm text-gray-500">
                Health Grade Ratio
              </h2>
            </div>
          </div>
          <!-- End Header -->

          <div v-if="loading" class="flex justify-center items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-teal-500 animate-spin" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-opacity=".25" class="opacity-75"/>
              <path d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12Z" fill="currentColor"/>
            </svg>
            <span class="text-teal-500">Loading...</span>
          </div>
          <div v-if="stats.categoryRatios" id="hs-single-area-chart"
               class="h-full w-full flex flex-col justify-center items-center p-2">
            <client-only>
              <ChartDonutChart
                  :series="stats.categoryRatios.values??[]"
                  :labels="stats.categoryRatios.fields??[]"
                  :colors="chartColors"
              />
            </client-only>
            <!-- Legend Indicator -->
            <div v-if="stats && stats.categoryRatios && stats.categoryRatios.fields"
                 class="flex justify-center sm:justify-end items-center gap-x-4 mt-3 sm:mt-6">
              <div v-for="(field, i) in stats.categoryRatios.fields" class="inline-flex items-center">
                <span class="size-2.5 inline-block rounded-sm me-2"
                      :class="i === 0 ? 'bg-cyan-500' : i === 1 ? 'bg-cyan-600' : 'bg-cyan-700'"></span>
                <span class="text-[13px] text-gray-600">{{
                    field
                  }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- End Card -->
      </div>

      <!-- Card -->
      <RecapQuizSection />
      <!-- End Card -->

      <!-- Card -->
      <QuizSection />
      <!-- End Card -->
    </div>
  </template>
</template>

<script setup lang="ts">
import RecapQuizSection from "~/components/card/RecapQuizSection.vue";
import QuizSection from "~/components/card/QuizSection.vue";

const {isLoggedIn} = useAuth()

const isLogged = computed(() => isLoggedIn().value)
const loading = ref(false);  // Track loading state
const loadingGraph = ref(false);  // Track loading state
const dataHealthGraph = ref({})
const year = ref(new Date().getFullYear())
const statsData: any = ref({
  "quizCompleted": 0,
  "totalScore": 0,
  "lastTestStatus": "unknown",
  "categoryRatios": {
    "Buruk": 0,
    "Baik": 0,
    "Sedang": 0
  }
})

// Warna untuk setiap garis pada grafik
const chartColors = ref(['#05B6D3', '#0991B1', '#0D7490']); // Warna garis yang berbeda

const stats: any = computed(() => statsData.value)
const graphData: any = computed(() => dataHealthGraph.value)

const fetchStatsData = async () => {
  try {
    loadingGraph.value = true;
    const response: any = await useFetchApi('/api/auth/stats')
    statsData.value = response?.data

    statsData.value.categoryRatios = {
      fields: Object.keys(response?.data?.categoryRatios),
      values: Object.values(response?.data?.categoryRatios)
    }
  } catch (e) {

  } finally {
    loadingGraph.value = false;
  }
}

const fetchStuntingDataGraph = async () => {
  try {
    loading.value = true;
    const response: any = await useFetchApi(`/api/auth/graph?year=${year.value}`)
    dataHealthGraph.value = {
      series: [{
        name: "Health",
        data: response?.data.data
      }],
      categories: response?.data.categories
    }

    console.log(dataHealthGraph.value)
  } catch (e) {

  } finally {
    loading.value = false;
  }
}


watch(year, fetchStuntingDataGraph)

onMounted(() => {
  fetchStatsData()
  fetchStuntingDataGraph()
})
</script>

<style scoped>

</style>