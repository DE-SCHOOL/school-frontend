import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSchool, clearLastCreatedSchool } from '../../store/platform/platformSlice';

const slugify = (value) =>
	value
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');

// Directly answers "at what point is the first admin of a school
// created" — right here. school.controller.js's createSchool creates
// the School and this staff record in one atomic step; there is no
// separate "invite an admin later" flow by design (see that
// controller's own comment).
function CreateSchoolForm({ demoRequest, onDone }) {
	const dispatch = useDispatch();
	const { isLoading, error, errorMessage, lastCreatedSchool } = useSelector((state) => state.platform);

	const [name, setName] = useState(demoRequest?.schoolName || '');
	const [slug, setSlug] = useState(demoRequest ? slugify(demoRequest.schoolName) : '');
	const [contactEmail, setContactEmail] = useState(demoRequest?.contactEmail || '');
	const [contactPhone, setContactPhone] = useState(demoRequest?.contactPhone || '');
	const [address, setAddress] = useState(demoRequest?.cityRegion || '');
	const [plan, setPlan] = useState('starter');
	const [billingCycle, setBillingCycle] = useState('monthly');

	const [adminName, setAdminName] = useState('');
	const [adminEmail, setAdminEmail] = useState('');
	const [adminPassword, setAdminPassword] = useState('');
	const [adminTel, setAdminTel] = useState('');
	const [adminGender, setAdminGender] = useState('male');
	const [adminDob, setAdminDob] = useState('');
	const [adminMatricule, setAdminMatricule] = useState('ADMIN-001');
	const [adminCertificate, setAdminCertificate] = useState('N/A');
	const [adminMaritalStatus, setAdminMaritalStatus] = useState('not married');

	const handleNameChange = (value) => {
		setName(value);
		setSlug(slugify(value));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(
			createSchool({
				name,
				slug,
				contactEmail,
				contactPhone,
				address,
				plan,
				billingCycle,
				demoRequestId: demoRequest?._id,
				firstAdmin: {
					name: adminName,
					email: adminEmail,
					password: adminPassword,
					confirmPassword: adminPassword,
					tel: adminTel,
					gender: adminGender,
					dob: adminDob,
					matricule: adminMatricule,
					high_certificate: adminCertificate,
					marital_status: adminMaritalStatus,
				},
			})
		);
	};

	if (lastCreatedSchool) {
		return (
			<div className="inline-success">
				<strong>{lastCreatedSchool.name}</strong> was created (slug:{' '}
				<code>{lastCreatedSchool.slug}</code>). Share the admin login above with the
				school — they can sign in now at <code>/auth/signin</code>.
				<div className="form-actions">
					<button
						type="button"
						className="btn btn-solid"
						onClick={() => {
							dispatch(clearLastCreatedSchool());
							if (onDone) onDone();
						}}
					>
						Done
					</button>
				</div>
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit}>
			<h3 style={{ fontSize: '1.6rem', marginTop: 0 }}>School details</h3>
			<div className="platform-form-grid">
				<div>
					<label htmlFor="name">School name</label>
					<input
						id="name"
						value={name}
						onChange={(e) => handleNameChange(e.target.value)}
						required
					/>
				</div>
				<div>
					<label htmlFor="slug">Slug (URL-safe, unique)</label>
					<input id="slug" value={slug} onChange={(e) => setSlug(slugify(e.target.value))} required />
				</div>
				<div>
					<label htmlFor="contactEmail">Contact email</label>
					<input
						id="contactEmail"
						type="email"
						value={contactEmail}
						onChange={(e) => setContactEmail(e.target.value)}
						required
					/>
				</div>
				<div>
					<label htmlFor="contactPhone">Contact phone</label>
					<input id="contactPhone" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} />
				</div>
				<div>
					<label htmlFor="address">Address</label>
					<input id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
				</div>
				<div>
					<label htmlFor="plan">Plan</label>
					<select id="plan" value={plan} onChange={(e) => setPlan(e.target.value)}>
						<option value="starter">Starter</option>
						<option value="standard">Standard</option>
						<option value="premium">Premium</option>
					</select>
				</div>
				<div>
					<label htmlFor="billingCycle">Billing cycle</label>
					<select id="billingCycle" value={billingCycle} onChange={(e) => setBillingCycle(e.target.value)}>
						<option value="monthly">Monthly</option>
						<option value="annual">Annual</option>
					</select>
				</div>
			</div>

			<h3 style={{ fontSize: '1.6rem' }}>First administrator</h3>
			<p style={{ fontSize: '1.3rem', color: '#6f6f6f', marginTop: '-1rem' }}>
				This account is created immediately and is who the school signs in with first.
			</p>
			<div className="platform-form-grid">
				<div>
					<label htmlFor="adminName">Full name</label>
					<input id="adminName" value={adminName} onChange={(e) => setAdminName(e.target.value)} required />
				</div>
				<div>
					<label htmlFor="adminEmail">Email</label>
					<input
						id="adminEmail"
						type="email"
						value={adminEmail}
						onChange={(e) => setAdminEmail(e.target.value)}
						required
					/>
				</div>
				<div>
					<label htmlFor="adminPassword">Temporary password</label>
					<input
						id="adminPassword"
						type="text"
						value={adminPassword}
						onChange={(e) => setAdminPassword(e.target.value)}
						minLength={8}
						required
					/>
				</div>
				<div>
					<label htmlFor="adminTel">Phone (starts with 6, 9 digits)</label>
					<input id="adminTel" value={adminTel} onChange={(e) => setAdminTel(e.target.value)} required />
				</div>
				<div>
					<label htmlFor="adminGender">Gender</label>
					<select id="adminGender" value={adminGender} onChange={(e) => setAdminGender(e.target.value)}>
						<option value="male">Male</option>
						<option value="female">Female</option>
					</select>
				</div>
				<div>
					<label htmlFor="adminDob">Date of birth</label>
					<input
						id="adminDob"
						type="date"
						value={adminDob}
						onChange={(e) => setAdminDob(e.target.value)}
						required
					/>
				</div>
				<div>
					<label htmlFor="adminMatricule">Staff matricule</label>
					<input
						id="adminMatricule"
						value={adminMatricule}
						onChange={(e) => setAdminMatricule(e.target.value)}
						required
					/>
				</div>
				<div>
					<label htmlFor="adminCertificate">Highest certificate</label>
					<input
						id="adminCertificate"
						value={adminCertificate}
						onChange={(e) => setAdminCertificate(e.target.value)}
						required
					/>
				</div>
				<div>
					<label htmlFor="adminMaritalStatus">Marital status</label>
					<select
						id="adminMaritalStatus"
						value={adminMaritalStatus}
						onChange={(e) => setAdminMaritalStatus(e.target.value)}
					>
						<option value="not married">Not married</option>
						<option value="married">Married</option>
						<option value="seperated">Separated</option>
						<option value="devorced">Divorced</option>
					</select>
				</div>
			</div>

			<div className="form-actions">
				<button type="submit" className="btn btn-solid" disabled={isLoading}>
					{isLoading ? 'Creating…' : 'Create school'}
				</button>
			</div>
			{error && <div className="inline-error">{errorMessage}</div>}
		</form>
	);
}

export default CreateSchoolForm;
