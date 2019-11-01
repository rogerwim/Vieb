/*
* Vieb - Vim Inspired Electron Browser
* Copyright (C) 2019 Jelmer van Arnhem
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
/* global ACTIONS COMMAND CURSOR FOLLOW HISTORY MODES SETTINGS SUGGEST UTIL */
"use strict"

const bindings = {
    "normal": {
        "Enter": "ACTIONS.clickOnSearch",
        "F1": ":help",
        "C-KeyA": "ACTIONS.increasePageNumber",
        "KeyB": "ACTIONS.previousTab",
        "KeyC": "CURSOR.start",
        "KeyD": "ACTIONS.closeTab",
        "KeyE": "ACTIONS.toNavMode",
        "KeyF": "ACTIONS.startFollowCurrentTab",
        "KeyG": {
            "KeyG": "ACTIONS.scrollTop",
            "KeyI": "ACTIONS.insertAtFirstInput"
        },
        "KeyH": "ACTIONS.scrollLeft",
        "KeyI": "ACTIONS.toInsertMode",
        "KeyJ": "ACTIONS.scrollDown",
        "KeyK": "ACTIONS.scrollUp",
        "KeyL": "ACTIONS.scrollRight",
        "KeyN": "ACTIONS.nextSearchMatch",
        "KeyR": "ACTIONS.reload",
        "KeyS": "CURSOR.start",
        "KeyT": "ACTIONS.openNewTab",
        "KeyU": "ACTIONS.reopenTab",
        "KeyV": "CURSOR.start",
        "KeyW": "ACTIONS.nextTab",
        "C-KeyX": "ACTIONS.decreasePageNumber",
        "Slash": "ACTIONS.toSearchMode",
        "S-KeyF": "ACTIONS.startFollowNewTab",
        "S-KeyG": "ACTIONS.scrollBottom",
        "S-KeyH": "ACTIONS.backInHistory",
        "S-KeyJ": "ACTIONS.nextTab",
        "S-KeyK": "ACTIONS.previousTab",
        "S-KeyL": "ACTIONS.forwardInHistory",
        "S-KeyN": "ACTIONS.previousSearchMatch",
        "S-KeyR": "ACTIONS.reloadWithoutCache",
        "S-KeyT": "ACTIONS.openNewTabWithCurrentUrl",
        "S-Digit4": "ACTIONS.scrollPageRight",
        "S-Digit6": "ACTIONS.scrollPageLeft",
        "S-Semicolon": "ACTIONS.toCommandMode",
        "C-KeyB": "ACTIONS.scrollPageUp",
        "C-KeyC": "ACTIONS.stopLoadingPage",
        "C-KeyD": "ACTIONS.scrollPageDownHalf",
        "C-KeyF": "ACTIONS.scrollPageDown",
        "C-KeyI": "ACTIONS.forwardInHistory",
        "C-KeyJ": "ACTIONS.moveTabForward",
        "C-KeyK": "ACTIONS.moveTabBackward",
        "C-KeyO": "ACTIONS.backInHistory",
        "C-KeyT": "ACTIONS.openNewTabAtAlternativePosition",
        "C-KeyU": "ACTIONS.scrollPageUpHalf",
        "C-Digit0": "ACTIONS.zoomReset",
        "C-Minus": "ACTIONS.zoomOut",
        "C-Equal": "ACTIONS.zoomIn",
        "CS-Digit0": "ACTIONS.zoomReset",
        "CS-Equal": "ACTIONS.zoomIn",
        "CS-Minus": "ACTIONS.zoomOut"
    },
    "insert": {
        "F1": ":help",
        "Escape": "ACTIONS.toNormalMode",
        "C-BracketLeft": "ACTIONS.toNormalMode"
    },
    "command": {
        "F1": ":help",
        "Escape": "ACTIONS.toNormalMode",
        "Tab": "ACTIONS.nextSuggestion",
        "S-Tab": "ACTIONS.prevSuggestion",
        "C-BracketLeft": "ACTIONS.toNormalMode",
        "C-KeyN": "ACTIONS.commandHistoryNext",
        "C-KeyP": "ACTIONS.commandHistoryPrevious",
        "Enter": "ACTIONS.useEnteredData"
    },
    "search": {
        "F1": ":help",
        "Escape": "ACTIONS.toNormalMode",
        "C-BracketLeft": "ACTIONS.toNormalMode",
        "Enter": "ACTIONS.useEnteredData"
    },
    "nav": {
        "F1": ":help",
        "Escape": "ACTIONS.toNormalMode",
        "Tab": "ACTIONS.nextSuggestion",
        "S-Tab": "ACTIONS.prevSuggestion",
        "C-BracketLeft": "ACTIONS.toNormalMode",
        "Enter": "ACTIONS.useEnteredData"
    },
    "follow": {
        "F1": ":help",
        "Escape": "ACTIONS.stopFollowMode",
        "C-BracketLeft": "ACTIONS.stopFollowMode"
    },
    "cursor": {
        "F1": ":help",
        "Enter": "CURSOR.leftClick",
        "BracketLeft": "CURSOR.scrollUp",
        "BracketRight": "CURSOR.scrollDown",
        "KeyB": "CURSOR.moveFastLeft",
        "KeyD": "CURSOR.downloadImage",
        "KeyE": "CURSOR.inspectElement",
        "KeyF": "ACTIONS.startFollowCurrentTab",
        "KeyG": {
            "KeyG": "CURSOR.startOfPage"
        },
        "KeyH": "CURSOR.moveLeft",
        "KeyI": "CURSOR.insertAtPosition",
        "KeyJ": "CURSOR.moveDown",
        "KeyK": "CURSOR.moveUp",
        "KeyL": "CURSOR.moveRight",
        "KeyR": "CURSOR.rightClick",
        "KeyV": "CURSOR.startVisualSelect",
        "KeyW": "CURSOR.moveFastRight",
        "KeyY": "CURSOR.copyAndStop",
        "Escape": "ACTIONS.toNormalMode",
        "S-Comma": "CURSOR.scrollLeft",
        "S-Period": "CURSOR.scrollRight",
        "S-KeyG": "CURSOR.endOfPage",
        "S-KeyH": "CURSOR.startOfView",
        "S-KeyJ": "CURSOR.scrollDown",
        "S-KeyK": "CURSOR.scrollUp",
        "S-KeyL": "CURSOR.endOfView",
        "S-KeyM": "CURSOR.centerOfView",
        "S-Digit4": "CURSOR.moveRightMax",
        "S-Digit6": "CURSOR.moveLeftMax",
        "C-KeyD": "CURSOR.moveFastDown",
        "C-KeyH": "CURSOR.moveSlowLeft",
        "C-KeyJ": "CURSOR.moveSlowDown",
        "C-KeyK": "CURSOR.moveSlowUp",
        "C-KeyL": "CURSOR.moveSlowRight",
        "C-KeyU": "CURSOR.moveFastUp",
        "C-BracketLeft": "ACTIONS.toNormalMode"
    },
    "visual": {
        "F1": ":help",
        "BracketLeft": "CURSOR.scrollUp",
        "BracketRight": "CURSOR.scrollDown",
        "KeyB": "CURSOR.moveFastLeft",
        "KeyC": "CURSOR.copyAndStop",
        "KeyF": "ACTIONS.startFollowCurrentTab",
        "KeyG": {
            "KeyG": "CURSOR.startOfPage"
        },
        "KeyH": "CURSOR.moveLeft",
        "KeyJ": "CURSOR.moveDown",
        "KeyK": "CURSOR.moveUp",
        "KeyL": "CURSOR.moveRight",
        "KeyW": "CURSOR.moveFastRight",
        "KeyY": "CURSOR.copyAndStop",
        "Escape": "ACTIONS.toNormalMode",
        "S-Comma": "CURSOR.scrollLeft",
        "S-Period": "CURSOR.scrollRight",
        "S-KeyG": "CURSOR.endOfPage",
        "S-KeyH": "CURSOR.startOfView",
        "S-KeyJ": "CURSOR.scrollDown",
        "S-KeyK": "CURSOR.scrollUp",
        "S-KeyL": "CURSOR.endOfView",
        "S-KeyM": "CURSOR.centerOfView",
        "S-Digit4": "CURSOR.moveRightMax",
        "S-Digit6": "CURSOR.moveLeftMax",
        "C-KeyD": "CURSOR.moveFastDown",
        "C-KeyH": "CURSOR.moveSlowLeft",
        "C-KeyJ": "CURSOR.moveSlowDown",
        "C-KeyK": "CURSOR.moveSlowUp",
        "C-KeyL": "CURSOR.moveSlowRight",
        "C-KeyU": "CURSOR.moveFastUp",
        "C-BracketLeft": "ACTIONS.toNormalMode"
    }
}
let repeatCounter = 0
let currentSubKey = null
let supportedActions = []

const init = () => {
    window.addEventListener("keydown", handleKeyboard)
    window.addEventListener("keypress", handleUserInput)
    window.addEventListener("keyup", handleUserInput)
    window.addEventListener("click", e => {
        e.preventDefault()
        ACTIONS.setFocusCorrectly()
    })
    window.addEventListener("contextmenu", e => {
        e.preventDefault()
        ACTIONS.setFocusCorrectly()
    })
    window.addEventListener("resize", () => {
        if (MODES.currentMode() === "follow") {
            FOLLOW.startFollow()
        }
        if (MODES.currentMode() === "cursor") {
            CURSOR.updateCursorElement()
        }
    })
    document.getElementById("url").addEventListener("input", () => {
        if (MODES.currentMode() === "nav") {
            HISTORY.suggestHist(document.getElementById("url").value)
        } else if (MODES.currentMode() === "command") {
            SUGGEST.suggestCommand(document.getElementById("url").value)
        }
    })
    setInterval(() => {
        ACTIONS.setFocusCorrectly()
        document.getElementById("cursor").style.backgroundColor = "#ff07"
        setTimeout(() => {
            ACTIONS.setFocusCorrectly()
            document.getElementById("cursor").style.backgroundColor = "#f0f7"
        }, 500)
        setTimeout(() => {
            ACTIONS.setFocusCorrectly()
            document.getElementById("cursor").style.backgroundColor = "#0ff7"
        }, 1000)
    }, 1500)
    ACTIONS.setFocusCorrectly()
    const unSupportedActions = [
        "ACTIONS.setFocusCorrectly",
        "CURSOR.move",
        "CURSOR.handleScrollDiffEvent",
        "CURSOR.updateCursorElement",
        "CURSOR.releaseKeys"
    ]
    supportedActions = [
        ...Object.keys(ACTIONS).map(a => `ACTIONS.${a}`),
        ...Object.keys(CURSOR).map(c => `CURSOR.${c}`)
    ].filter(m => !unSupportedActions.includes(m))
}

const toIdentifier = e => {
    if (e.ctrlKey || e.shiftKey || e.metaKey || e.altKey) {
        let identifier = ""
        if (e.ctrlKey) {
            identifier += "C"
        }
        if (e.shiftKey) {
            identifier += "S"
        }
        if (e.metaKey) {
            identifier += "M"
        }
        if (e.altKey) {
            identifier += "A"
        }
        return `${identifier}-${e.code}`
    }
    return e.code
}

const eventToAction = e => {
    return idToAction(toIdentifier(e))
}

const idToAction = id => {
    if (document.body.className === "fullscreen") {
        MODES.setMode("insert")
        return
    }
    const allBindings = UTIL.merge(
        JSON.parse(JSON.stringify(bindings)),
        SETTINGS.get("keybindings"))
    return allBindings[MODES.currentMode()][id]
}

const countableActions = [
    "ACTIONS.increasePageNumber",
    "ACTIONS.decreasePageNumber"
]

const handleKeyboard = e => {
    if (document.body.className === "fullscreen") {
        MODES.setMode("insert")
        return
    }
    const ignoredKeys = [
        "ControlLeft",
        "ControlRight",
        "ShiftLeft",
        "ShiftRight",
        "AltLeft",
        "AltRight",
        "MetaLeft",
        "MetaRight",
        "NumLock",
        "CapsLock",
        "ScrollLock"
    ]
    if (ignoredKeys.includes(e.code)) {
        // Keys such as control should not be registered on their own,
        // This will prevent the cancellation of bindings like 'g g',
        // After pressing just a single g and then control.
        e.preventDefault()
        return
    }
    const id = toIdentifier(e)
    let action = eventToAction(e)
    if (currentSubKey) {
        const actionSet = idToAction(currentSubKey)
        if (actionSet) {
            action = actionSet[toIdentifier(e)]
        }
        currentSubKey = null
        document.getElementById("mode").style.textDecoration = ""
        document.getElementById("mode").style.fontStyle = ""
    } else if (typeof action === "object") {
        currentSubKey = id
        document.getElementById("mode").style.textDecoration = "underline"
        document.getElementById("mode").style.fontStyle = "italic"
        e.preventDefault()
        return
    }
    if (SETTINGS.get("digitsRepeatActions")) {
        if (id === "Escape" || id === "C-BracketLeft") {
            if (repeatCounter !== 0) {
                repeatCounter = 0
                return
            }
        }
    }
    const actionFunction = actionToFunction(action)
    if (actionFunction) {
        if (countableActions.includes(action)) {
            actionFunction(repeatCounter || 1)
            e.preventDefault()
            repeatCounter = 0
            return
        }
        actionFunction()
        if (["normal", "cursor", "visual"].includes(MODES.currentMode())) {
            while (repeatCounter > 1) {
                actionFunction()
                repeatCounter -= 1
            }
            repeatCounter = 0
        }
        e.preventDefault()
        return
    }
    if (id.startsWith("Digit") && SETTINGS.get("digitsRepeatActions")) {
        if (["normal", "cursor", "visual"].includes(MODES.currentMode())) {
            const keyNumber = Number(id.replace("Digit", ""))
            if (!isNaN(keyNumber)) {
                repeatCounter = Number(String(repeatCounter) + keyNumber)
                if (repeatCounter > 100) {
                    repeatCounter = 100
                }
                e.preventDefault()
                return
            }
        } else {
            repeatCounter = 0
        }
    }
    handleUserInput(e)
}

const actionToFunction = action => {
    if (action && action.startsWith && action.startsWith(":")) {
        return () => COMMAND.execute(action)
    }
    if (supportedActions.includes(action)) {
        const categories = {"ACTIONS": ACTIONS, "CURSOR": CURSOR}
        const [categoryName, func] = action.split(".")
        return categories[categoryName][func]
    }
    return null
}

const handleUserInput = e => {
    const id = toIdentifier(e)
    if (MODES.currentMode() === "follow") {
        if (e.type === "keydown") {
            FOLLOW.enterKey(id)
        }
        e.preventDefault()
        return
    }
    const allowedUserInput = [
        "C-KeyX",
        "C-KeyC",
        "C-KeyV",
        "C-KeyA",
        "C-Backspace",
        "C-ArrowLeft",
        "C-ArrowRight",
        "CS-ArrowLeft",
        "CS-ArrowRight"
    ]
    const shift = id.startsWith("S-")
    const allowedInput = allowedUserInput.includes(id)
    const hasModifier = id.includes("-")
    if (!shift && !allowedInput && hasModifier || e.code === "Tab") {
        e.preventDefault()
    }
    ACTIONS.setFocusCorrectly()
}

const listSupportedActions = () => {
    return supportedActions
}

module.exports = {
    init,
    eventToAction,
    actionToFunction,
    bindings,
    listSupportedActions
}
