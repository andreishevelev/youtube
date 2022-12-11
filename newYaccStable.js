// How to use:
//   1. Open "Script Editor" (requires OS X 10.10 Yosemite)
//   2. Change the language from "AppleScript" to "JavaScript"
//   3. Paste the code below and replace the safari example.
//
// More info:
// https://developer.apple.com/library/mac/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/index.html

var sys_events = Application("System Events");

// More keycodes can be added. Keycode reference:
// http://www.codemacs.com/coding/applescript/applescript-key-codes-reference.8288271.htm
var key_codes = {
	"→": 124,
	"←": 123,
	"↑": 126,
	"↓": 125,
	"⏎": 36,  // Return
	"⇥": 48,  // Tab
	"⌫": 51,  // Delete
	"⎋": 53,  // Escape
};
var modifiers = {
	"⌘": "command down",
	"^": "control down",
	"⌥": "option down",
	"⇧": "shift down"
};

function press(hotkey) {
	var using = [];

	while (hotkey.length > 1) {
		if (modifiers[hotkey[0]] == undefined) {
			throw new Error(hotkey[0] + " is not a recognized modifier key");
		}

		using.push(modifiers[hotkey[0]]);
		hotkey = hotkey.slice(1);
	}

	if (key_codes[hotkey] != undefined) {
		sys_events.keyCode(key_codes[hotkey], { using: using });
	}
	else {
		sys_events.keystroke(hotkey.toLowerCase(), { using: using });
	}
}

function getRandomIntInclusive() {
	// let min = 3;
	// let max = 9;
	// min = Math.ceil(min);
	// max = Math.floor(max);
	// return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
	return Math.random();
}

function type(text) {
	for (var i = 0; i < text.length; i++) {
		sys_events.keystroke(text[i]);
		delay(getRandomIntInclusive());
	}
}

function typeFast(text) {
	for (var i = 0; i < text.length; i++) {
		sys_events.keystroke(text[i]);
		delay(0.02);
	}
}
function menu_item() {
	if (!arguments.length) return;

	var process = sys_events.processes.whose({ "frontmost": true })[0];
	var menu_bar = process.menuBars[0].menuBarItems[arguments[0]];

	var menu_item = menu_bar;
	for (var i = 1; i < arguments.length; i++) {
		menu_item = menu_item.menus[0].menuItems[arguments[i]];
	}
	menu_item.click();
}

////////////////////////////////////////////////////////////
//  Example use: Safari
////////////////////////////////////////////////////////////

// var Chrome = Application("Safari");

// Give Safari the focus
// Chrome.activate();

// Give it a second, it's practically magic (literally waits 1 second)
delay(5);
// press("⌘T")
// typeFast("https://accounts.google.com/signup/v2/webcreateaccount?biz=false&cc=US&continue=https%3A%2F%2Fwww.google.com%2F%3Fpli%3D1&dsh=S1024292338%3A1670629153989993&flowEntry=SignUp&flowName=GlifWebSignIn&hl=en&authuser=0");
// press("⏎");
// delay(3);

type("Ilia");
press("⌘⇥")
delay(2);
press("⌘⇥")
delay(1);
press("⌘N")
delay(2.1);
press("⌘W")
delay(1.3);
press("⇥");
type("Muharov");
delay(5);
press("⇥");
delay(0.5);
press("⇥");
delay(0.5);
press("⏎");
delay(5);
press("⇥");
delay(0.5);
press("⇥");
delay(0.5);
type("Perfection1");
delay(0.5);
press("⇥");
type("Perfection1");
delay(0.5);
press("⏎");
delay(5);

press("⇥")
delay(0.5);
press("⇥")
delay(0.5);
press("⇥")
delay(0.5);
press("⇥")
delay(0.5);
press("⇥")
delay(0.5);
press("↓");
delay(0.5);
press("⏎");
delay(0.5);
press("⇥")
delay(0.5);
type("3");
delay(0.5);
press("⇥")
delay(0.5);
type("1999");
delay(0.5);
press("⇥")
delay(0.5);
press("↓");
delay(0.5);
press("↓");
delay(0.5);
press("↓");
delay(0.5);
press("⏎");
delay(0.5);

press("⇥")
delay(0.5);
press("⇥")
delay(0.5);
press("⏎");
delay(0.5);

// New window:
// press("⌘N")

// Another new Window
// menu_item("File", "New Window")

// select address bar
// press("⌘L")

// enter a url
// type("http://www.google.com")

// press enter and wait for the page to load before doing more stuff
// press("⏎")
// delay(1.5)

// open your favorite blog in a new tab
// press("⌘T")
// delay(1.0) // wait for new tab animation so we can start typing
// type("http://jiaaro.com")
press("⇥")