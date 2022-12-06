<div class="linksContainer">
    <!-- 
        Notice on usage of LinkedIn's logo + img source:
        https://brand.linkedin.com/downloads
     -->
     <div>

         <a id="aboutLinks-LinkedIn" href="https://www.linkedin.com/in/enverodie/" target="_blank">
            <label for="aboutLinks-LinkedIn">LinkedIn</label>
            <img src="./static/svgs/LinkedIn-Logos/LI-In-Bug.png" alt="Linkedin" />
        </a>
    </div>
    <!-- 
        Notice on usage of GitHub's logo + img source:
        https://github.com/logos
     -->
     <div>
         <a id="aboutLinks-GitHub" href="https://github.com/Enverodie" target="_blank">
            <label for="aboutLinks-GitHub">GitHub</label>
            <img src="./static/svgs/github-mark/github-mark-white.svg" alt="Github" />
        </a>
    </div>
    <div>
        <a id="aboutLinks-Resume" href="#" target="_blank">
            <label for="aboutLinks-Resume">Resume</label>
            <i class="fa-solid fa-file-lines" style="font-size: 60px"></i>
        </a>
    </div>
</div>

<style lang="scss">

.linksContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin: 1.5em 0 0;
    
    &>div {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;

        &>a {
            color: var(--color2);
            display: flex;
            position: relative;
            flex-direction: column;
            justify-content: center;
            text-align: center;
            gap: .4em;
            padding: 1em;
            width: fit-content;
            transition: transform .2s ease;
            
            &:hover, &:focus {
                transform: scale(1.35);
                text-decoration: none;
                outline: none;
                
                &>label {
                    font-size: 0px;
                }
                
                &>img, &>i{
                    filter: drop-shadow(0px 0px .3em var(--color6));
                }
            }
            
            &>label {
                color: var(--color6);
                text-decoration: none;
                transition: font-size .2s ease;
            }

            &>img, &>i{
                height: 60px;
                z-index: 1;
            }
        }
    }
}

</style>