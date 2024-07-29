import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/custom-vehicle')({
  component: () => <div>Hello /custom-vehicle!</div>
})