<script setup lang="ts">
import { ref } from 'vue'
import type { FormError, FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'

const route = useRoute()


const emit = defineEmits(["submit"]);

const state = ref({
  first_name: undefined,
  last_name: undefined,
  email: undefined,
  password: undefined
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email) errors.push({ path: 'email', message: 'Required' })
  if (!state.password) errors.push({ path: 'password', message: 'Required' })
  return errors
}

async function submit(event: FormSubmitEvent<any>) {
  // Do something with data  console.log(event.data)
  emit('submit', event.data)
}
</script>

<!-- This component displays an object as an input form -->
<template>
  <div class="w-full">
    <UForm :validate="validate" :state="state" @submit="submit">
      <div v-if="route.path == '/iam/register'">
        <UFormGroup label="First Name" name="first_name" class="pb-5">
          <UInput v-model="state.first_name" />
        </UFormGroup>
        <UFormGroup label="Last Name" name="last_name" class="pb-5">
          <UInput v-model="state.last_name" />
        </UFormGroup>
      </div>

      <UFormGroup label="Email" name="email" class="pb-5">
        <UInput v-model="state.email" icon="i-heroicons-envelope" />
      </UFormGroup>
      <UFormGroup label="Password" name="password" class="pb-5">
        <UInput v-model="state.password" type="password" />
      </UFormGroup>
      <UButton type="submit"> Submit </UButton>
    </UForm>
  </div>
</template>


<style scoped></style>