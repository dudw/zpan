import { createFileRoute } from '@tanstack/react-router'
import { ImageUp } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'

export const Route = createFileRoute('/_authenticated/_app/images/')({
  component: ImageBedPage,
})

function ImageBedPage() {
  return (
    <>
      <Header>
        <h1 className="text-lg font-semibold">Image Bed</h1>
      </Header>
      <Main>
        <div className="flex flex-col items-center justify-center gap-4 py-20 text-muted-foreground">
          <ImageUp className="h-16 w-16" />
          <h2 className="text-xl font-medium">Coming in v2.1</h2>
          <p className="text-sm">Upload images and get shareable links instantly.</p>
        </div>
      </Main>
    </>
  )
}
