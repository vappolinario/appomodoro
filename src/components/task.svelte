<script>
    import { createEventDispatcher } from "svelte";
    export let task;

    const dispatch = createEventDispatcher();

    function setCurrent() {
        task.current = true;
        dispatch("taskChange", task);
    }

    function removeTask() {
        dispatch("taskRemove", task);
    }
</script>

<p>{task.id} - {task.name}<span> - {task.iterations}</span>
<button type="submit" on:click={setCurrent} >Set current</button>
<button type="submit" on:click={removeTask} >Remove</button></p>
