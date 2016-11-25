Set oWShell = CreateObject("Wscript.Shell")
oWShell.Run ".\start.bat", 0, False
oWshell.Run "http://localhost:3000/"
Set oWSHell = Nothing
