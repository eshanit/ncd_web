<script setup lang="ts">


</script>
<template>
    <header class="bg-white fixed top-0 w-full shadow-md">
        <nav class="container mx-auto px-6 py-3">
            <div class="flex  items-center">


                <NuxtLink :to="{ name: 'iam-dashboard' }">
                    <p class="p-1 hover:text-green-500">Dashboard</p>
                </NuxtLink>
                <p>|</p>
                <p class="p-1 text-orange-500 border-b-2 border-green-500"><strong>Scores</strong></p>

            </div>

        </nav>
    </header>
    <div class="my-24">
        <UContainer>
            <h1>Home of the scores</h1>
            <UCard>
                <template #header>
                    <div class="text-sm">
                        <p><span class=" text-orange-500">Section A:</span> <strong>Introduction and Initial
                                Evaluation</strong></p>
                    </div>
                </template>

                
                <div class="grid grid-cols-4 gap-0">


                    <div>
                        <UCard class=" border-cyan-700 border-2 text-center m-2 hover:bg-slate-400 hover:text-white">
                            <NuxtLink :to="{name: 'scores-item' ,params:{item:'dmQ1'}} ">
                                <h3 class=""><strong>dm Q1</strong></h3>
                                <div class=" w-full h-px max-w-6xl mx-auto my-1"
                                    style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
                                </div>
                                <p class=" text-4xl text-slate-500">201</p>
                            </NuxtLink>
                        </UCard>
                    </div>
                    <div>
                        <UCard class=" border-cyan-700 border-2 text-center m-2 hover:bg-slate-400 hover:text-white">
                            <NuxtLink to="/mentees/report">
                                <h3 class=""><strong>dm Q2</strong></h3>
                                <div class=" w-full h-px max-w-6xl mx-auto my-1"
                                    style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
                                </div>
                                <p class=" text-4xl text-slate-500">201</p>
                            </NuxtLink>
                        </UCard>
                    </div>
                    <div>
                        <UCard class=" border-cyan-700 border-2 text-center m-2 hover:bg-slate-400 hover:text-white">
                            <NuxtLink to="/mentees/report">
                                <h3 class=""><strong>dm Q3</strong></h3>
                                <div class=" w-full h-px max-w-6xl mx-auto my-1"
                                    style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
                                </div>
                                <p class=" text-4xl text-slate-500">201</p>
                            </NuxtLink>
                        </UCard>
                    </div>
                    <div>
                        <UCard class=" border-cyan-700 border-2 text-center  m-2 hover:bg-slate-400 hover:text-white">
                            <NuxtLink to="/mentees/report">
                                <h3 class=""><strong>dm Q4</strong></h3>
                                <div class=" w-full h-px max-w-6xl mx-auto my-1"
                                    style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
                                </div>
                                <p class=" text-4xl text-slate-500">201</p>
                            </NuxtLink>
                        </UCard>
                    </div>
                </div>
            </UCard>
        </UContainer>

    </div>
</template>
