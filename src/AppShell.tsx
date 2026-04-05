import ShellFooter from "./components/shell/ShellFooter";
import ShellSidebar from "./components/shell/ShellSidebar";
import MainLayout from "./layouts/MainLayout";
import AppRoutes from "./routes/AppRoutes";

const AppShell = () => {
  return (
    <MainLayout footer={<ShellFooter />} sidebar={<ShellSidebar />}>
      <AppRoutes />
    </MainLayout>
  );
};

export default AppShell;
