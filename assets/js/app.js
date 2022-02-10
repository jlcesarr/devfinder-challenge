const apiBase = "https://api.github.com"
const apiUsersEndpoint = "users"


const $searchButton = document.querySelector(".submit-btn")
const $usernameInput = document.getElementById("username-input")


const $heroContainer = document.querySelector(".hero")
    // ========= HERO BACKDROP =============
const $heroBackDrop = $heroContainer.querySelector(".hero-backdrop")
const $heroBackDropMessage = $heroBackDrop.querySelector('.hero-backdrop-message');


const $heroContent = $heroContainer.querySelector('.hero-content')
    // ========= HERO CONTENT ELEMENTS =============
const $userAvatarEl = $heroContainer.querySelector(".user-avatar-image")
const $userNameEl = $heroContainer.querySelector(".user-name")
const $userJoinedAtEl = $heroContainer.querySelector(".user-joined-at")
const $userSurnameEl = $heroContainer.querySelector(".user-username")
const $userBioEl = $heroContainer.querySelector(".user-bio")
const $userFollowingEl = $heroContainer.querySelector(".user-following")
const $userFollowersEl = $heroContainer.querySelector(".user-followers")
const $userReposEl = $heroContainer.querySelector(".user-repos")
const $userLocationEl = $heroContainer.querySelector(".user-location .js-word")
const $userSocialNetworkEl = $heroContainer.querySelector(".user-social-network .js-word")
const $userGithubProfileEl = $heroContainer.querySelector(".user-github-link .js-word")
const $userCompanyEl = $heroContainer.querySelector(".user-company .js-word")

const setElementValue = (attr, el, value, altValue) => {
    try {

        if (!value) {
            el[attr] = altValue;
            if (!el.classList.contains('js-word')) {
                el.classList.add('half-opacity')
            }
            el.parentElement.classList.add('half-opacity')
            return;
        }

        el.classList.remove('half-opacity')
        el.parentElement.classList.remove('half-opacity')
        el[attr] = value

        if (el.tagName.toLowerCase() == "a") {
            el.href = value
        }
    } catch (e) {
        console.error(e)
    }
}

const setUserInfo = (user) => {
    const {
        login: username,
        name,
        followers,
        following,
        public_repos,
        bio,
        location,
        company,
        html_url: profileLink,
        twitter_username,
        created_at: joinedAt,
        avatar_url: avatarUrl
    } = user


    const formattedJoinedDate = new Date(joinedAt).toDateString()

    // SET VALUES
    setElementValue("src", $userAvatarEl, avatarUrl, "");
    setElementValue("innerHTML", $userNameEl, name, "Unknown");
    setElementValue("innerHTML", $userSurnameEl, `@${username}`, "");
    setElementValue("innerHTML", $userJoinedAtEl, `Joined ${formattedJoinedDate}`, "Unknown");
    setElementValue("innerHTML", $userBioEl, bio, "This profile has no bio");
    setElementValue("innerHTML", $userFollowingEl, following, 0);
    setElementValue("innerHTML", $userFollowersEl, followers, 0);
    setElementValue("innerHTML", $userReposEl, public_repos, 0);

    setElementValue("innerHTML", $userLocationEl, location, "Unknown");
    setElementValue("innerHTML", $userSocialNetworkEl, twitter_username, "Not Available");
    setElementValue("innerHTML", $userGithubProfileEl, profileLink, "Unknown");
    setElementValue("innerHTML", $userCompanyEl, company, "No Company");
}


let currentUser = undefined;
$searchButton.addEventListener('click', (e) => {
    (async() => {
        const usernameInputValue = $usernameInput.value

        if (!usernameInputValue || usernameInputValue == currentUser) return;


        // hide current hero content
        $heroContent.classList.remove('is-active')


        // waits clip-path transition duration
        await new Promise((resolve, reject) => { setTimeout(() => resolve(), 600) })

        const apiResponse = await (await fetch(`${apiBase}/${apiUsersEndpoint}/${usernameInputValue}`)).json()
        if (!apiResponse.id) {
            $heroBackDropMessage.innerHTML = `Oops, user was not found!`
            $heroBackDrop.classList.add('is-active')
            return;
        }

        // hide container backdrop 
        $heroBackDrop.classList.remove('is-active')


        // set elements values
        setUserInfo(apiResponse)

        // show hero content
        $heroContent.classList.add('is-active')

        currentUser = $usernameInput.value;
    })()
})



// THEME SWITCHER
let isLightTheme = false;
const $themeSwitcherButton = document.querySelector(".theme-switcher")
const $themeSwitcherBox = document.querySelector(".theme-box")

$themeSwitcherButton.onclick = () => {
    isLightTheme = !isLightTheme
    changeTheme(isLightTheme ? "light" : "dark")
}


const changeTheme = (theme) => {
    let bgColor,
        textColor,
        bgContent,
        textAltColor;

    switch (theme) {
        case "light":
            bgColor = "#F6F8FF";
            textColor = "#95a6c0";
            bgContent = "#FEFEFE";
            textAltColor = "#2B3442";
            fillColorSVG = "#4b6a9b"


            $themeSwitcherButton.innerHTML = "Dark"
            $themeSwitcherBox.classList.remove('light-icon')
            $themeSwitcherBox.classList.add('dark-icon')
            break;
        case "dark":
            bgColor = "#141D2F";
            textColor = "#FFFFFF";
            bgContent = "#1E2A47";
            textAltColor = "#FFFFFF";
            fillColorSVG = "#FFFFFF"


            $themeSwitcherButton.innerHTML = "Light"
            $themeSwitcherBox.classList.remove('dark-icon')
            $themeSwitcherBox.classList.add('light-icon')
            break;
    }

    document.querySelector('body').style.setProperty('--bg', bgColor);
    document.querySelector('body').style.setProperty('--bg-content', bgContent);
    document.querySelector('body').style.setProperty('--text', textColor);
    document.querySelector('body').style.setProperty('--text-alt', textAltColor);
    document.querySelector('body').style.setProperty('--fill-svg', fillColorSVG);
}