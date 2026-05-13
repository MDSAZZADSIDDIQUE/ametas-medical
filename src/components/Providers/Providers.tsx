'use client';

import { Suspense } from 'react';
import { EditorProvider } from "@/context/EditorContext";
import { ContentProvider } from "@/context/ContentContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ContentProvider>
      <Suspense fallback={null}>
        <EditorProvider>
          {children}
        </EditorProvider>
      </Suspense>
    </ContentProvider>
  );
}
