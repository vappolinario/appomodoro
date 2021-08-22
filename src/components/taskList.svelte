<script>
    import Timer from "./timer.svelte";
    import Task from "./task.svelte";
    import { nanoid } from "nanoid";

    let tasks = [];
    let newTaskName;
    let currentTask;

    function addTask() {
        if ( newTaskName === undefined )
            return;
        tasks = [...tasks, {
            id: nanoid(5),
            name: newTaskName,
            current: false,
            iterations: 0,
            duration: 0
        }];
        newTaskName = undefined;
    }

    function currentTaskChanged({ detail }) {
        currentTask = detail;
    }

    function taskRemoved({ detail }) {
        tasks = tasks.filter(t => t.id != detail.id);
        if ( currentTask.id == detail.id )
            currentTask = undefined;
    }

    function timerElapsed( {detail}) {
        console.log(detail, "task");

        if ( currentTask === undefined || detail.onBreak )
            return;

        currentTask.duration += timerElapsed;
        currentTask.iterations += 1;
        tasks=tasks;
    }
</script>
<p><strong>Current task:</strong> {currentTask === undefined ? "not set" : currentTask.name}</p>
<Timer on:timerElapsed={timerElapsed}  />

<h2>Tasks</h2>

<p>
    <input type="text" placeholder="New task" bind:value={newTaskName} />
    <button type="submit" on:click={addTask} >Add</button>
</p>

{#each tasks as task}
    <Task {task} on:taskChange={currentTaskChanged} on:taskRemove={taskRemoved} />
{/each}
