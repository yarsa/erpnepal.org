import { IconArrowUpRight, IconBug, IconGitPullRequest, IconMessages } from '@tabler/icons-react'
import { useStrings } from '../lib/i18n'

const icons = [IconMessages, IconBug, IconGitPullRequest]

export function CommunityBand() {
  const { t } = useStrings()
  return (
    <section aria-labelledby="community-title">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-8 rounded-2xl border border-line bg-subtle p-6 md:p-10 lg:grid-cols-[1fr_2fr] lg:items-center">
          <div>
            <h2 id="community-title" className="heading text-2xl md:text-3xl">
              {t.community.title}
            </h2>
            <p className="mt-2 text-fg-3 text-lg">{t.community.body}</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-3">
            {t.community.links.map((link, i) => {
              const Icon = icons[i] ?? IconArrowUpRight
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    rel="noopener"
                    className="group flex h-full items-center gap-3 rounded-xl border border-line bg-surface p-3 font-medium text-fg shadow-sm transition hover:-translate-y-0.5 hover:border-fg/25 hover:shadow-md sm:flex-col sm:items-start sm:gap-6 sm:p-4"
                  >
                    <span className="flex items-center justify-between sm:w-full">
                      <span className="grid size-10 place-items-center rounded-lg bg-muted text-fg-2 transition-colors group-hover:bg-inverse group-hover:text-on-inverse">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <IconArrowUpRight
                        className="hidden size-4 text-fg-3 transition-transform group-hover:translate-x-px group-hover:-translate-y-px group-hover:text-fg sm:block"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="flex-1 sm:flex-none">{link.label}</span>
                    <IconArrowUpRight className="size-4 shrink-0 text-fg-3 sm:hidden" aria-hidden="true" />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
