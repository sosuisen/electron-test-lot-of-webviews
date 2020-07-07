# Electron test for a lot of webviews

This is a project for verifying the bug of Electron which fails to load a lot of webviews.

## Environment
- Electron 8.2.4 and 9.0.2
- Windows 10 (1909)

## Abstract

When Main process simultaneously creates and loads a lot of BrowserWindows each of which has a webview tag with a preload script, 
some of the webviews fail to load its preload script.

The more windows it creates, the more webviews fail.

## Exepcted result

The parent renderer process can send ping to the webview, and vise versa.

![success](https://raw.githubusercontent.com/canal874/electron-test-lot-of-webviews/master/success.png)

## Actual result

In some windows, the parent renderer process catches did-finish-load event from the webview, however pings are ignored.

![failure](https://raw.githubusercontent.com/canal874/electron-test-lot-of-webviews/master/failure.png)

## Direct cause

Preload script is not loaded.

The left image is the dev tool of a failed webview, and the right is that of a succeeded webview.

webview_preload.js is loaded only in the right dev tool.

![Compare](https://raw.githubusercontent.com/canal874/electron-test-lot-of-webviews/master/compare.png)


## Related projects
- https://github.com/canal874/electron-test-lot-of-webviews (this project)
  - Default numberOfWindows is 50. Most webviews will fail.
  - If numberOfWindow is changed to 10, all webviews will succeed.
- https://github.com/canal874/electron-test-lot-of-webviews-workaround
  - Default numberOfWindows is 50. Around 10 webviews will fail.
  - This workaround waits to create and load the next BrowserWindow until the previous BrowserWindow invokes DOMContentLoaded event.
- https://github.com/canal874/electron-test-lot-of-webviews-workaround-reloaded
  - This is the succeeded workaround.
  - The BrowserWindow sends ping to the webview. It calls window.location.reload() if the webview does not returns pong. 
 
