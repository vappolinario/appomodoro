<script>
	import { createEventDispatcher } from 'svelte';
	export let task;
	import Button from '@smui/button';
	import { Row, Cell } from '@smui/data-table';
	const dispatch = createEventDispatcher();

	function setCurrent() {
		task.current = true;
		dispatch('taskChange', task);
	}

	function removeTask() {
		dispatch('taskRemove', task);
	}
</script>

<Row>
	<Cell>{task.id}</Cell>
	<Cell>{task.name}</Cell>
	<Cell>{task.iterations}</Cell>
	<Cell><Button type="submit" on:click={setCurrent}>Set current</Button></Cell>
	<Cell><Button type="submit" on:click={removeTask}>Remove</Button></Cell>
</Row>
