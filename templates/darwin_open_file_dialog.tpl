osascript -e 'tell application (path to frontmost application as text)
set myFile to choose file
POSIX path of myFile
end'
