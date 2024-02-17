<script lang="ts">
    export let title: string;
    export let description: string;
</script>

<div class="w-full h-full center">
    <div class="w-1/2 text-center">
        <h1 class="mb-8 font-bold text-center text-9xl panchang">{title}</h1>
        <p class="text-3xl">{description}</p>
    </div> 
</div>

<style>
    .panchang {
        font-family: 'Panchang-Extrabold', sans-serif;
    }
</style>