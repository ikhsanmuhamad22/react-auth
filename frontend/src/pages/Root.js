import { Outlet, useNavigation, useSubmit } from "react-router-dom";

import MainNavigation from "../components/MainNavigation";
import { getAuthToken, getTokenDuration } from "../utils/auth";
import { useEffect } from "react";

function RootLayout() {
  const token = getAuthToken();
  const submit = useSubmit();

  if (token === "EXPIRED") {
    submit(null, { action: "/logout", method: "POST" });
  }

  const tokenDuration = getTokenDuration();

  useEffect(() => {
    if (!token) {
      return;
    }

    setTimeout(() => {
      submit(null, { action: "/logout", method: "POST" });
    }, tokenDuration);
  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
