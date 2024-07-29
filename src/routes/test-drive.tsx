import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/test-drive')({
  component: () => <div>Hello /test-drive!</div>
})