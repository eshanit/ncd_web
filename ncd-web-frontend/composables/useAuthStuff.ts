

const getLoggedInProfile = useAsyncState(async () => {
  const { isAuthenticated, getProfile } = useIam();
  return await getProfile();
}, undefined);

const profile = getLoggedInProfile.state
/**
 * @Desc Log user out
 */
const { logout } = useIam();
const isLoggedIn = ref(false);

// Used to refresh logged in menu navbar
async function useLogUserOut(logStore: any) {
  const { status } = await logout();
  if (status === "success") {
    // Clear store variables
    isLoggedIn.value = false;
    logStore.clearProfile();
    logStore.setIsLoggedIn(false);
    navigateTo("/iam/login");
  }

}

export default  function useAuthStuff() {
  return {
   useLogUserOut,
   profile
  }
} 