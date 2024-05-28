const {app,BrowserWindow, ipcMain} = require("electron")
const path = require("path")


function createWindow (){
    let dato = "hola mundo"
    const windowMain = new BrowserWindow({
        width: 600,
        height: 400,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
   
    windowMain.loadFile("index.html")
    windowMain.webContents.send("recibir",dato)
    
}

/* if (process.env.NODE_ENV !== 'production') {
    templateMenuMain.push({
        label: 'DevTools',
        submenu: [
            {
                label: 'Show/Hide Dev Tools',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools()
                },

            },
            {
                role: 'reload'
            }
        ]
    })
} */

app.whenReady().then(()=>{
   /*  ipcMain.on("informacion",(event,i)=>{
      console.log(i)  
    }) */
    createWindow()
})