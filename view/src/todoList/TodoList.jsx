import { DataGrid } from '@mui/x-data-grid';
import { Paper, TextField, Checkbox, Button }  from '@mui/material';
import { useState, useEffect } from 'react';


const rawData = [
  {id: 1, content: "task1", completed: false },
  {id: 2, content: "task2", completed: false },
  {id: 3, content: "task3", completed: true }
]

function TodoList() {
    const [rows, setRows] = useState(rawData);
    const [isEdit, setIsEdit] = useState(false);
    const [newTask, setNewTask] = useState("");
    const [globalId, setGlobalId] = useState(4);
    const [editingId, setEditingId] = useState(-1);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'content', headerName: 'Task Name', width: 300 },
        {
          field: 'completed',
          headerName: 'Task Done?',
          width: 150,
          renderCell: (params) => (
            <Checkbox
              disabled={isEdit}
              checked={params.row.completed}
              onChange={() => handleCheckboxChange(params.row.id)}
            />
          ),
        },
        {
          field: 'edit',
          headerName: 'Edit Task',
          width: 150,
          renderCell: (params) => (
            <Button
              variant="contained"
              color="primary"
              disabled={isEdit}
              onClick={() => handleEdit(params.row)}
            >
              Edit
            </Button>
          ),
        },
        {
          field: 'delete',
          headerName: 'Delete Task',
          width: 150,
          renderCell: (params) => (
            <Button
              variant="contained"
              color="primary"
              disabled={isEdit}
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </Button>
          ),
        },
    ];
    
    const handleCheckboxChange = (id) => {
      setRows((prevData) =>
        prevData.map((row) =>
            row.id === id ? {...row, completed: !row.completed} : row
        )
      );
    };

    const handleEdit = (row) => {
        setIsEdit(true);
        setNewTask(row.content);
        setEditingId(row.id);
    }

    const handleDelete = (id) => {
      setRows((prevData) => 
        prevData.filter((row) => row.id !== id)
      )
    }



    const handleAddTask = () => {
      if (isValidTaskName(newTask)) {
        setRows((prevData) => [...prevData, {id: globalId, content: newTask, completed: false}]);
        setGlobalId((prevId) => prevId + 1)
        setNewTask("");
      } else {
        alert("The task is already there or the input was empty.")
      }
    }

    const handleEditTask = () => {
      if (isValidTaskName(newTask)) {
        setRows((prevData) => 
          prevData.map((row) => 
            row.id === editingId ? {...row, content: newTask} : row
          )
        );
        setNewTask("");
        setEditingId(-1);
        setIsEdit(false)
      } else {
        alert("The task is already there or the input was empty.")
      }
    }

    const isValidTaskName = (task) => {
        return task && !rows.some((row) => row.content === task);
    }




    

    const paginationModel = { page: 0, pageSize: 5 };

    return (
      <>
        <h1>TodoList</h1>
        <TextField 
          id="input" 
          label="Input" 
          variant="outlined" 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        {isEdit ? (
            <Button 
              variant="contained"
              onClick={handleEditTask}
            >Edit Task</Button>
          ) : (
            <Button 
              variant="contained"
              onClick={handleAddTask}
            >Add Task</Button>
          )
        }
        <Paper sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10, 20]}
            sx={{ border: 0 }}
          />
        </Paper>
      </>
    )
}

export default TodoList