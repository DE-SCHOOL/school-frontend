const startStudetns = [
	{
		id: 'swe2019',
		name: 'John Doe',
		marks: 1190,
		percentage: 98,
		year: 2019,
	},
	{
		id: 'its218',
		name: 'Jane Doe',
		marks: 1175,
		percentage: 94,
		year: 2018,
	},
	{
		id: 'swe2017',
		name: 'Eve Dallas',
		marks: 1196,
		percentage: 99,
		year: 2017,
	},
	{
		id: 'gwd2016',
		name: 'Just Roarke',
		marks: 1198,
		percentage: 99,
		year: 2016,
	},
	{
		id: 'swe2015',
		name: 'Delia Peabody',
		marks: 1189,
		percentage: 98,
		year: 2019,
	},
];

function AdminDashboard() {
	return (
		<div className="dashboard-body">
			<div className="page-header">
				<h1>Welcome Admin!</h1>
				<ul>
					<li>
						<a href="#ids">Home</a>
					</li>
					<li>/Admin</li>
				</ul>
			</div>
			<div className="school-overview">
				<div className="overview">
					<div className="info">
						<h4>Students</h4>
						<h6>50055</h6>
					</div>
					<div className="icon">👩‍🎓</div>
				</div>
				<div className="overview">
					<div className="info">
						<h4>Awards</h4>
						<h6>50+</h6>
					</div>
					<div className="icon">📰</div>
				</div>
				<div className="overview">
					<div className="info">
						<h4>Departments</h4>
						<h6>10+</h6>
					</div>
					<div className="icon">🏚️</div>
				</div>
				<div className="overview">
					<div className="info">
						<h4>Revenue</h4>
						<h6>1M+</h6>
					</div>
					<div className="icon">💸</div>
				</div>
			</div>
			<div className="card">
				<div className="card_body">
					<div className="star_students">
						<h5>Star Students</h5>
					</div>
					<div className="table">
						<table>
							<thead>
								<tr className="headings">
									<th> ID </th>
									<th> Name </th>
									<th className="centered-text"> Marks </th>
									<th className="centered-text"> Percentage </th>
									<th className="centered-text"> Year </th>
								</tr>
							</thead>
							<tbody>
								{startStudetns.map((student, index) => {
									return (
										<tr key={index} className="body">
											<td> {student.id} </td>
											<td> {student.name} </td>
											<td className="centered-text"> {student.marks} </td>
											<td className="centered-text"> {student.percentage}% </td>
											<td> {student.year} </td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>

				<div className="card_body">
					<div className="activity">
						<h5>Student Activity</h5>
					</div>
					<div className="student_activity">
						<div className="activity-body">
							<div className="activity-awards">
								<img src="" alt="roarke" />
								<div className="award-details">
									<h4>1st Place in "Chess"</h4>
									<h5>Jane Doe won 1st place in Chess</h5>
								</div>
								<div className="award-time">
									<span>1 Day ago</span>
								</div>
							</div>

							<div className="activity-awards">
								<img src="" alt="eve" />
								<div className="award-details">
									<h4>!st place in L-Majesty</h4>
									<h5>Roarke won L-Majesty for the week</h5>
								</div>
								<div className="award-time">
									<span>5 days ago</span>
								</div>
							</div>

							<div className="activity-awards">
								<img src="" alt="jane" />
								<div className="award-details">
									<h4>Reading Competition</h4>
									<h5>Delia Peabody participatd in reading competition</h5>
								</div>
								<div className="award-time">
									<span>1 week ago</span>
								</div>
							</div>

							<div className="activity-awards">
								<img src="" alt="doe" />
								<div className="award-details">
									<h4>Motivation</h4>
									<h5>John Doe motivated alot of students</h5>
								</div>
								<div className="award-time">
									<span> 2 Weeks ago</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="social-media">
				<div className="social facebook">
					<div className="info">
						<h4>like us on facebook</h4>
						<h6>1K+</h6>
					</div>
					<div className="icon">🥰</div>
				</div>
				<div className="social twitter">
					<div className="info">
						<h4>follow us on twitter</h4>
						<h6>1024</h6>
					</div>
					<div className="icon">🥰</div>
				</div>
				<div className="social instagram">
					<div className="info">
						<h4>follow us on instagram</h4>
						<h6>2089</h6>
					</div>
					<div className="icon">🥰</div>
				</div>
				<div className="social linkedIn">
					<div className="info">
						<h4>follow us on linkedin</h4>
						<h6>5500</h6>
					</div>
					<div className="icon">🥰</div>
				</div>
			</div>
			<footer>
				<h4>copyright &copy; 2023 LIT.</h4>
			</footer>
		</div>
	);
}

export default AdminDashboard;
