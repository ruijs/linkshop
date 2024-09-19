import { json, LoaderFunction, type MetaFunction } from "@remix-run/node";
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from "@remix-run/react";

import { initInWeb } from "@rebirth/mobile-sdk";
import rapidService from "./rapidService";

initInWeb();

type ViewModel = {
  systemSettings: Record<string, any>;
  ENV: Record<string, any>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const systemSettings = (
    await rapidService.get(`svc/systemSettingValues?groupCode=public`, {
      headers: {
        Cookie: request.headers.get("Cookie"),
      },
    })
  ).data;

  return json({
    systemSettings,
    ENV: {
      BACKEND_URL: process.env.BACKEND_URL,
    },
  });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => ({
  charset: "utf-8",
  title: data.systemSettings.systemName || "麒祥高新材料WMS",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  const data = useLoaderData<typeof loader>();
  return (
    <html lang="en">
    <head>
      <Meta />
      <Links />
      {/* <script src="/monaco/loader.js"></script> */}
      {/* <script src="/monaco/editor/editor.main.nls.js"></script> */}
      {/* <script src="/monaco/editor/editor.main.js"></script> */}
    </head>
    <body>
    <Outlet />
    <ScrollRestoration />
    <script
      dangerouslySetInnerHTML={{
        __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
      }}
    />
    <Scripts />
    {/* <LiveReload /> */}

    </body>
    </html>
  );
}
