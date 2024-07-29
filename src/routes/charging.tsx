import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/charging')({
  component: () => <div>Hello /charging!</div>
})