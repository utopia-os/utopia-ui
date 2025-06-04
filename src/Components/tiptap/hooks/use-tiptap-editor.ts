'use client'

import { useCurrentEditor } from '@tiptap/react'
import { useMemo } from 'react'

import type { Editor } from '@tiptap/react'

export function useTiptapEditor(providedEditor?: Editor | null): Editor | null {
  const { editor: coreEditor } = useCurrentEditor()
  return useMemo(() => providedEditor || coreEditor, [providedEditor, coreEditor])
}
