<script setup lang="ts">
import { ref } from 'vue'
import type { FormError, FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'

const emit = defineEmits(["submit"]);

const state = ref({ email: undefined, password: undefined })

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