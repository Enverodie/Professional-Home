<script>
	import AboutMe from './aboutMe.svelte';
	import AboutTheSite from './aboutTheSite.svelte';

    // algorithm provided by Илья Зеленько on stackoverflow:
    // https://stackoverflow.com/a/24181701/15818885
    let birthday = new Date("December 16, 2000");
    let ageDifMs = Date.now() - birthday;
    let ageDate = new Date(ageDifMs); // miliseconds from epoch
    let myAge = Math.abs(ageDate.getUTCFullYear() - 1970);

</script>

<div class="about">
    <AboutMe class="aboutSection">
        I am a {myAge} year old full stack Web Developer based in Bloomington, Indiana. I love experimenting with design, and am particularly fond of working front-end.
        Javascript is my tool of choice.<br>
        I also have experience with SQL (MariaDB, PostgreSQL), PHP, Python, Java, and C.<br>
        <br>
        I am extremely passionate about coding and enjoy teaching others how to do the same.<br>
        Long <s>will</s> live the Bogo sort.
    </AboutMe>
    <AboutTheSite class="aboutSection">hello</AboutTheSite>
</div>

<style lang="scss">

    .about :global(.aboutSection) {
        text-align: justify;
        text-align-last: center;
    }
    .about :global(.aboutSection h2) {
        // text-align: center;
    }
    .about :global(.aboutSection hr) {        
        height: 2px;
        background-color: var(--color7);
        border-radius: 10px;
        text-decoration: none;
        border-color: transparent;
        box-shadow: 
            1px 0px 0px var(--color2),
            2px .2px .2px .2px var(--color2);
    }
    
</style>