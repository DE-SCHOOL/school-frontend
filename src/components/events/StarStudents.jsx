const starStudents = [
  {
    id: "swe2019",
    name: "John Doe",
    marks: 1190,
    percentage: 98,
    year: 2019,
    picture: 'https://randomuser.me/api/portraits/thumb/women/53.jpg',
  },
  {
    id: "its218",
    name: "Jane Doe",
    marks: 1175,
    percentage: 94,
    year: 2018,
    picture: 'https://randomuser.me/api/portraits/thumb/men/48.jpg',
  },
  {
    id: "swe2017",
    name: "Eve Dallas",
    marks: 1196,
    percentage: 99,
    year: 2017,
    picture: 'https://randomuser.me/api/portraits/thumb/women/16.jpg',
  },
  {
    id: "gwd2016",
    name: "Just Roarke",
    marks: 1198,
    percentage: 99,
    year: 2016,
    picture: 'https://randomuser.me/api/portraits/thumb/men/10.jpg',
  },
  {
    id: "swe2015",
    name: "Delia Peabody",
    marks: 1189,
    percentage: 98,
    year: 2019,
    picture: 'https://randomuser.me/api/portraits/thumb/men/72.jpg',
  },
];


function StarStudent(){
  return(
    <div className="star-students-table">
      <table>
        <thead>
          <tr className="table-headings">
            <th> ID </th>
            <th> Name </th>
            <th> Marks </th>
            <th> Percentage </th>
            <th> Year </th>
          </tr>
        </thead>
        <tbody>
          {starStudents.map((student, index) => {
            return (
              <tr key={index} className="body">
                <td> {student.id} </td>
                <td className="flex">
                  <img src={student.picture} alt={student.name} />
                 {student.name}</td>
                <td className="centered-text"> {student.marks} </td>
                <td className="centered-text">
                  {student.percentage}%
                </td>
                <td> {student.year} </td>
              </tr>
            );
          })}
        </tbody>
       </table>
    </div>
  )
}

export default StarStudent