import { LinkButton } from '../components/ui/button'

export default function NotFoundPage() {
  return (
    <section className="mx-auto max-w-2xl px-5 py-24 text-center md:py-32">
      <p className="text-fg-4 text-sm">404</p>
      <h1 className="heading mt-3 text-4xl">Page not found</h1>
      <p className="mt-3 text-fg-3 text-lg">This address has no page. The homepage has features, installation and project links.</p>
      <div className="mt-8 flex justify-center">
        <LinkButton href="/" variant="solid" size="lg">
          Go to the homepage
        </LinkButton>
      </div>
    </section>
  )
}
