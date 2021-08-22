<h2>Tasks</h2>
<script>
    import Task from "./task.svelte";
    import { nanoid } from "nanoid";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    let taskName;
    let tasks = [];
    let currentTask;

    function addTask() {
        if ( taskName === undefined )
            return;

        tasks = [...tasks, {
            id: nanoid(5), name: taskName, current: false, iteractions: 0
        }];
        taskName = undefined;
    }

    function currentTaskChanged({detail}) {
        currentTask = detail;
        dispatch("currentTask", currentTask);
    }
</script>

<p>Current Task: {currentTask == undefined ? "None" : currentTask.name}</p>
<p>
    <input type="text" placeholder="New task" bind:value={taskName} />
    <button type="submit" on:click={addTask} >Add</button>
</p>
{#each tasks as task}
    <Task {task} on:currentTask={currentTaskChanged} />
{/each}
