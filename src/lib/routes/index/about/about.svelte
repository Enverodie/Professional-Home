<script>

    /* The About component establishes the structure of the website's Index page about section.
     * It is intended to be included as a direct child of an ArticleBox component 
     * (though it doesn't have to be).
     */

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

<!-- I'm using the gridItem class as a way of adding empty columns to the grid layout; it serves no other purpose -->
<div class="about">
    <div class="grid">
        <div class="gridItem"></div>
        <div class="gridItem aboutText">
            <AboutMe class="aboutSection">
                <span>Hi, I'm Stephen M. Smith. <span class="emoji" style="font-size: 1.5em;">😄</span></span><br>
                <br>
                I am a {myAge} year old full stack Web Developer, particularly fond of working front-end. I use JavaScript, SQL (MariaDB, PostgreSQL), PHP, Python, Java, and C.<br>
                <br>
                I am extremely passionate about coding, and enjoy teaching others how to do the same.<br>
                Long <s>will</s> live the Bogo sort.
            </AboutMe>
            <AboutTheSite class="aboutSection">
                <span>Enverodie</span> is my username. I thought of the name one day, looked it up on google, found no results, and went with it.<br>
                <br>
                This site showcases who I am, including all my projects, thoughts, and entertaining things to engage with.<br>
                <br>
                Please, enjoy your stay!
            </AboutTheSite>
            <AboutLinks />
        </div>
        <div class="gridItem"></div>
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

            &.aboutText {
                display: block;
            }
        }

    }

    /* Contains all the sections of about that are dominantly text-based. */
    .aboutText {
        
        :global(.aboutSection) {
            text-align: justify;
            text-align-last: center;
            vertical-align: text-top;
        }

        :global(.aboutSection h2) {
            // text-align: center;
        }

        :global(.aboutSection hr) {        
            height: 2px;
            background-color: var(--color7);
            border-radius: 10px;
            text-decoration: none;
            border-color: transparent;
            box-shadow: var(--hoverShadow);
        }

        :global(.aboutSection p) {        
            padding: 0 2em;
            margin-bottom: 2em;
        }
    }

@media only screen and (min-width: 1000px) {
    .grid {
        grid-template-columns: .25fr 3fr .5fr 3fr;

        &>* {
            display: flex;
            justify-content: center;
            align-items: center;

            &:last-child {
                padding: 1em;
            }

            img {
                max-width: 100%;
            }
        }
    }
}
    
</style>