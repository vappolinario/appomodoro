<script>
    import { createEventDispatcher } from "svelte";
    export let task;

    const dispatch = createEventDispatcher();

    function setCurrent() {
        task.current = true;
        dispatch("currentTask", task);
    }
</script>

<p>{task.id} - {task.name}<span> - {task.iteractions}</span>
<button type="submit" on:click={setCurrent} >Set current</button></p>
