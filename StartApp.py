import os
import sys

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
ascii_lowercase = 'abcdefghijklmnopqrstuvwxyz'
ascii_uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
args = sys.argv[1:]

def ExecuteWindows():
    if "install" in args:
        if "full" in args or "backend" in args:
            

def ExecuteUnix():


def main():
    if os.name == 'nt':
        ExecuteWindows()
    else:
         ExecuteUnix()


main()