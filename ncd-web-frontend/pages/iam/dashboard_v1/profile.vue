<script setup lang="ts">
import { useIamProfileStore } from "@/stores/useIamProfileStore";

const emit = defineEmits(["profileUpdate"]);

type User = {
  id: number;
  first_name: string;
  last_name: string;
  uuid: string;
  email: string;
  password: string;
  permissions: string | null;
  avatar?: string | null;
  role: "SUPER_ADMIN" | "ADMIN" | "GENERAL";
  csrf_token?: string;
  current_password?: string;
  new_password?: string;
  email_verified: boolean;
  is_active: boolean;
  last_login: Date | null;
  created_at: Date;
};

type NxFormInput = {
  label?: string;
  id: string;
  type?:
    | "input:text"
    | "input:password"
    | "input:email"
    | "input:number"
    | "textarea"
    | "select";
  options?: Array<string>;
  disabled?: boolean;
  show?: boolean;
  value?: string;
};

// Disabled keys in user object
const disabledKeys = [
  "id",
  "uuid",
  "email",
  "password",
  "role",
  "permissions",
  "csrf_token",
  "email_verified",
  "last_login",
  "created_at",
  "deleted_at",
  "updated_at",
];

// Do not show the following keys
const doNotShow = [
  "id",
  "password",
  "created_at",
  "deleted_at",
  "updated_at",
  "csrf_token",
];

// User roles
const roles = ["SUPER_ADMIN", "ADMIN", "GENERAL"];

const { updateProfile } = useIam();
const iamStore = useIamProfileStore();
const updateSuccessful = ref(false);
const profileError = ref(<Error | null>null);

// Get profile from attributes
const profile = ref(<User>{});
profile.value = iamStore.getProfile as User;

// Get csrf token and uuid
const csrfToken = profile.value.csrf_token;
const uuid = profile.value.uuid;

/**
 * @desc Convert user to NxFormInput
 * @param user The user to edit
 */
function convertUserToForm(user: User): Array<NxFormInput> {
  const form = [] as Array<NxFormInput>;
  // Iterate through user
  for (const key in user) {
    const temp = {} as NxFormInput;
    temp.id = key;
    temp.label = key;

    // If key is 'roles', add select
    if (key === "role") {
      temp.type = "select";
      temp.options = roles;
    } else if (key === "is_active") {
      temp.type = "select";
      temp.options = ["true", "false"];
    } else {
      temp.type = "input:text";
    }

    // Do not show the following keys
    if (doNotShow.includes(key)) temp.show = false;

    /*@ts-ignore */
    temp.value = user[key];

    // Disable key if it should be disabled
    if (disabledKeys.includes(key)) temp.disabled = true;

    form.push(temp);
  }

  return form;
}

// Attempt to update user profile
async function updateMyProfile(profile: User) {
  // Add csrf token and uuid because they are required
  profile.csrf_token = csrfToken;
  profile.uuid = uuid;

  const { error } = await updateProfile(profile);

  // If error, display error
  if (error) {
    console.log("error: ", error);
    profileError.value = error;
    return;
  }

  updateSuccessful.value = true;

  emit("profileUpdate");
}
</script>

<template>
  <div>
    <div>
      <h1>Profile</h1>
      <p>Update your profile</p>
    </div>
    <!-- Profile errors notification -->
    <NxAlert v-if="profileError" @click="profileError = null">
      <strong>{{ profileError.message }}</strong>
    </NxAlert>

    <!-- Profile success notification -->
    <NxAlert
      v-if="updateSuccessful"
      theme="success"
      @click="updateSuccessful = false"
    >
      <strong>Profile updated successfully</strong>
    </NxAlert>

    <!--Card and form to update profile-->
    <NxCard
      header="Profile"
      title="Update Profile"
      theme="primary"
      class="profile-card"
      text="Update your profile below."
    >
      <NxForm
        v-if="profile"
        :data="convertUserToForm(profile)"
        submit-text="Update Profile"
        @submit="updateMyProfile"
      />
    </NxCard>
  </div>
</template>


<style scoped>
.profile-card {
  margin: auto;
}
</style>
