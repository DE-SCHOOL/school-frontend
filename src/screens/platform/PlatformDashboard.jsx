import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	getDemoRequests,
	setDemoRequestStatus,
	getSchools,
	setSchoolStatus,
	clearLastCreatedSchool,
} from '../../store/platform/platformSlice';
import { platformLogout } from '../../store/platform/platformAuthSlice';
import CreateSchoolForm from './CreateSchoolForm';

const DEMO_STATUSES = ['lead', 'demo_scheduled', 'contract_sent', 'active', 'suspended', 'churned'];
const SCHOOL_STATUSES = ['pending', 'active', 'suspended'];

function PlatformDashboard() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const platformStaff = useSelector((state) => state.platformAuth.platformStaff);
	const { demoRequests, schools } = useSelector((state) => state.platform);

	const [tab, setTab] = useState('demo-requests');
	const [convertingLead, setConvertingLead] = useState(null);

	useEffect(() => {
		dispatch(getDemoRequests());
		dispatch(getSchools());
	}, [dispatch]);

	const handleLogout = () => {
		dispatch(platformLogout());
		navigate('/platform/login');
	};

	const startConvert = (demoRequest) => {
		dispatch(clearLastCreatedSchool());
		setConvertingLead(demoRequest);
		setTab('create-school');
	};

	return (
		<div className="platform-shell">
			<div className="platform-topbar">
				<div>
					<span className="wordmark">DE-SCHOOL</span>
					<span className="tag">platform console</span>
				</div>
				<div className="topbar-right">
					<span>{platformStaff?.name}</span>
					<button type="button" className="link-btn" onClick={handleLogout}>
						Log out
					</button>
				</div>
			</div>

			<div className="platform-content">
				<div className="platform-tabs">
					<button type="button" className={tab === 'demo-requests' ? 'active' : ''} onClick={() => setTab('demo-requests')}>
						Demo Requests ({demoRequests.length})
					</button>
					<button type="button" className={tab === 'schools' ? 'active' : ''} onClick={() => setTab('schools')}>
						Schools ({schools.length})
					</button>
					<button
						type="button"
						className={tab === 'create-school' ? 'active' : ''}
						onClick={() => {
							setConvertingLead(null);
							setTab('create-school');
						}}
					>
						+ Create School
					</button>
				</div>

				{tab === 'demo-requests' && (
					<div className="platform-card">
						<h2>Demo requests</h2>
						<div style={{ overflowX: 'auto' }}>
							<table className="data-table">
								<thead>
									<tr>
										<th>Contact</th>
										<th>School</th>
										<th>Email</th>
										<th>Phone</th>
										<th>City/Region</th>
										<th>Students</th>
										<th>Status</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{demoRequests.length === 0 && (
										<tr className="empty-row">
											<td colSpan={8}>No demo requests yet — share the "Book a Demo" page to start receiving leads.</td>
										</tr>
									)}
									{demoRequests.map((d) => (
										<tr key={d._id}>
											<td>{d.name}</td>
											<td>{d.schoolName}</td>
											<td>{d.contactEmail}</td>
											<td>{d.contactPhone || '—'}</td>
											<td>{d.cityRegion || '—'}</td>
											<td>{d.studentCount ?? '—'}</td>
											<td>
												<select
													value={d.status}
													onChange={(e) => dispatch(setDemoRequestStatus({ id: d._id, status: e.target.value }))}
												>
													{DEMO_STATUSES.map((s) => (
														<option key={s} value={s}>
															{s}
														</option>
													))}
												</select>
											</td>
											<td>
												{d.schoolId ? (
													<span className="status-pill status-active">converted</span>
												) : (
													<button type="button" className="btn btn-solid btn-small" onClick={() => startConvert(d)}>
														Convert to school
													</button>
												)}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				)}

				{tab === 'schools' && (
					<div className="platform-card">
						<h2>Schools</h2>
						<div style={{ overflowX: 'auto' }}>
							<table className="data-table">
								<thead>
									<tr>
										<th>Name</th>
										<th>Slug</th>
										<th>Contact</th>
										<th>Status</th>
									</tr>
								</thead>
								<tbody>
									{schools.length === 0 && (
										<tr className="empty-row">
											<td colSpan={4}>No schools created yet.</td>
										</tr>
									)}
									{schools.map((s) => (
										<tr key={s._id}>
											<td>{s.name}</td>
											<td>
												<code>{s.slug}</code>
											</td>
											<td>{s.contactEmail}</td>
											<td>
												<select
													value={s.status}
													onChange={(e) => dispatch(setSchoolStatus({ id: s._id, status: e.target.value }))}
												>
													{SCHOOL_STATUSES.map((st) => (
														<option key={st} value={st}>
															{st}
														</option>
													))}
												</select>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				)}

				{tab === 'create-school' && (
					<div className="platform-card">
						<h2>{convertingLead ? `Convert lead: ${convertingLead.schoolName}` : 'Create a new school'}</h2>
						<CreateSchoolForm demoRequest={convertingLead} onDone={() => setTab('schools')} />
					</div>
				)}
			</div>
		</div>
	);
}

export default PlatformDashboard;
