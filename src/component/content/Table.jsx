// import TableJS from "../../asset/js/table"
import '../../asset/css/table.css'
import DataTable from 'react-data-table-component';

const data = [{no: 1, nama: "Aku", button: "<button>P</button>"},{no: 2, nama: "Kamu"},{no: 3, nama: "Kita"},{no: 4, nama: "Dia"},{no: 5, nama: "Kami"},]
const columns = [{
    name: 'No',
    selector: row => row.no,
},{
    name: 'Nama',
    selector: row => row.nama,
},{
    name: 'Button',
    cell: (row) => (
        <div className="d-flex flex-column">
        {console.log(row)}
      <button className='btn btn-primary d-block mb-1'>Edit</button>
      <button className='btn btn-danger d-block'>Hapus</button>
      </div>
    ),
    button: true,
},]

const Table = (props) => {
    return(
        // <>
        //     <table id="table1" className="table table-bordered table-striped" style={{ "width":"100%" }}>
        //         <thead>
        //             <tr>
        //                 {props.head.map(val => (
        //                     <th className="text-center">{val}</th>
        //                 ))}
        //             </tr>
        //         </thead>
        //         <tbody>
        //         {data.map((value, index) => (
        //             <tr key={value.no}>
        //                 <td>{index+1}</td>
        //                 <td>{value.nama}</td>
        //                 <td><button>Edit</button><button>Delete</button></td>
        //             </tr>
        //     ))}
        //     </tbody>
        //     </table>
        // </>
        <DataTable title="Movie List" columns={columns} data={data} pagination/>
    )    
}

export default Table