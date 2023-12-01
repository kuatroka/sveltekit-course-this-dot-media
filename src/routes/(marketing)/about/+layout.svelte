<script lang="ts">

</script>

<section>
    <aside>
        <nav class="flex flex-col pl-2">
            <ul class="flex flex-col gap-4 items-start">
                <li><a href="/about/team">The Team</a></li>
                <li><a href="/about/story">The Story</a></li>
                <li><a href="/about/mission">Our Mission</a></li>
            </ul>
        </nav>
    </aside>
    <div class="main flex flex-col items-center"><slot /></div>

</section>


<style>

    section {
        @apply flex gap-8;
    }
    a {
     @apply underline underline-offset-2;
  }

    .main {
        @apply flex-1; 
    }
</style>