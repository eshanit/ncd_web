<script setup>

</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <!-- <div class="text-center">
      <IamLogo />
    </div> -->
    <div class="items-center">
      <figure class="mb-8 flex flex-col items-center">
      <NuxtImg
        src="/images/2019_SM_Logo300by194.png"
        :placeholder="[30,20]"
        width="300"
        height="194"
        class="rounded"
      />
    </figure>
      <p class="text-center">
        Welcome to the NCD Monitoring App. Reporting platform
      </p>
      <div class="pt-5 flex flex-col items-center">
        <NxButton
          class="learn-more-button"
          theme="warning"
          size="large"
          @click="navigateTo('/iam/login')"
          >Enter</NxButton
        >
      </div>
    </div>
  </div>
</template>


<style>

</style>
