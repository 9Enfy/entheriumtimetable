import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'Materia', headerName: 'materia', width: 130 },
  { field: 'Aula', headerName: 'aula', width: 130 },
  { field: 'OraInizio',headerName: 'ora inizio',width:130},
  { field: 'OraFine',headerName: 'ora fine',width:130},
];
export default function OrarioGiornoAlt(rows) {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}