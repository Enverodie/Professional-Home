<script>
	import AboutMe from './aboutMe.svelte';
	import AboutTheSite from './aboutTheSite.svelte';
	import AboutLinks from './aboutLinks.svelte';

    // algorithm provided by Илья Зеленько on stackoverflow:
    // https://stackoverflow.com/a/24181701/15818885
    let birthday = new Date("December 16, 2000");
    let ageDifMs = Date.now() - birthday;
    let ageDate = new Date(ageDifMs); // miliseconds from epoch
    let myAge = Math.abs(ageDate.getUTCFullYear() - 1970);

</script>

<div class="about">
    <div class="grid">
        <div class="gridItem aboutText">
            <AboutMe class="aboutSection">
                <span>Hi, I'm Stephen M. Smith. <span class="emoji" style="font-size: 1.5em;">😄</span></span><br>
                <br>
                I am a {myAge} year old full stack Web Developer based in Bloomington, Indiana. I love experimenting with design, and am particularly fond of working front-end.
                Javascript is my tool of choice.<br>
                I also have experience with SQL (MariaDB, PostgreSQL), PHP, Python, Java, and C.<br>
                <br>
                I am extremely passionate about coding and enjoy teaching others how to do the same.<br>
                Long <s>will</s> live the Bogo sort.
            </AboutMe>
            <AboutTheSite class="aboutSection">
                <span>Enverodie</span> is my personal / professional "username"; a way of personally identifying myself. I thought of the name one day, looked it up on google, found no results, and went with it.<br>
                <br>
                This site is a site showcasing who I am, including all my projects, thoughts, and entertaining things to engage with.<br>
                Please, enjoy your stay!
            </AboutTheSite>
            <AboutLinks />
        </div>
        <div class="gridItem">
            <img src="/static/images/about.png" alt="Enverodie mascot waving image" />
        </div>
    </div>
</div>

<style lang="scss">

    .grid {
        display: grid;
        grid-template-columns: 1fr;

        &>* {
            display: none;

            &:first-child {
                display: block;
            }
        }

    }

    .aboutText :global(.aboutSection) {
        text-align: justify;
        text-align-last: center;
        vertical-align: text-top;
    }
    .aboutText :global(.aboutSection h2) {
        // text-align: center;
    }
    .aboutText :global(.aboutSection hr) {        
        height: 2px;
        background-color: var(--color7);
        border-radius: 10px;
        text-decoration: none;
        border-color: transparent;
        box-shadow: var(--hoverShadow);
    }

@media only screen and (min-width: 1000px) {
    .grid {
        grid-template-columns: 4fr 3fr;

        &>* {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 1em;

            img {
                max-width: 100%;
            }
        }
    }
}
    
</style>