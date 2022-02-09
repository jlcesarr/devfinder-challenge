const apiBase = "https://api.github.com"
const apiUsersEndpoint = "users"


const $themeSwitcherButton = document.querySelector(".theme-switcher")
$themeSwitcherButton.onclick = () => {
    document.body.classList.toggle('bg-light')
}


const $submitButton = document.querySelector(".submit-btn")
const $usernameInput = document.getElementById("username-input")
const $heroContainer = document.querySelector(".hero")
const $heroBackDrop = $heroContainer.querySelector(".hero-backdrop")
const $heroBackDropMessage = $heroBackDrop.querySelector('.hero-backdrop-message');
const $heroContent = $heroContainer.querySelector('.hero-content')


// ========= WIREFRAME HERO COMPONENTS =============
const $userAvatarEl = $heroContainer.querySelector(".user-avatar-image")
const $userNameEl = $heroContainer.querySelector(".user-name")
const $userJoinedAtEl = $heroContainer.querySelector(".user-joined-at")
const $userSurnameEl = $heroContainer.querySelector(".user-username")
const $userBioEl = $heroContainer.querySelector(".user-bio")
const $userFollowingEl = $heroContainer.querySelector(".user-following")
const $userFollowersEl = $heroContainer.querySelector(".user-followers")
const $userReposEl = $heroContainer.querySelector(".user-repos")
const $userLocationEl = $heroContainer.querySelector(".user-location")
const $userSocialNetworkEl = $heroContainer.querySelector(".user-social-network")
const $userGithubProfileEl = $heroContainer.querySelector(".user-github-link a")
const $userCompanyEl = $heroContainer.querySelector(".user-company")

const setElementValue = (attr, el, value, altValue) => {

    if (!value) {
        el[attr] = altValue;
        el.classList.add('half-opacity')
        return;
    }


    el.classList.remove('half-opacity')
    el[attr] = value

    if (el.tagName.toLowerCase() == "a") {
        el.href = value
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


$submitButton.addEventListener('click', (e) => {
    (async() => {
        if (!$usernameInput.value || $usernameInput.value == currentUser) return;


        $heroContent.classList.remove('is-active')

        await new Promise((resolve, reject) => {
            setTimeout(() => resolve(), 700)
        })


        const apiResponse = await (await fetch(`${apiBase}/${apiUsersEndpoint}/${$usernameInput.value}`)).json()
        if (!apiResponse.id) {
            $heroBackDropMessage.innerHTML = `Oops, user was not found!`
            $heroBackDrop.classList.add('is-active')
            return;
        }

        $heroBackDrop.classList.remove('is-active')


        setUserInfo(apiResponse)

        $heroContent.classList.add('is-active')

        currentUser = $usernameInput.value;
    })()
})