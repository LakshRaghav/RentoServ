
export default function Authentication(state, action) {
    switch (action.type) {
        case "login":
            return { ...state, auth: 1 , type: action.type}
        case "google-login":
            return { ...state, auth: 1 , type: action.type}
        case "logout":
            return { ...state, auth: 0}
    }
}
