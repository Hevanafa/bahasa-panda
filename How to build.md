## Directories
`bahasa-panda` the web app

`BahasaPandaApp` the Apache Cordova folder in which the APK will be built

## Building Procedure
1. Run:
	`yarn build`
	at the root of this folder
2. After it's done building, move the `build` folder into BahasaPandaApp, and then delete the www folder.
3. Rename `build` folder to `www`.
4. Run:
	`cordova build android`
5. Wait 1-5 minutes
6. There will be the complete path to the file in the console, and you're done!
