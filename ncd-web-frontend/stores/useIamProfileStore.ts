// Pinia store to store user profile
//! Do not store sensitive data in here.
//! Avoid storing permissions. Rather, always check permissions from backend.

import { defineStore } from "pinia";

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

export const useIamProfileStore = defineStore("iamProfile", () => {
  const myProfile = ref(<User | null>null);
  const isLoggedIn = ref(false);
  const updateCount = ref(0);

  // Returns the profile
  const getProfile = computed(() => myProfile.value);

  /**
   * @desc Sets profile
   * @param profile
   */
  function setProfile(profile: User) {
    if (profile) myProfile.value = profile;
  }

  /**
   * @desc Sets whether user is logged in
   */
  function setIsLoggedIn(value: boolean) {
    isLoggedIn.value = value;
  }

  /**
   * @desc Clears profile
   */
  function clearProfile() {
    myProfile.value = null;
  }

  /**
   * @desc Increases updateCount whenever an update is made
   */
  function setUpdateCount() {
    updateCount.value++;
  }

  return {
    setProfile,
    getProfile,
    setIsLoggedIn,
    isLoggedIn,
    clearProfile,
    setUpdateCount,
    updateCount,
  };
});
