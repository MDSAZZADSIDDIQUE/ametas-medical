'use client';

import { SessionProvider } from "next-auth/react";
import { EditorProvider } from "@/context/EditorContext";
import { ContentProvider } from "@/context/ContentContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ContentProvider>
        <EditorProvider>
          {children}
        </EditorProvider>
      </ContentProvider>
    </SessionProvider>
  );
}
