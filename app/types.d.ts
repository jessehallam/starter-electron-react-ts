/*
    Application State Types (Redux)
*/

interface AppState {
    counter: number
}

/*
 * Interface Extensions:
 */

interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: () => any
}