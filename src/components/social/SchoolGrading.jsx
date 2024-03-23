import React from 'react';
import { gradeAndRange } from '../../utilities/appData';

function SchoolGrading() {
	return (
		<div className="total-gpa school-grading">
			<table className="results-total mg-top">
				<thead>
					<tr>
						<th colSpan={2}>Grade System</th>
					</tr>
					<tr>
						<th>Grade</th>
						<th>Mark</th>
					</tr>
				</thead>
				<tbody>
					{gradeAndRange.map((gradeSystem, index) => {
						return (
							<tr key={index}>
								<td>{gradeSystem.grade}</td>
								<td>{gradeSystem.range}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<div className="other-info">
				<p>
					NB: <b>Cummulative Graded Point Average is on a Scale of 4</b>
				</p>
				<div className="info">
					<span>
						Tel:
						<b>
							(+237)
							<a href="tel:+237673034195">673034195</a> /
							<a href="tel:+237670836477">670836477</a> /
							<a href="tel:+237672339570">672339570</a>
						</b>
					</span>
					<span>
						Email:{' '}
						<b>
							<a href="mailto:lucbuea@gmail.com">lucbuea@gmail.com</a>
						</b>
					</span>
					<span>
						Website:{' '}
						<b>
							<a href="https://www.landmark.cm">www.landmark.cm</a>
						</b>
					</span>
				</div>
				<div className="registrar">
					<span>The REGISTRAR</span>
				</div>
			</div>
		</div>
	);
}

export default SchoolGrading;
