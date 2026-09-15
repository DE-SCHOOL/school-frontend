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
					<span className="eyebrow">School management, built for Cameroon</span>
					<h1>Run your whole school. Pay and get paid on Stellar.</h1>
					<p>
						DE-SCHOOL is a multi-tenant school management platform: admissions, grades,
						attendance, timetables, staff and reports — with tuition, canteen top-ups,
						and subscriptions settled instantly over the Stellar network, no bank delays,
						no reconciliation headaches.
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
					<span className="stat-label">school already live on the platform</span>
					<hr />
					<span className="stat">1,300+</span>
					<span className="stat-label">real student records managed</span>
				</div>
			</header>

			<section className="features">
				<h2>Everything a school needs, one account per student</h2>
				<p className="section-sub">
					Every school gets its own private, isolated workspace. Students who move
					between DE-SCHOOL schools keep one identity across all of them.
				</p>

				<div className="feature-grid">
					<div className="feature-card flagship">
						<span className="icon">⭐</span>
						<h3>Stellar-powered payments</h3>
						<p>
							Tuition invoices, subscription billing, and canteen top-ups settle in
							USDC over the Stellar network in seconds — with an optional, fully
							on-chain smart-contract billing record for full transparency. Mobile
							money and card payments are on the roadmap.
						</p>
					</div>
					<div className="feature-card">
						<span className="icon">🏫</span>
						<h3>True multi-tenant SaaS</h3>
						<p>
							Your school's data is fully isolated from every other school on the
							platform — enforced at the database layer, not just the UI.
						</p>
					</div>
					<div className="feature-card">
						<span className="icon">🎓</span>
						<h3>One student identity, many schools</h3>
						<p>
							A student's account follows them if they enroll at more than one
							DE-SCHOOL school — no duplicate sign-ups, one login.
						</p>
					</div>
					<div className="feature-card">
						<span className="icon">📊</span>
						<h3>Grades, attendance & reports</h3>
						<p>
							Mark sheets, course statistics, resit lists, and transcripts —
							generated per school, with your own school's letterhead.
						</p>
					</div>
					<div className="feature-card">
						<span className="icon">🍽️</span>
						<h3>Canteen, without the queue</h3>
						<p>
							Students top up a spendable balance once; point-of-sale purchases
							deduct instantly, no waiting on a payment network at the till.
						</p>
					</div>
					<div className="feature-card">
						<span className="icon">🔐</span>
						<h3>Role-based staff access</h3>
						<p>
							Lecturers, secretariat, HODs, directors, and admins each see exactly
							what their role needs — nothing more.
						</p>
					</div>
				</div>
			</section>

			<section className="how-it-works">
				<h2>How schools get started</h2>
				<div className="steps">
					<div className="step">
						<span className="step-num">1</span>
						<h3>Book a demo</h3>
						<p>Tell us about your school — we'll reach out to schedule a walkthrough.</p>
					</div>
					<div className="step">
						<span className="step-num">2</span>
						<h3>We set up your school</h3>
						<p>
							Your school's own private workspace is created, and your first
							administrator account is issued.
						</p>
					</div>
					<div className="step">
						<span className="step-num">3</span>
						<h3>Your team logs in</h3>
						<p>
							Your admin invites staff, and everyone signs in with their own email —
							no separate app, no setup on your end.
						</p>
					</div>
				</div>
			</section>

			<section className="cta-band">
				<h2>Ready to see it running on your school's own data?</h2>
				<Link to="/book-demo" className="btn btn-primary">
					Book a Free Demo
				</Link>
			</section>

			<footer className="public-footer">
				<p>DE-SCHOOL — school management, powered by Stellar. Built in Cameroon.</p>
			</footer>
		</div>
	);
}

export default Landing;
