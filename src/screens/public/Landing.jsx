import { Link } from 'react-router-dom';

function Landing() {
	return (
		<div className="public-page">
			<nav className="public-nav">
				<Link to="/" className="wordmark">
					DE-SCHOOL
				</Link>
				<div className="nav-links">
					<Link to="/book-demo">Book a Demo</Link>
					<Link to="/auth/signin">Staff / Student Login</Link>
				</div>
			</nav>

			<header className="hero">
				<div className="hero-copy">
					<span className="eyebrow">Built for Cameroonian schools, from the register to the report card</span>
					<h1>The administration behind your school, finally organised.</h1>
					<p>
						DE-SCHOOL replaces the exercise books, the scattered Excel sheets, and the
						end-of-term scramble to compile mark sheets with one system your whole
						institution runs on — admissions, continuous assessment, mock and sit-in
						exams, attendance, timetabling, and staff records, built around how
						Cameroonian schools actually operate: matricule numbers, CA and exam
						weighting, resit lists, and reports your inspectors will recognise. School
						fees, canteen top-ups, and platform subscriptions settle over the Stellar
						network in seconds, so a payment made in Douala reaches the school's
						account before the parent has left the queue.
					</p>
					<div className="hero-ctas">
						<Link to="/book-demo" className="btn btn-primary">
							Book a Free Demo
						</Link>
						<Link to="/auth/signin" className="btn btn-outline">
							Staff / Student Login
						</Link>
					</div>
				</div>

				<div className="hero-badge">
					<span className="stat">1</span>
					<span className="stat-label">institution already running its full academic year on DE-SCHOOL</span>
					<hr />
					<span className="stat">1,300+</span>
					<span className="stat-label">student records, and every mark sheet behind them, managed end to end</span>
				</div>
			</header>

			<section className="features">
				<h2>Everything a registrar's office, a bursary, and a principal's office each rely on</h2>
				<p className="section-sub">
					Every school that joins DE-SCHOOL gets its own private workspace, walled off
					from every other school on the platform. Nothing about your students, your
					staff, or your finances is ever visible to anyone outside your institution.
				</p>

				<div className="feature-grid">
					<div className="feature-card flagship">
						<span className="icon">01</span>
						<h3>Fee collection that reconciles itself</h3>
						<p>
							Tuition invoices, subscription billing, and canteen top-ups settle in
							USDC over the Stellar network in seconds, with an optional fully
							on-chain billing record a proprietor or a board can audit directly. No
							more chasing a bank teller's stamp, no more disputed cash receipts.
							Mobile money and card rails are the next thing we're building.
						</p>
					</div>
					<div className="feature-card">
						<span className="icon">02</span>
						<h3>One school, fully separated from every other</h3>
						<p>
							Multi-tenant by design: your data lives in its own isolated space,
							enforced where it actually matters — at the database — not left to a
							login screen's good faith.
						</p>
					</div>
					<div className="feature-card">
						<span className="icon">03</span>
						<h3>A student's record follows the student</h3>
						<p>
							A learner enrolled at more than one DE-SCHOOL institution keeps a single
							identity across all of them — no re-registering from scratch, no
							duplicate accounts to manage.
						</p>
					</div>
					<div className="feature-card">
						<span className="icon">04</span>
						<h3>Marks, attendance, and the reports built from them</h3>
						<p>
							CA and exam entry, mock results, resit lists, course statistics, and
							transcripts — generated under your own school's letterhead, formatted
							the way your registrar's office already expects them.
						</p>
					</div>
					<div className="feature-card">
						<span className="icon">05</span>
						<h3>A canteen line that actually moves</h3>
						<p>
							Students and parents top up a spendable balance once; every purchase at
							the till deducts instantly, with no payment network to wait on during
							the lunch rush.
						</p>
					</div>
					<div className="feature-card">
						<span className="icon">06</span>
						<h3>Access that matches each role</h3>
						<p>
							Lecturers, secretariat staff, heads of department, directors, and
							administrators each see exactly what their office needs — nothing they
							don't.
						</p>
					</div>
				</div>
			</section>

			<section className="how-it-works">
				<h2>From first conversation to your staff signing in</h2>
				<div className="steps">
					<div className="step">
						<span className="step-num">1</span>
						<h3>Book a demo</h3>
						<p>
							Tell us about your institution — student numbers, current record-keeping,
							what's costing your registrar the most time. We schedule a walkthrough
							around your school's own data, not a generic script.
						</p>
					</div>
					<div className="step">
						<span className="step-num">2</span>
						<h3>Your school is provisioned</h3>
						<p>
							A private workspace is created for your institution, and its first
							administrator account is issued directly to your proprietor or principal
							— no waiting on a support queue.
						</p>
					</div>
					<div className="step">
						<span className="step-num">3</span>
						<h3>Your staff sign in and get to work</h3>
						<p>
							Your administrator brings on the rest of your staff, each with their own
							login and their own role. Nothing else to install, nothing else to
							configure.
						</p>
					</div>
				</div>
			</section>

			<section className="cta-band">
				<h2>See it running against a set of records like your own.</h2>
				<Link to="/book-demo" className="btn btn-primary">
					Book a Free Demo
				</Link>
			</section>

			<footer className="public-footer">
				<p>DE-SCHOOL — school administration for Cameroon, settled on Stellar.</p>
			</footer>
		</div>
	);
}

export default Landing;
