<script setup lang="ts">

const iamStore = useIamProfileStore();

const { useLogUserOut, profile } = useAuthStuff()

</script>
<template>
    <header class="bg-white fixed top-0 w-full shadow-md">
        <nav class="container mx-auto px-6 py-3 flex">
            <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div class="flex flex-wrap items-center">
                    <div class="flex relative w-full px-4 max-w-full flex-grow flex-1">
                        <NuxtLink :to="{ name: 'iam-dashboard' }">
                            <p class="p-1 hover:text-green-500">Dashboard</p>
                        </NuxtLink>
                        <p>|</p>
                        <p class="p-1 text-orange-500 border-b-2 border-green-500"><strong>Scores</strong></p>

                    </div>
                    <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right py-2">
                        <span class="text-xs pr-1 text-gray-500"><strong>{{ profile?.data.first_name }}</strong></span>
                        <button
                            class="bg-green-500 text-white active:bg-green-600 text-xs font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="button" @click="useLogUserOut(iamStore)">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    </header>
    <div class="my-24">
        <UContainer>
            <UCard class="pb-5">
                <template #header>
                    <div class="text-sm">
                        <p><span class=" text-orange-500">Section A:</span> <strong>Introduction and Initial
                                Evaluation</strong></p>
                    </div>
                </template>


                <div class="grid grid-cols-4 gap-0">


                    <div>
                        <NuxtLink :to="{ name: 'scores-item', params: { item: 'dmQ1' } }">
                            <UCard class=" border-cyan-700 border-2 text-center m-2 hover:bg-slate-400 hover:text-white">

                                <h3 class=""><strong>dm Q1</strong></h3>
                                <!-- <div class=" w-full h-px max-w-6xl mx-auto my-1"
                                        style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
                                    </div>
                                    <p class=" text-4xl text-slate-500">201</p> -->
                            </UCard>
                        </NuxtLink>
                    </div>
                    <div>
                        <NuxtLink :to="{ name: 'scores-item', params: { item: 'dmQ2' } }">
                            <UCard class=" border-cyan-700 border-2 text-center m-2 hover:bg-slate-400 hover:text-white">
                                <h3 class=""><strong>dm Q2</strong></h3>
                                <!-- <div class=" w-full h-px max-w-6xl mx-auto my-1"
                                    style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
                                </div>
                                <p class=" text-4xl text-slate-500">201</p> -->
                            </UCard>
                        </NuxtLink>
                    </div>
                    <div>
                        <NuxtLink :to="{ name: 'scores-item', params: { item: 'dmQ3' } }">
                            <UCard class=" border-cyan-700 border-2 text-center m-2 hover:bg-slate-400 hover:text-white">

                                <h3 class=""><strong>dm Q3</strong></h3>
                                <!-- <div class=" w-full h-px max-w-6xl mx-auto my-1"
                                    style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
                                </div>
                                <p class=" text-4xl text-slate-500">201</p> -->
                            </UCard>
                        </NuxtLink>
                    </div>
                    <div>
                        <NuxtLink :to="{ name: 'scores-item', params: { item: 'dmQ4' } }">
                            <UCard class=" border-cyan-700 border-2 text-center m-2 hover:bg-slate-400 hover:text-white">
                                <h3 class=""><strong>dm Q4</strong></h3>
                                <!-- <div class=" w-full h-px max-w-6xl mx-auto my-1"
                                    style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
                                </div>
                                <p class=" text-4xl text-slate-500">201</p> -->
                            </UCard>
                        </NuxtLink>
                    </div>
                    <div>
                        <NuxtLink :to="{ name: 'scores-item', params: { item: 'dmQ5' } }">
                            <UCard class=" border-cyan-700 border-2 text-center m-2 hover:bg-slate-400 hover:text-white">
                                <h3 class=""><strong>dm Q5</strong></h3>
                                <!-- <div class=" w-full h-px max-w-6xl mx-auto my-1"
                                    style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
                                </div>
                                <p class=" text-4xl text-slate-500">201</p> -->
                            </UCard>
                        </NuxtLink>
                    </div>
                    <div>
                        <NuxtLink :to="{ name: 'scores-item', params: { item: 'dmQ6' } }">
                            <UCard class=" border-cyan-700 border-2 text-center m-2 hover:bg-slate-400 hover:text-white">

                                <h3 class=""><strong>dm Q6</strong></h3>
                                <!-- <div class=" w-full h-px max-w-6xl mx-auto my-1"
                                    style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
                                </div>
                                <p class=" text-4xl text-slate-500">201</p> -->
                            </UCard>
                        </NuxtLink>
                    </div>
                    <div>
                        <NuxtLink :to="{ name: 'scores-item', params: { item: 'dmQ7' } }">
                            <UCard class=" border-cyan-700 border-2 text-center m-2 hover:bg-slate-400 hover:text-white">

                                <h3 class=""><strong>dm Q7</strong></h3>
                                <!-- <div class=" w-full h-px max-w-6xl mx-auto my-1"
                                    style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
                                </div>
                                <p class=" text-4xl text-slate-500">201</p> -->
                            </UCard>
                        </NuxtLink>
                    </div>
                    <div>
                        <NuxtLink :to="{ name: 'scores-item', params: { item: 'dmQ8' } }">
                            <UCard class=" border-cyan-700 border-2 text-center m-2 hover:bg-slate-400 hover:text-white">

                                <h3 class=""><strong>dm Q8</strong></h3>
                                <!-- <div class=" w-full h-px max-w-6xl mx-auto my-1"
                                    style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
                                </div>
                                <p class=" text-4xl text-slate-500">201</p> -->

                            </UCard>
                        </NuxtLink>
                    </div>
                    <div>
                        <NuxtLink :to="{ name: 'scores-item', params: { item: 'dmQ9' } }">
                            <UCard class=" border-cyan-700 border-2 text-center m-2 hover:bg-slate-400 hover:text-white">

                                <h3 class=""><strong>dm Q9</strong></h3>
                                <!-- <div class=" w-full h-px max-w-6xl mx-auto my-1"
                                    style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
                                </div>
                                <p class=" text-4xl text-slate-500">201</p> -->

                            </UCard>
                        </NuxtLink>
                    </div>
                    <div>
                        <NuxtLink :to="{ name: 'scores-item', params: { item: 'dmQ10' } }">
                            <UCard class=" border-cyan-700 border-2 text-center m-2 hover:bg-slate-400 hover:text-white">

                                <h3 class=""><strong>dm Q10</strong></h3>
                                <!-- <div class=" w-full h-px max-w-6xl mx-auto my-1"
                                    style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
                                </div>
                                <p class=" text-4xl text-slate-500">201</p> -->

                            </UCard>
                        </NuxtLink>
                    </div>
                    <div>
                        <NuxtLink :to="{ name: 'scores-item', params: { item: 'dmQ11' } }">
                            <UCard class=" border-cyan-700 border-2 text-center m-2 hover:bg-slate-400 hover:text-white">

                                <h3 class=""><strong>dm Q11</strong></h3>
                                <!-- <div class=" w-full h-px max-w-6xl mx-auto my-1"
                                    style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
                                </div>
                                <p class=" text-4xl text-slate-500">201</p> -->

                            </UCard>
                        </NuxtLink>
                    </div>
                    <div>
                        <NuxtLink :to="{ name: 'scores-item', params: { item: 'dmQ12' } }">
                            <UCard class=" border-cyan-700 border-2 text-center m-2 hover:bg-slate-400 hover:text-white">

                                <h3 class=""><strong>dm Q12</strong></h3>
                                <!-- <div class=" w-full h-px max-w-6xl mx-auto my-1"
                                    style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
                                </div>
                                <p class=" text-4xl text-slate-500">201</p> -->

                            </UCard>
                        </NuxtLink>
                    </div>
                    <div>
                        <NuxtLink :to="{ name: 'scores-item', params: { item: 'dmQ13' } }">
                            <UCard class=" border-cyan-700 border-2 text-center m-2 hover:bg-slate-400 hover:text-white">

                                <h3 class=""><strong>dm Q13</strong></h3>
                                <!-- <div class=" w-full h-px max-w-6xl mx-auto my-1"
                                    style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
                                </div>
                                <p class=" text-4xl text-slate-500">201</p> -->

                            </UCard>
                        </NuxtLink>
                    </div>
                </div>
            </UCard>

            <UCard>
                <template #header>
                    <div class="text-sm">
                        <p><span class=" text-orange-500">Section B:</span> <strong>Management of DM</strong></p>
                    </div>
                </template>
                <div class="grid grid-cols-4 gap-0">

                    <div>
                        <NuxtLink :to="{ name: 'scores-item', params: { item: 'dmQ14' } }">
                            <UCard class=" border-teal-700 border-2 text-center m-2 hover:bg-gray-400 hover:text-white">

                                <h3 class=""><strong>dm Q14</strong></h3>
                                <!-- <div class=" w-full h-px max-w-6xl mx-auto my-1"
                                        style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
                                    </div>
                                    <p class=" text-4xl text-slate-500">201</p> -->
                            </UCard>
                        </NuxtLink>
                    </div>
                    <div>
                        <NuxtLink :to="{ name: 'scores-item', params: { item: 'dmQ15' } }">
                            <UCard class=" border-teal-700 border-2 text-center m-2 hover:bg-gray-400 hover:text-white">

                                <h3 class=""><strong>dm Q15</strong></h3>
                                <!-- <div class=" w-full h-px max-w-6xl mx-auto my-1"
                                        style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
                                    </div>
                                    <p class=" text-4xl text-slate-500">201</p> -->
                            </UCard>
                        </NuxtLink>
                    </div>
                    <div>
                        <NuxtLink :to="{ name: 'scores-item', params: { item: 'dmQ16' } }">
                            <UCard class=" border-teal-700 border-2 text-center m-2 hover:bg-gray-400 hover:text-white">

                                <h3 class=""><strong>dm Q16</strong></h3>
                                <!-- <div class=" w-full h-px max-w-6xl mx-auto my-1"
                                        style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
                                    </div>
                                    <p class=" text-4xl text-slate-500">201</p> -->
                            </UCard>
                        </NuxtLink>
                    </div>
                    <div>
                        <NuxtLink :to="{ name: 'scores-item', params: { item: 'dmQ17' } }">
                            <UCard class=" border-teal-700 border-2 text-center m-2 hover:bg-gray-400 hover:text-white">

                                <h3 class=""><strong>dm Q17</strong></h3>
                                <!-- <div class=" w-full h-px max-w-6xl mx-auto my-1"
                                        style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
                                    </div>
                                    <p class=" text-4xl text-slate-500">201</p> -->
                            </UCard>
                        </NuxtLink>
                    </div>
                    <div>
                        <NuxtLink :to="{ name: 'scores-item', params: { item: 'dmQ18' } }">
                            <UCard class=" border-teal-700 border-2 text-center m-2 hover:bg-gray-400 hover:text-white">

                                <h3 class=""><strong>dm Q18</strong></h3>
                                <!-- <div class=" w-full h-px max-w-6xl mx-auto my-1"
                                        style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
                                    </div>
                                    <p class=" text-4xl text-slate-500">201</p> -->
                            </UCard>
                        </NuxtLink>
                    </div>
                    <div>
                        <NuxtLink :to="{ name: 'scores-item', params: { item: 'dmQ19' } }">
                            <UCard class=" border-teal-700 border-2 text-center m-2 hover:bg-gray-400 hover:text-white">

                                <h3 class=""><strong>dm Q19</strong></h3>
                                <!-- <div class=" w-full h-px max-w-6xl mx-auto my-1"
                                        style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
                                    </div>
                                    <p class=" text-4xl text-slate-500">201</p> -->
                            </UCard>
                        </NuxtLink>
                    </div>
                    <div>
                        <NuxtLink :to="{ name: 'scores-item', params: { item: 'dmQ20' } }">
                            <UCard class=" border-teal-700 border-2 text-center m-2 hover:bg-gray-400 hover:text-white">

                                <h3 class=""><strong>dm Q20</strong></h3>
                                <!-- <div class=" w-full h-px max-w-6xl mx-auto my-1"
                                        style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
                                    </div>
                                    <p class=" text-4xl text-slate-500">201</p> -->
                            </UCard>
                        </NuxtLink>
                    </div>
                    <div>
                        <NuxtLink :to="{ name: 'scores-item', params: { item: 'dmQ21' } }">
                            <UCard class=" border-teal-700 border-2 text-center m-2 hover:bg-gray-400 hover:text-white">

                                <h3 class=""><strong>dm Q21</strong></h3>
                                <!-- <div class=" w-full h-px max-w-6xl mx-auto my-1"
                                        style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
                                    </div>
                                    <p class=" text-4xl text-slate-500">201</p> -->
                            </UCard>
                        </NuxtLink>
                    </div>
                    <div>
                        <NuxtLink :to="{ name: 'scores-item', params: { item: 'dmQ22' } }">
                            <UCard class=" border-teal-700 border-2 text-center m-2 hover:bg-gray-400 hover:text-white">

                                <h3 class=""><strong>dm Q22</strong></h3>
                                <!-- <div class=" w-full h-px max-w-6xl mx-auto my-1"
                                        style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
                                    </div>
                                    <p class=" text-4xl text-slate-500">201</p> -->
                            </UCard>
                        </NuxtLink>
                    </div>
                    <div>
                        <NuxtLink :to="{ name: 'scores-item', params: { item: 'dm23' } }">
                            <UCard class=" border-teal-700 border-2 text-center m-2 hover:bg-gray-400 hover:text-white">

                                <h3 class=""><strong>dm Q23</strong></h3>
                                <!-- <div class=" w-full h-px max-w-6xl mx-auto my-1"
                                        style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
                                    </div>
                                    <p class=" text-4xl text-slate-500">201</p> -->
                            </UCard>
                        </NuxtLink>
                    </div>
                    <div>
                        <NuxtLink :to="{ name: 'scores-item', params: { item: 'dmQ24' } }">
                            <UCard class=" border-teal-700 border-2 text-center m-2 hover:bg-gray-400 hover:text-white">

                                <h3 class=""><strong>dm Q24</strong></h3>
                                <!-- <div class=" w-full h-px max-w-6xl mx-auto my-1"
                                        style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
                                    </div>
                                    <p class=" text-4xl text-slate-500">201</p> -->
                            </UCard>
                        </NuxtLink>
                    </div>
                    <div>
                        <NuxtLink :to="{ name: 'scores-item', params: { item: 'dmQ25' } }">
                            <UCard class=" border-teal-700 border-2 text-center m-2 hover:bg-gray-400 hover:text-white">

                                <h3 class=""><strong>dm Q25</strong></h3>
                                <!-- <div class=" w-full h-px max-w-6xl mx-auto my-1"
                                        style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
                                    </div>
                                    <p class=" text-4xl text-slate-500">201</p> -->
                            </UCard>
                        </NuxtLink>
                    </div>
                    <div>
                        <NuxtLink :to="{ name: 'scores-item', params: { item: 'dmQ26' } }">
                            <UCard class=" border-teal-700 border-2 text-center m-2 hover:bg-gray-400 hover:text-white">

                                <h3 class=""><strong>dm Q26</strong></h3>
                                <!-- <div class=" w-full h-px max-w-6xl mx-auto my-1"
                                        style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
                                    </div>
                                    <p class=" text-4xl text-slate-500">201</p> -->
                            </UCard>
                        </NuxtLink>
                    </div>
                    <div>
                        <NuxtLink :to="{ name: 'scores-item', params: { item: 'dmQ27' } }">
                            <UCard class=" border-teal-700 border-2 text-center m-2 hover:bg-gray-400 hover:text-white">

                                <h3 class=""><strong>dm Q27</strong></h3>
                                <!-- <div class=" w-full h-px max-w-6xl mx-auto my-1"
                                        style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
                                    </div>
                                    <p class=" text-4xl text-slate-500">201</p> -->
                            </UCard>
                        </NuxtLink>
                    </div>
                    <div>
                        <NuxtLink :to="{ name: 'scores-item', params: { item: 'dmQ28' } }">
                            <UCard class=" border-teal-700 border-2 text-center m-2 hover:bg-gray-400 hover:text-white">

                                <h3 class=""><strong>dm Q28</strong></h3>
                                <!-- <div class=" w-full h-px max-w-6xl mx-auto my-1"
                                        style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
                                    </div>
                                    <p class=" text-4xl text-slate-500">201</p> -->
                            </UCard>
                        </NuxtLink>
                    </div>
                    <div>
                        <NuxtLink :to="{ name: 'scores-item', params: { item: 'dmQ29' } }">
                            <UCard class=" border-teal-700 border-2 text-center m-2 hover:bg-gray-400 hover:text-white">

                                <h3 class=""><strong>dm Q29</strong></h3>
                                <!-- <div class=" w-full h-px max-w-6xl mx-auto my-1"
                                        style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
                                    </div>
                                    <p class=" text-4xl text-slate-500">201</p> -->
                            </UCard>
                        </NuxtLink>
                    </div>

                </div>

            </UCard>
        </UContainer>

    </div>
</template>
