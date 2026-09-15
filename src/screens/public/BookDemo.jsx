import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { submitDemoRequest } from '../../store/demo-request/demoRequestSlice';

function BookDemo() {
	const dispatch = useDispatch();
	const { isLoading, isSubmitted, error, errorMessage } = useSelector((state) => state.demoRequest);

	const [form, setForm] = useState({
		name: '',
		schoolName: '',
		contactEmail: '',
		contactPhone: '',
		cityRegion: '',
		studentCount: '',
		notes: '',
	});

	const handleChange = (e) => {
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(
			submitDemoRequest({
				...form,
				studentCount: form.studentCount ? Number(form.studentCount) : undefined,
			})
		);
	};

	return (
		<div className="public-page">
			<nav className="public-nav">
				<Link to="/" className="wordmark">
					DE-SCHOOL
				</Link>
				<div className="nav-links">
					<Link to="/auth/signin">Staff / Student Login</Link>
				</div>
			</nav>

			<div className="public-form-page">
				<div className="public-form-card">
					{isSubmitted ? (
						<div className="success-state">
							<span className="icon">✅</span>
							<h1>Thanks — we've got it</h1>
							<p>
								Your demo request has been received. Someone from the DE-SCHOOL team
								will reach out to the contact email you provided to schedule a
								walkthrough.
							</p>
							<div className="form-actions">
								<Link to="/" className="btn btn-solid">
									Back to home
								</Link>
							</div>
						</div>
					) : (
						<>
							<h1>Book a free demo</h1>
							<p className="form-sub">
								Tell us a bit about your school. This takes about a minute — no
								account needed.
							</p>

							<form onSubmit={handleSubmit}>
								<div className="field-row">
									<div>
										<label htmlFor="name">Your name</label>
										<input
											id="name"
											name="name"
											type="text"
											value={form.name}
											onChange={handleChange}
											placeholder="Full name"
											required
										/>
									</div>
									<div>
										<label htmlFor="schoolName">School name</label>
										<input
											id="schoolName"
											name="schoolName"
											type="text"
											value={form.schoolName}
											onChange={handleChange}
											placeholder="e.g. Landmark Metropolitan University"
											required
										/>
									</div>
								</div>

								<div className="field-row">
									<div>
										<label htmlFor="contactEmail">Contact email</label>
										<input
											id="contactEmail"
											name="contactEmail"
											type="email"
											value={form.contactEmail}
											onChange={handleChange}
											placeholder="you@school.cm"
											required
										/>
									</div>
									<div>
										<label htmlFor="contactPhone">Contact phone</label>
										<input
											id="contactPhone"
											name="contactPhone"
											type="tel"
											value={form.contactPhone}
											onChange={handleChange}
											placeholder="6XX XXX XXX"
										/>
									</div>
								</div>

								<div className="field-row">
									<div>
										<label htmlFor="cityRegion">City / Region</label>
										<input
											id="cityRegion"
											name="cityRegion"
											type="text"
											value={form.cityRegion}
											onChange={handleChange}
											placeholder="e.g. Buea, South West"
										/>
									</div>
									<div>
										<label htmlFor="studentCount">Approx. number of students</label>
										<input
											id="studentCount"
											name="studentCount"
											type="number"
											min="0"
											value={form.studentCount}
											onChange={handleChange}
											placeholder="e.g. 500"
										/>
									</div>
								</div>

								<label htmlFor="notes">Anything else we should know?</label>
								<textarea
									id="notes"
									name="notes"
									value={form.notes}
									onChange={handleChange}
									placeholder="Optional"
								/>

								<div className="form-actions">
									<button type="submit" className="btn btn-solid btn-full" disabled={isLoading}>
										{isLoading ? 'Sending…' : 'Request my demo'}
									</button>
								</div>

								{error && <div className="inline-error">{errorMessage}</div>}
							</form>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default BookDemo;
