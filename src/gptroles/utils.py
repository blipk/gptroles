def repr_(cls, ignore_keys: list[str] | None = None, only_keys: list[str] | None = None) -> str:
    """
    Returns a string detailing a class attributes from cls.__dict__
    Makes nice printing for __repr__ implementations

    :param ignore_keys: If provided, these keys will be not be included in the attribute string
    :param only_keys: If provided, these keys will be the only ones included in the attribute string
    """
    dct = cls.__dict__ if hasattr(cls, "__dict__") else cls
    if not hasattr(cls, "__dict__"):
        return repr(cls)
    if not ignore_keys or only_keys:
        ignore_keys = []
    classname = cls.__class__.__name__

    args = ", ".join([f"{k}={repr(v)}"
                        for (k, v) in dct.items()
                        if k not in ignore_keys and (k in only_keys if only_keys else True)])
    return f"{classname}({hex(id(cls))}, {args})"

from functools import wraps
from time import time

def timeit(f):
    @wraps(f)
    def wrap(*args, **kw):
        ts = time()
        result = f(*args, **kw)
        te = time()
        print("func:%r took: %2.4f sec \n args:[%r, %r]" % \
          (f.__name__, args[0:1], kw, te-ts))
        return result
    return wrap

def where_stack():
    import inspect
    stack = inspect.stack()
    the_class = stack[1][0].f_locals["self"].__class__.__name__
    the_method = stack[1][0].f_code.co_name

    print("I was called by {}.{}()".format(the_class, the_method))