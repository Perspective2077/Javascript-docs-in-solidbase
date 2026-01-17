// Gives the children Component according to the router
import { RouteSectionProps, useLocation } from "@solidjs/router";

// ERror fallback component
import { createEffect, createSignal, ErrorBoundary } from "solid-js";

// Gives you the title of the page
import { Title } from "@solidjs/meta";

// Listen for dark/light mode then applies to all page ,hook from kobalte
import { useThemeListener } from "@kobalte/solidbase/client";

// the top route page loaders
import { usePace } from "@kobalte/solidbase/default-theme/pace.js";
// The deafult layout from kabolte
import Layout from "@kobalte/solidbase/default-theme/Layout.jsx";
import { DefaultThemeComponentsProvider } from "@kobalte/solidbase/default-theme/context.jsx";
import MyCustomHeader from "./Header";
// import Header from "@kobalte/solidbase/default-theme/components/Header.js";




export default function (props: RouteSectionProps) {
  const location = useLocation();
  let [isHome, setisHome] = createSignal(true)
  createEffect(()=>{
    useThemeListener();
    usePace();
  })

  createEffect(() => {
    if (location.pathname === "/") {
      setisHome(true)
    } else {
      setisHome(false)

    }
  })

  // Docs pages → SolidBase layout
  return (
    <>
      {isHome() ? <>
        {props.children}</>
        :
        <DefaultThemeComponentsProvider components={{ Header: MyCustomHeader }}>
          <Layout>
            <Title>Docs</Title>
            <ErrorBoundary fallback={() => <div>Nothing found</div>}>
              {props.children}
            </ErrorBoundary>
          </Layout>
        </DefaultThemeComponentsProvider>
      }
    </>
  );
}
