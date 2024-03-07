import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import bgVideo from "./assets/bg.mp4";
import LandingPage from "./components/LandingPage";
import CreateLobby from "./components/CreateLobby";
import JoinPublicLobby from "./components/JoinPublicLobby";
import ApiTester from "./components/testing/ApiTester";
import rootReducer from "./reducers/reducers";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import Lobby from "./components/core/lobby/Lobby";

const store = configureStore({
  reducer: rootReducer,
});

function App() {
  return (
    <Provider store={store}>
      <div className="flex justify-center overflow-x-hidden">
        <video
          src={bgVideo}
          autoPlay={false}
          loop
          muted
          className="absolute -z-10 w-[100vw] h-[100vh] object-cover"
        ></video>
        <RouterProvider router={appRouter} />
      </div>
      <Toaster />
    </Provider>
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
  {
    path: "/lobbyId/:id",
    element: <Lobby />,
  },
  {
    path: "/testing",
    element: <ApiTester />,
  },
]);

export default App;
