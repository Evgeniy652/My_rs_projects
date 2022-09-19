window.onload = () => {
    class Lang {
        #value;

        constructor() {
            const langLs = localStorage.getItem('lang');
            this.value = langLs || 'en';
        }

        set value(lang) {
            if (lang === 'en') {
                this.#value = ['en', 'enShift'];
                localStorage.setItem('lang', 'en');
            } else {
                this.#value = ['ru', 'ruShift'];
                localStorage.setItem('lang', 'ru');
            }
        }

        get basic() {
            return this.#value[0];
        }

        get shiftLang() {
            return this.#value[1];
        }
    }
  
    const lang = new Lang();
    const getKeyText = (objKey) => objKey[lang.basic] || objKey.name || objKey.code;
    const isSuperKey = (event) => {
        return event.target.classList.contains('ShiftLeft') 
        || event.target.classList.contains('ShiftRight')
        || event.target.classList.contains('ControlLeft')
        || event.target.classList.contains('ControlRight')
        || event.target.classList.contains('AltLeft')
        || event.target.classList.contains('AltRight');
    };
	const keys = [
    {code: 'Backquote', en: '`', enShift: '~', ru: 'ё', ruShift: 'Ё'},
	{code: 'Digit1', en: '1', enShift: '!', ru: '1', ruShift: '!'},
	{code: 'Digit2', en: '2', enShift: '@', ru: '2', ruShift: '"'},
	{code: 'Digit3', en: '3', enShift: '#', ru: '3', ruShift: '№'},
	{code: 'Digit4', en: '4', enShift: '$', ru: '4', ruShift: ';'},
	{code: 'Digit5', en: '5', enShift: '%', ru: '5', ruShift: '%'},
	{code: 'Digit6', en: '6', enShift: '^', ru: '6', ruShift: ':'},
	{code: 'Digit7', en: '7', enShift: '&', ru: '7', ruShift: '?'},
	{code: 'Digit8', en: '8', enShift: '*', ru: '8', ruShift: '*'},
	{code: 'Digit9', en: '9', enShift: '(', ru: '9', ruShift: '('},
    {code: 'Digit0', en: '0', enShift: ')', ru: '0', ruShift: ')'},
	{code: 'Minus', en: '-', enShift: '_', ru: '-', ruShift: '_'},
	{code: 'Equal', en: '=', enShift: '+', ru: '=', ruShift: '+'},
	{code: 'Backspace', specKey: true},
  
	{code: 'Tab', specKey: true},  
	{code: 'KeyQ', en: 'q', enShift: 'Q', ru: 'й', ruShift: 'Й'},
	{code: 'KeyW', en: 'w', enShift: 'W', ru: 'ц', ruShift: 'Ц'},
	{code: 'KeyE', en: 'e', enShift: 'E', ru: 'у', ruShift: 'У'},
	{code: 'KeyR', en: 'r', enShift: 'R', ru: 'к', ruShift: 'К'},
	{code: 'KeyT', en: 't', enShift: 'T', ru: 'е', ruShift: 'Е'},
	{code: 'KeyY', en: 'y', enShift: 'Y', ru: 'н', ruShift: 'Н'},
	{code: 'KeyU', en: 'u', enShift: 'U', ru: 'г', ruShift: 'Г'},
	{code: 'KeyI', en: 'i', enShift: 'I', ru: 'ш', ruShift: 'Ш'},
	{code: 'KeyO', en: 'o', enShift: 'O', ru: 'щ', ruShift: 'Щ'},
	{code: 'KeyP', en: 'p', enShift: 'P', ru: 'з', ruShift: 'З'},
	{code: 'BracketLeft', en: '[', enShift: '{', ru: 'х', ruShift: 'Х'},
	{code: 'BracketRight', en: ']', enShift: '}', ru: 'ъ', ruShift: 'Ъ'},
	{code: 'Backslash', en: '\\', enShift: '|', ru: '\\', ruShift: '/'},
	{code: 'Delete', specKey: true, name: 'Del' },
  
	{code: 'CapsLock', specKey: true },  
	{code: 'KeyA', en: 'a', enShift: 'A', ru: 'ф', ruShift: 'Ф'},
	{code: 'KeyS', en: 's', enShift: 'S', ru: 'ы', ruShift: 'Ы'},
	{code: 'KeyD', en: 'd', enShift: 'D', ru: 'в', ruShift: 'В'},
	{code: 'KeyF', en: 'f', enShift: 'F', ru: 'а', ruShift: 'А'},
	{code: 'KeyG', en: 'g', enShift: 'G', ru: 'п', ruShift: 'П'},
	{code: 'KeyH', en: 'h', enShift: 'H', ru: 'р', ruShift: 'Р'},
	{code: 'KeyJ', en: 'j', enShift: 'J', ru: 'о', ruShift: 'О'},
	{code: 'KeyK', en: 'k', enShift: 'K', ru: 'л', ruShift: 'Л'},
	{code: 'KeyL', en: 'l', enShift: 'L', ru: 'д', ruShift: 'Д'},
	{code: 'Semicolon', en: ';', enShift: ':', ru: 'ж', ruShift: 'Ж'},
	{code: 'Quote', en: "'", enShift: '"', ru: 'э', ruShift: 'Э'},
	{code: 'Enter', specKey: true},
  
	{code: 'ShiftLeft', specKey: true, name: 'Shift'},
	{code: 'KeyZ', en: 'z', enShift: 'Z', ru: 'я', ruShift: 'Я'},
	{code: 'KeyX', en: 'x', enShift: 'X', ru: 'ч', ruShift: 'Ч'},
	{code: 'KeyC', en: 'c', enShift: 'C', ru: 'с', ruShift: 'С'},
	{code: 'KeyV', en: 'v', enShift: 'V', ru: 'м', ruShift: 'М'},
	{code: 'KeyB', en: 'b', enShift: 'B', ru: 'и', ruShift: 'И'},
	{code: 'KeyN', en: 'n', enShift: 'N', ru: 'т', ruShift: 'Т'},
	{code: 'KeyM', en: 'm', enShift: 'M', ru: 'ь', ruShift: 'Ь'},
	{code: 'Comma', en: ',', enShift: '<', ru: 'б', ruShift: 'Б'},
	{code: 'Period', en: '.', enShift: '>', ru: 'ю', ruShift: 'Ю'},
    {code: 'Slash', en: '/', enShift: '?', ru: '.', ruShift: ','},
    {code: 'ArrowUp', en: '↑', enShift: '↑', ru: '↑', ruShift: '↑'},
    {code: 'ShiftRight', specKey: true, name: 'Shift'},
  
    {code: 'ControlLeft', specKey: true, name: 'Ctrl'},
    {code: 'MetaLeft', specKey: true, name: 'Win'},
    {code: 'AltLeft', specKey: true, name: 'Alt'},
    {code: 'Space', specKey: true},
    {code: 'AltRight', specKey: true, name: 'Alt'},
    {code: 'ArrowLeft', en: '←', enShift: '←', ru: '←', ruShift: '←'},
    {code: 'ArrowDown', en: '↓', enShift: '↓', ru: '↓', ruShift: '↓'},
    {code: 'ArrowRight', en: '→', enShift: '→', ru: '→', ruShift: '→'},
    {code: 'ControlRight', specKey: true, name: 'Ctrl'}
	];

	class Button {
        constructor(element) {
            this.code = element.code;
            this.en = element.en;
            this.enShift = element.enShift;
            this.ru = element.ru;
            this.ruShift = element.ruShift;
        }
        
        addKey(event) {
            let localObjKey = {}
            keys.forEach((obj) => {
                if (obj.code === event.code) {
                    let btn = document.querySelector(`.${obj.code}`);
                    localObjKey = obj;

                    if (obj.code === 'CapsLock') {
                        return;
                    }

                    if (event.type === 'keydown') {
                        btn.classList.add('active');
                    } 
                    
                    if (event.type === 'keyup') {
                        const altLeft = document.querySelector('.AltLeft');
                        const altRight = document.querySelector('.AltRight');
                        const ctrlLeft = document.querySelector('.ControlLeft');
                        const ctrlRight = document.querySelector('.ControlRight');

                        if (['ControlLeft', 'ControlRight', 'AltLeft', 'AltRight'].includes(obj.code)) {
                            if (
                                (altLeft.classList.contains('active') || altRight.classList.contains('active'))
                                && (ctrlLeft.classList.contains('active') || ctrlRight.classList.contains('active'))
                            ) {
                                this.#toggleLangAndRerender();
                            }
                        }

                        btn.classList.remove('active');

                        if (['ShiftLeft', 'ShiftRight'].includes(obj.code)) {
                            this.#unPressShift();
                        }
                    }
                }
            });
            
            if (event.type === 'keydown') {
                if (!localObjKey.specKey) {
                    this.#addText(localObjKey, event);
                }

                if (localObjKey.specKey) {
                    this.#handleSpecKey(localObjKey, event);
                }
            }

            event.preventDefault();
    }
  
        mouseDown(event) {
            keys.forEach((obj) => {
                if (event.target.classList.contains(obj.code)) {
                    if (!obj.specKey) {
                        this.#addText(obj, event);
                    }

                    if (obj.specKey) {
                        this.#handleSpecKey(obj, event);
                    }
                }
            });

            if (isSuperKey(event)) {
                event.target.classList.add('active');
            }

            event.preventDefault();
        }

        mouseUp(event) {
            if (event.target.classList.contains('ShiftLeft') || event.target.classList.contains('ShiftRight')) {
                this.#unPressShift();
            }

            if (isSuperKey(event)) {
                event.target.classList.remove('active');
            }

            if (event.target.classList.contains('ControlLeft') || event.target.classList.contains('ControlRight')) {
                this.#toggleControl(event);
            }

            if (event.target.classList.contains('AltLeft') || event.target.classList.contains('AltRight')) {
                this.#toggleAlt(event);
            }

            event.preventDefault();
        }

        #rerender(register) {
            keys.forEach((k) => {
                const btn = document.querySelector(`.${k.code}`);

                switch (register) {
                    case 'shiftUpper':
                        btn.innerText =  k[lang.shiftLang] && k[lang.shiftLang].toLocaleUpperCase() || getKeyText(k);
                        break;
                    case 'shiftLower':
                        btn.innerText =  k[lang.shiftLang] && k[lang.shiftLang].toLowerCase() || getKeyText(k);
                        break;
                    case 'upper':
                        btn.innerText =  k[lang.basic] && k[lang.basic].toUpperCase() ||  k.name ||  k.code;
                        break;
                    case 'en':
                    default:
                        btn.innerText = getKeyText(k);
                        break;
                }
            })
        }

        #addSpace(num) {
            const createSpace = (nums) => {
                let result = '';

                for (let index = 0; index < nums; index++) {
                    result += ' ';
                }

                return result;
            }

            const cursorPosition = textarea.selectionStart;
            const startText = textarea.value.slice(0, cursorPosition);
            const endText = textarea.value.slice(cursorPosition, textarea.value.length);
            textarea.value = startText + createSpace(num) + endText;
            textarea.setSelectionRange(cursorPosition + num, cursorPosition + num);
        }

        #addText(obj, event) {
            const cursorPosition = textarea.selectionStart;
            const startText = textarea.value.slice(0, cursorPosition);
            const endText = textarea.value.slice(cursorPosition, textarea.value.length);
            const capsLock = document.querySelector('.CapsLock');
            const shiftLeft = document.querySelector('.ShiftLeft');
            const shiftRight = document.querySelector('.ShiftRight');
            let value = '';

            if (event.shiftKey || shiftLeft.classList.contains('active') || shiftRight.classList.contains('active')) {
                value = (capsLock.classList.contains('active')) ? obj[lang.shiftLang] && obj[lang.shiftLang].toLowerCase() || getKeyText(obj) : obj[lang.shiftLang] || getKeyText(obj);
            } else {
                value = (capsLock.classList.contains('active')) ? obj[lang.basic].toUpperCase() : obj[lang.basic];
            }

            textarea.value = startText + value + endText;
            textarea.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
        }

        #removeText() {
            const cursorPosition = textarea.selectionStart;

            if (!textarea.value || !cursorPosition) {
                return;
            }

            const startText = textarea.value.slice(0, cursorPosition - 1);
            const endText = textarea.value.slice(cursorPosition, textarea.value.length);
            textarea.value = startText + endText;

            textarea.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
        }

        #addNewLine() {
            const cursorPosition = textarea.selectionStart;
            const startText = textarea.value.slice(0, cursorPosition);
            const endText = textarea.value.slice(cursorPosition, textarea.value.length);
            textarea.value = startText + '\r\n' + endText;

            textarea.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
        }

        #delete() {
            const cursorPosition = textarea.selectionStart;
            const startText = textarea.value.slice(0, cursorPosition);
            const endText = textarea.value.slice(cursorPosition + 1, textarea.value.length);
            textarea.value = startText + endText;

            textarea.setSelectionRange(cursorPosition, cursorPosition);
        }

        #pressShift() {
            const capsLock = document.querySelector('.CapsLock');

            if (capsLock.classList.contains('active')) {
                this.#rerender('shiftLower');
                return;
            } 

            this.#rerender('shiftUpper');
        }

        #unPressShift() {
            const capsLock = document.querySelector('.CapsLock');

            if (capsLock.classList.contains('active')) {
                this.#rerender('upper');
                return;
            }
            
            this.#rerender('en');
        }

        #pressCL(obj) {
            const btn = document.querySelector(`.${obj.code}`);
            const shiftLeft = document.querySelector('.ShiftLeft');
            const shiftRight = document.querySelector('.ShiftRight');
            
            if (shiftLeft.classList.contains('active') || shiftRight.classList.contains('active')) {
                btn.classList.add('active');
                this.#rerender('shiftLower');

                return;
            }

            if (btn.classList.contains('active')) {
                btn.classList.remove('active');
                this.#rerender('en');
                
                return;
            }

            btn.classList.add('active');
            this.#rerender('upper');
        }

        #toggleControl(event) {
            if (event.type === 'mousedown' || event.type === 'keydown') {
                return;
            }

            if (event.altKey) {
                this.#toggleLangAndRerender();
            }
        }

        #toggleAlt(event) {
            if (event.type === 'mousedown' || event.type === 'keydown') {
                return;
            }

            if (event.ctrlKey) {
                this.#toggleLangAndRerender();
            }
        }

        #toggleLangAndRerender() {
            if (lang.basic === 'en') {
                lang.value = 'ru';
            } else {
                lang.value = 'en';
            }

            const capsLock = document.querySelector('.CapsLock');

            if (capsLock.classList.contains('active')) {
                this.#rerender('upper');
            } else {
                this.#rerender();
            }
        }

        #handleSpecKey(obj, event) {
            const { code } = obj;

            switch(code) {
                case 'Backspace': {
                    this.#removeText();
                    break;
                }

                case 'Space': {
                    this.#addSpace(1);
                    break;
                }

                case 'Enter': {
                    this.#addNewLine();
                    break;
                }

                case 'Tab': {
                    this.#addSpace(4);
                    break;
                }

                case 'Delete': {
                    this.#delete();
                    break;
                }

                case 'CapsLock': {
                    this.#pressCL(obj);
                    break;
                }

                case 'ShiftLeft':
                case 'ShiftRight': {
                    this.#pressShift();
                    break;
                }

                case 'ControlLeft':
                case 'ControlRight': {
                    this.#toggleControl(event);
                    break;
                }

                case 'AltLeft':
                case 'AltRight': {
                    this.#toggleAlt(event);
                    break;
                }
            }
        }
	}
	const h1 = document.createElement('h1');
	h1.innerHTML = 'Клавиатура';
	document.body.append(h1);

	const textarea = document.createElement('textarea');
	textarea.classList.add('textarea');
	document.body.append(textarea);

	const keyboard = document.createElement('div');
	keyboard.classList.add('keyboard');
	document.body.append(keyboard);

	const h3 = document.createElement('h3');
	h3.innerHTML = 'Клавиатура создана в операционной системе Windows';
	document.body.append(h3);

	const h3Two = document.createElement('h3');
	h3Two.innerHTML = 'Для переключения языка комбинация: левыe ctrl + alt';
	document.body.append(h3Two);

	const h3Three = document.createElement('h3');
	h3Three.innerHTML = '<a href="https://github.com/Evgeniy652/Keyboard/pull/1">Ссылка на github</a>';
	document.body.append(h3Three);

	let addKeysDom = function(objKey) {
        let key = document.createElement('div');
        key.className = objKey.code;
        key.innerText = getKeyText(objKey)
        return keyboard.append(key);
	}
  
	keys.forEach(objKey => addKeysDom(objKey));

    let button = new Button(keys);
  
    keyboard.addEventListener("mousedown", (event) => {
        button.mouseDown(event);
    });

    keyboard.addEventListener("mouseup", (event) => {
        button.mouseUp(event);
    });

    document.addEventListener('keydown', (event) => { 
        button.addKey(event);
    });

    document.addEventListener('keyup', (event) => { 
        button.addKey(event);
    });
}