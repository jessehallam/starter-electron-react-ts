const { BrowserWindow, Menu } = require('electron');

/**
 * 
 * @param {BrowserWindow} window 
 */
module.exports = function (window) {
    if (process.env.NODE_ENV === 'development') {
        configureDevEnvironment();
    }    

    function configureDevEnvironment() {
        console.log('Adding chrome dev tool support.');
        window.openDevTools();
        window.webContents.on('context-menu', (e, props) => {
            const { x, y } = props;

            Menu.buildFromTemplate([
                {
                    label: 'Inspect Element',
                    click: () => {
                        window.inspectElement(x, y);
                    }
                }
            ]).popup(window);
        });
    }
}