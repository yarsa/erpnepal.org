import { CardGrid } from '../components/page/LinkCard'
import { PageShell, prose } from '../components/page/PageShell'
import { ShotFigure } from '../components/page/ShotFigure'

export default function NepalHrmsPage() {
  return (
    <PageShell
      crumb="Nepal HRMS"
      eyebrow="Beta · Coming soon"
      heading="Nepal HRMS"
      icon="/assets/nepal-hrms/logo.png"
      lead="Employee self-service, attendance, leave, and payroll for Nepal."
    >
      <div className={prose}>
        <p>
          Being tested as a separate app on Frappe HR, then planned for Nepal Compliance.{' '}
          <strong>Not in the released app yet; no release date.</strong>
        </p>
      </div>
      <ShotFigure
        src="/assets/nepal-hrms/bshrms-home.png"
        alt="Nepal HRMS employee app showing check-in, out-of-office work, and attendance request shortcuts"
        width={728}
        height={1430}
        eager
        className="max-w-[300px]"
      >
        Employee app, sample data
      </ShotFigure>

      <div className={prose}>
        <h2 id="beta-features">In testing</h2>
      </div>
      <CardGrid
        headingLevel="h3"
        cards={[
          { title: 'Self-service app', body: 'Check-in, leave, expenses, and salary slips on mobile.' },
          { title: 'Attendance board', body: 'Live status by department, with exception approvals.' },
          { title: 'Leave', body: 'Balances, holidays, and requests.' },
          { title: 'Nepal payroll', body: 'SSF, provident fund, gratuity, and allowances.' },
          { title: 'Reports', body: 'Monthly attendance on Nepali calendar periods.' },
          { title: 'Settings', body: 'Grace periods, leave rules, and role access.' },
        ]}
      />

      <div className={prose}>
        <h2 id="screenshots">Screenshots</h2>
      </div>
      <ShotFigure
        src="/assets/nepal-hrms/live-attendance-board.png"
        alt="Live Attendance Board grouping sample employees into Pending, Active, Checked Out, and leave columns"
        width={1558}
        height={1482}
        className="max-w-[900px]"
      >
        Live attendance board
      </ShotFigure>
      <ShotFigure
        src="/assets/nepal-hrms/monthly-attendance-sheet-bs.png"
        alt="Monthly Attendance Sheet BS with worked hours, daily attendance markers, check-in details, and spreadsheet download"
        width={2000}
        height={1137}
      >
        Monthly attendance report (BS)
      </ShotFigure>

      <div className={prose}>
        <h2 id="availability">Availability</h2>
        <p>
          Targets Frappe v15, ERPNext, and Frappe HR v15. Settings may change during testing. Licensed{' '}
          <a href="/assets/nepal-hrms/LICENSE.txt">GPL-3.0-or-later</a> (<a href="/assets/nepal-hrms/NOTICE.txt">notice</a>), © Yarsa Labs
          Pvt. Ltd.
        </p>
        <h2 id="questions">Questions</h2>
        <p>
          <strong>Can I use it today?</strong> Not in the released app. See the <a href="/features/">current features</a>.
        </p>
        <p>
          <strong>Does it replace Frappe HR?</strong> No. It builds on Frappe HR.
        </p>
      </div>
    </PageShell>
  )
}
