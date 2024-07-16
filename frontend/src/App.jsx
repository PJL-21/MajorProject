import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { useAuth } from "./components/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import ExpensingInfoPage from "./pages/ExpensingInfoPage";
import ExpenseItemsPage from "./pages/ExpenseItemsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import ContactPage from "./pages/ContactPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import RegisterPage from "./pages/RegisterPage";
import LandingPage from "./pages/LandingPage";
import {
  AppShell,
  Group,
  Burger,
  Container,
  Text,
  Menu,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconUser, IconSearch, IconLogout } from "@tabler/icons-react";
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import UserButton from "./components/UserButton";
import LogoutModal from "./components/LogoutModal";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";

import "./index.css";

const App = () => {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const location = useLocation();
  const { user } = useAuth();
  const { isAuthenticated, logout } = useAuth();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const history = useHistory();
  const theme = useMantineTheme();

  const handleLogout = () => {
    setLogoutModalOpen(true);
  };

  const handleLogoutConfirm = () => {
    logout();
    setLogoutModalOpen(false);
    history.push("/");
  };

  const handleLogoutCancel = () => {
    setLogoutModalOpen(false);
  };

  return (
    <>
      <LogoutModal
        open={logoutModalOpen}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
      />
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: location.pathname === "/" ? 0 : 300,
          breakpoint: "sm",
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
        p="sm"
      >
        <AppShell.Header bg="blue.5">
          <Group h="100%" px="md" gap="xs" align="center">
            {location.pathname !== "/" && (
              <>
                <Burger
                  opened={mobileOpened}
                  onClick={toggleMobile}
                  hiddenFrom="sm"
                  size="sm"
                />
                <Burger
                  opened={desktopOpened}
                  onClick={toggleDesktop}
                  visibleFrom="sm"
                  size="sm"
                />
              </>
            )}

            <svg
              style={{ height: "1.8rem" }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="white"
            >
              <path d="M256 398.8c-11.8 5.1-23.4 9.7-34.9 13.5c16.7 33.8 31 35.7 34.9 35.7s18.1-1.9 34.9-35.7c-11.4-3.9-23.1-8.4-34.9-13.5zM446 256c33 45.2 44.3 90.9 23.6 128c-20.2 36.3-62.5 49.3-115.2 43.2c-22 52.1-55.6 84.8-98.4 84.8s-76.4-32.7-98.4-84.8c-52.7 6.1-95-6.8-115.2-43.2C21.7 346.9 33 301.2 66 256c-33-45.2-44.3-90.9-23.6-128c20.2-36.3 62.5-49.3 115.2-43.2C179.6 32.7 213.2 0 256 0s76.4 32.7 98.4 84.8c52.7-6.1 95 6.8 115.2 43.2c20.7 37.1 9.4 82.8-23.6 128zm-65.8 67.4c-1.7 14.2-3.9 28-6.7 41.2c31.8 1.4 38.6-8.7 40.2-11.7c2.3-4.2 7-17.9-11.9-48.1c-6.8 6.3-14 12.5-21.6 18.6zm-6.7-175.9c2.8 13.1 5 26.9 6.7 41.2c7.6 6.1 14.8 12.3 21.6 18.6c18.9-30.2 14.2-44 11.9-48.1c-1.6-2.9-8.4-13-40.2-11.7zM290.9 99.7C274.1 65.9 259.9 64 256 64s-18.1 1.9-34.9 35.7c11.4 3.9 23.1 8.4 34.9 13.5c11.8-5.1 23.4-9.7 34.9-13.5zm-159 88.9c1.7-14.3 3.9-28 6.7-41.2c-31.8-1.4-38.6 8.7-40.2 11.7c-2.3 4.2-7 17.9 11.9 48.1c6.8-6.3 14-12.5 21.6-18.6zM110.2 304.8C91.4 335 96 348.7 98.3 352.9c1.6 2.9 8.4 13 40.2 11.7c-2.8-13.1-5-26.9-6.7-41.2c-7.6-6.1-14.8-12.3-21.6-18.6zM336 256a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zm-80-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
            </svg>
            <Text fw={600} size="xl" c="white">
              Fission
            </Text>
            {user && (
              <Menu withArrow ml="auto">
                <Menu.Target>
                  <UserButton
                    image="https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg"
                    username={user?.username}
                    email={user?.email}
                  />
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    component={Link}
                    to="/profile-page"
                    leftSection={<IconUser />}
                  >
                    {" "}
                    Profile{" "}
                  </Menu.Item>
                  <Menu.Item leftSection={<IconSearch />}> Search </Menu.Item>
                  <Menu.Item
                    onClick={handleLogout}
                    component="button"
                    leftSection={<IconLogout />}
                  >
                    {" "}
                    Logout{" "}
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
          </Group>
        </AppShell.Header>
        <AppShell.Navbar bg="blue.1">
          <Navbar />
        </AppShell.Navbar>
        <AppShell.Main>
          <Container size="lg">
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/register" component={RegisterPage} />
              <Route exact path="/login" component={LoginPage} />
              <PrivateRoute exact path="/dashboard" component={DashboardPage} />
              <Route
                exact
                path="/expensing-info"
                component={ExpensingInfoPage}
              />
              <Route exact path="/analytics-page" component={AnalyticsPage} />
              <Route exact path="/expense-items" component={ExpenseItemsPage} />
              <Route exact path="/contact" component={ContactPage} />
              <PrivateRoute
                exact
                path="/admin-dashboard"
                component={AdminDashboardPage}
              />
            </Switch>
          </Container>
        </AppShell.Main>
      </AppShell>
    </>
  );
};

export default App;
