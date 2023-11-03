<script setup lang="ts">

import { useIamProfileStore } from "@/stores/useIamProfileStore";

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

const iamStore = useIamProfileStore();
const { userHasPermission } = useIamAdmin();

const hasAdminAccess = ref(false);

onMounted(async () => {
  checkPermissions();
});

/**
 * @desc Check if user has permissions
 */
async function checkPermissions() {
  const user = iamStore.getProfile;
  if (!user) return;
  try {
    hasAdminAccess.value = await canAccessAdmin(user);
  } catch (e) {
    console.log(e);
  }
}

/**
 * @desc Checks if user has admin permissions
 * @param user User we need to check
 */
async function canAccessAdmin(user: User): Promise<boolean> {
  const hasPermission = await userHasPermission(user, "can-access-admin");
  if (hasPermission.status === "success") return true;
  else return false;
}
</script>

<template>
  <div v-if="hasAdminAccess">
    <h1>Admin</h1>
    <p>This is your admin center.</p>
    <IamUsersTable />
    <hr />
    <IamRefreshTokensTable />
  </div>
  <div v-else>
    <h1 class="text-danger">ACCESS DENIED!</h1>
  </div>
</template>


<style scoped>
.text-danger {
  color: #dc3545;
}
</style>
