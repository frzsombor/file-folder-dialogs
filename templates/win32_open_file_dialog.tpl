<# :

:: Based on https://stackoverflow.com/a/15885133/1683264
:: More info: https://docs.microsoft.com/en-us/dotnet/api/system.windows.forms.openfiledialog

@echo off
setlocal

for /f "delims=" %%I in ('powershell -noprofile "iex (${%~f0} | out-string)"') do (
    echo %%~I
)
goto :EOF

: end Batch portion / begin PowerShell hybrid chimera #>

Add-Type -AssemblyName System.Windows.Forms
$f = new-object Windows.Forms.OpenFileDialog
$f.InitialDirectory = "%initialDirectory%"
$f.Filter = "%filter%"
$f.Title = "%title%"
$f.ShowHelp = $%showHelp%
$f.Multiselect = $%multiselect%
[void]$f.ShowDialog()
if ($f.Multiselect) { $f.FileNames } else { $f.FileName }
