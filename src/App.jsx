import { createBrowserRouter, RouterProvider } from "react-router-dom";
import bgVideo from "./assets/bg.mp4";
import LandingPage from "./components/LandingPage";
import CreateLobby from "./components/CreateLobby";
import JoinPublicLobby from "./components/JoinPublicLobby";

function App() {
  return (
    <div className="flex justify-center">
      <video
        src={bgVideo}
        autoplay="{true}"
        loop
        muted
        className="absolute -z-10 w-auto min-w-full h-full max-w-none"
      ></video>
      <RouterProvider router={appRouter} />
    </div>
  );
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/createLobby",
    element: <CreateLobby />,
  },
  {
    path: "/joinPublicLobby",
    element: <JoinPublicLobby />,
  },
]);

export default App;
