from pygments.lexers import get_lexer_by_name
from pygments.util import ClassNotFound

def find_lang_extension(language):
    try:
        lexer = get_lexer_by_name(language)
        exts = lexer.filenames or lexer.alias_filenames
        # print("Lexer found:", lexer.name, lexer.filenames, lexer.alias_filenames, lexer.mimetypes)
        return exts[0]
    except ClassNotFound:
        return None