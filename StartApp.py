import os
import sys
from subprocess import Popen, CREATE_NEW_CONSOLE


ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
BACKEND_WINDOWS_DIR = ".\\backend\\co2-absorption-calculator\\StartAppTools\\Windows\\"
BACKEND_UNIX_DIR =  "./backend/co2-absorption-calculator/StartAppTools/Unix/"
FRONTEND_WINDOWS_DIR = ".\\frontend\\StartAppTools\\Windows\\"
FRONTEND_UNIX_DIR = "./frontend/StartAppTools/Unix/"
WINDOWS_INSTALL = "Install.bat"
WINDOWS_START = "Start.bat"
WINDOWS_TEST = "Test.bat"
UNIX_INSTALL = "Install.sh"
UNIX_START = "Start.sh"
UNIX_TEST = "Test.sh"
args = sys.argv[1:]

def ExecuteWindows():
    if "install" in args:
        if "full" in args or "backend" in args:
            backendInstall = Popen(os.path.join(BACKEND_WINDOWS_DIR, WINDOWS_INSTALL))
            backendInstall.wait()
        if "full" in args or "frontend" in args:
            frontendInstall = Popen(os.path.join(FRONTEND_WINDOWS_DIR, WINDOWS_INSTALL))
            frontendInstall.wait()
    if "start" in args:
        if "full" in args or "backend" in args:
            backendStart = Popen([os.path.join(BACKEND_WINDOWS_DIR, WINDOWS_START)], creationflags=CREATE_NEW_CONSOLE)
        if "full" in args or "frontend" in args:
            frontendStart = Popen([os.path.join(FRONTEND_WINDOWS_DIR, WINDOWS_START)], creationflags=CREATE_NEW_CONSOLE)
    if "test" in args:
        if "full" in args or "backend" in args:
            backendTest = Popen(os.path.join(BACKEND_WINDOWS_DIR, WINDOWS_TEST))
            backendStart.wait()
        if "full" in args or "frontend" in args:
            frontendTest = Popen(os.path.join(FRONTEND_WINDOWS_DIR, WINDOWS_TEST))
            frontendTest.wait()
    


#Needs adjusting for unix systems
def ExecuteUnix():
    if "install" in args:
        if "full" in args or "backend" in args:
            backendInstall = Popen(os.path.join(BACKEND_UNIX_DIR, UNIX_INSTALL), shell=True)
            backendInstall.wait()
        if "full" in args or "frontend" in args:
            frontendInstall = Popen(os.path.join(FRONTEND_UNIX_DIR, UNIX_INSTALL))
            frontendInstall.wait()
    if "start" in args:
        if "full" in args or "backend" in args:
            backendStart = Popen(os.path.join(BACKEND_UNIX_DIR, UNIX_START), creationflags=CREATE_NEW_CONSOLE, shell=True)
        if "full" in args or "frontend" in args:
            frontendStart = Popen(os.path.join(FRONTEND_UNIX_DIR, UNIX_START), creationflags=CREATE_NEW_CONSOLE, shell=True)
    if "test" in args:
        if "full" in args or "backend" in args:
            backendTest = Popen(os.path.join(BACKEND_UNIX_DIR, UNIX_TEST))
            backendStart.wait()
        if "full" in args or "frontend" in args:
            frontendTest = Popen(os.path.join(FRONTEND_UNIX_DIR, UNIX_TEST))
            frontendTest.wait()


def main():
    if not args:
        args.append("full")
        args.append("start")
        args.append("test")
    if os.name == 'nt':
        ExecuteWindows()
    else:
         ExecuteUnix()


main()