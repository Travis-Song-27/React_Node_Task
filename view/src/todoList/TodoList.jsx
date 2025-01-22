import { DataGrid } from '@mui/x-data-grid';
import { Paper, TextField, Checkbox, Button }  from '@mui/material';
import { useState, useEffect } from 'react';

const URL = "http://localhost:5000"

function TodoList() {
    const [rows, setRows] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [newTask, setNewTask] = useState("");
    const [editingId, setEditingId] = useState(-1);

    const columns = [
        { field: 'task_id', headerName: 'ID', width: 150},
        { field: 'content', headerName: 'Task Name', width: 300 },
        {
          field: 'completed',
          headerName: 'Task Done?',
          width: 150,
          renderCell: (params) => (
            <Checkbox
              disabled={isEdit}
              checked={params.row.completed}
              onChange={() => handleCheckboxChange(params.row.task_id)}
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
              onClick={() => handleDelete(params.row.task_id)}
            >
              Delete
            </Button>
          ),
        },
    ];



    // 1. Get all the data


    useEffect(() => {
      const controller = new AbortController();
      const signal = controller.signal;

      const fetchRows = async () => {
        try {
          const res = await fetch(`${URL}/api/tasks`, {
            method: "GET",
            signal: signal
          });
          const data = await res.json();
          console.log(data.tasks);
          setRows(data.tasks);
        } catch (e) {
          if (e.name === "AbortError") {
            console.log("Fetch aborted");
          } else {
            console.error("There is an error caught in raw rows data fetching:", e);
          }     
        }
      }

      fetchRows();

      return () => {
        controller.abort();
      }

    }, [])


    /*

    useEffect(() => {
      const controller = new AbortController(); 
      const signal = controller.signal;
    
      const fetchRows = async () => {
        try {
          const res = await fetch(`${URL}/tasks`, { 
            method: "GET",
            signal: signal, 
          });
    
          if (!res.ok) {
            throw new Error(`Failed to fetch tasks: ${res.status} ${res.statusText}`);
          }
    
          const data = await res.json();
          setRows(data); 
        } catch (e) {
          if (e.name === "AbortError") {
            console.log("Fetch aborted");
          } else {
            console.error("Error fetching tasks:", e);
          }
        }
      };
    
      fetchRows(); 
      return () => {
        controller.abort(); 
      };
    }, []); 
    
    */



    // 2. Add the data

    const postNewTask = async (content) => {
      try {
        const res = await fetch(`${URL}/api/tasks`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content })
        });
        console.log("POST: ", res);
        return await res.json();
      } catch (err) {
        console.error("Failed to post new task:", err);
        return "Failed";
      }
    }

    const handleAddTask = async () => {
      if (isValidTaskName(newTask)) {
        const res = await postNewTask(newTask);

        if (res !== "Failed") {
          console.log(res);

          setRows((prevData) => [...prevData, {task_id: res.unique_id, content: newTask, completed: false}]);
          setNewTask("");
        } else {
          alert("Failed to add the task");
        }

      } else {
        alert("The task is already there or the input was empty.")
      }
    }




    /*

    const postNewTask = async (content) => {
      try {
        const res = await fetch(`${URL}/tasks`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content }),
        });
    
        if (!res.ok) {
          throw new Error(`Failed to post new task: ${res.status} ${res.statusText}`);
        }
    
        const data = await res.json(); 
        console.log("POST Response:", data);
        return data; 
      } catch (err) {
        console.error("Failed to post new task:", err);
        return "Failed";
      }
    };


    const handleAddTask = async () => {
      if (isValidTaskName(newTask)) { 
        const res = await postNewTask(newTask);
    
        if (res) { 
          setRows((prevData) => [...prevData, res]);
          setNewTask(""); 
        } else {
          alert("Failed to add the task");
        }
      } else {
        alert("The task is already there or the input was empty.");
      }
    };


    */


    // 3. Modify the data


    const handleModifyChecked = async (content, completed, id) => {
      try {
        const res = await fetch(`${URL}/api/tasks/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content, completed })
        })

        console.log("PUT", res);

        return await res.json();

      } catch (error) {
        console.error("Failed to modify task to change checked", err);

        return "Failed";
      }
    }
    
    const handleCheckboxChange = async (id) => {
      const item = rows.find((row) => row.task_id === id);
      const res = await handleModifyChecked("N/A", !item.completed, item.task_id);

      if (res !== "Failed") {
        setRows((prevData) =>
          prevData.map((row) =>
              row.task_id === id ? {...row, completed: !row.completed} : row
          )
        );
      } else {
          alert("Failed to modify the completed status");
      } 
    };



    const handleEdit = (row) => {
        setIsEdit(true);
        setNewTask(row.content);
        setEditingId(row.task_id);
    }



    const handleModifyTask = async (content, completed) => {
      try {
        const res = await fetch(`${URL}/api/tasks/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content, completed })
        })

        console.log("PUT", res);

        return await res.json();

      } catch (error) {
        console.error("Failed to modify task", err);

        return "Failed";
      }
    }


    const handleEditTask = async () => {
      if (isValidTaskName(newTask)) {
        const res = await handleModifyTask(newTask, "N/A");
        
        if (res !== "Failed") {
          console.log(res);

          setRows((prevData) => 
            prevData.map((row) => 
              row.task_id === editingId ? {...row, content: newTask} : row
            )
          );
          setNewTask("");
          setEditingId(-1);
          setIsEdit(false);
        } else {
          alert("Failed to modify the task content");
        }
      } else {
        alert("The task is already there or the input was empty.")
      }
    }



    // 4. delete the data

    const deleteTask = async (id) => {
      try {
        const res = await fetch(`${URL}/api/tasks/${id}`, {
          method: "DELETE"
        })
        return await res.json();
      } catch (err) {
        console.error("Failed to detele the task:", err);
        return "Failed";
      }
    }

    const handleDelete = async (id) => {
      const res = await deleteTask(id);
      if (res !== "Failed") {
        setRows((prevData) => 
          prevData.filter((row) => row.task_id !== id)
        )
      } else {
        alert("Failed to delete a task");
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
            getRowId={(row) => row.task_id}
          />
        </Paper>
      </>
    )
}

export default TodoList